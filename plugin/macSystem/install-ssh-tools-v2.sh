#!/bin/bash
# Install reusable SSH helpers on macOS without replacing existing ssh config.
set -e
if [ "$(uname -s)" != Darwin ]; then
  echo '此安装脚本仅适用于 macOS。' >&2
  exit 1
fi
mkdir -p "$HOME/.ssh/hosts.d"
chmod 700 "$HOME/.ssh" "$HOME/.ssh/hosts.d"
if [ -f "$HOME/.ssh/ssh-tools.zsh" ]; then
  cp "$HOME/.ssh/ssh-tools.zsh" "$HOME/.ssh/ssh-tools.zsh.bak"
fi
cat > "$HOME/.ssh/ssh-tools.zsh" <<'SSH_TOOLS'
# macOS SSH helper commands. Source from ~/.zshrc.
# Uses macOS OpenSSH, SSH config, and local Keychain. No public keys.

_sshm_dir="$HOME/.ssh/hosts.d"
_sshm_config="$HOME/.ssh/config"

_sshm_name_ok() {
  [[ "$1" =~ ^[a-zA-Z][a-zA-Z0-9_-]*$ ]]
}

_sshm_entry() {
  _sshm_name_ok "$1" && [[ -f "$_sshm_dir/$1.conf" ]]
}

_sshm_user() {
  /usr/bin/ssh -G -- "$1" 2>/dev/null | /usr/bin/awk '$1 == "user" { print $2; exit }'
}

_sshm_host_exists_elsewhere() {
  # Detect a manually configured exact host alias to avoid ambiguous duplicates.
  _sshm_name_ok "$1" || return 1
  [[ -f "$_sshm_config" ]] && /usr/bin/grep -Eq "^[[:space:]]*Host[[:space:]]+$1([[:space:]]|$)" "$_sshm_config"
}

_sshm_valid() {
  local name="$1" ip="$2" user="$3" port="$4"
  if ! _sshm_name_ok "$name"; then
    echo '别名只能以字母开头，使用字母、数字、_ 或 -' >&2
    return 1
  fi
  if [[ ! "$ip" =~ ^[a-zA-Z0-9.:-]+$ || ! "$user" =~ ^[a-zA-Z_][a-zA-Z0-9_.-]*$ ]]; then
    echo 'IP/域名或用户名格式不正确' >&2
    return 1
  fi
  if [[ ! "$port" =~ ^[0-9]+$ ]] || (( port < 1 || port > 65535 )); then
    echo '端口必须在 1~65535 之间' >&2
    return 1
  fi
}

_sshm_write() {
  local name="$1" ip="$2" user="$3" port="$4" target="$_sshm_dir/$1.conf"
  local tmp
  tmp=$(/usr/bin/mktemp "$_sshm_dir/.tmp.XXXXXXXX") || return 1
  {
    printf 'Host %s\n' "$name"
    printf '    HostName %s\n' "$ip"
    printf '    User %s\n' "$user"
    printf '    Port %s\n' "$port"
    printf '    PubkeyAuthentication no\n'
    printf '    PreferredAuthentications password,keyboard-interactive\n'
    printf '    NumberOfPasswordPrompts 1\n'
  } > "$tmp"
  /bin/chmod 600 "$tmp"
  /bin/mv -f "$tmp" "$target"
}

sshhelp() {
  cat <<'HELP'
sshnew   别名 IP 用户 [端口]     新增服务器并保存密码
sshls                             查看服务器列表
sshinfo  别名                    查看 IP/用户/端口
sshedit  别名 新IP 新用户 [端口] 修改服务器
sshpwd  别名                    修改保存的密码
sshdel  别名                    删除服务器及密码
sshp    别名                    连接服务器
sshup   别名 本地路径 远程路径   上传文件或目录（SCP）
sshdown 别名 远程路径 本地路径   下载文件或目录（SCP）
HELP
}

sshnew() {
  local name="$1" ip="$2" user="$3" port="${4:-22}"
  if [[ -z "$name" || -z "$ip" || -z "$user" || $# -gt 4 ]]; then
    echo '用法：sshnew 别名 IP 用户 [端口]'; return 1
  fi
  _sshm_valid "$name" "$ip" "$user" "$port" || return 1
  if _sshm_entry "$name" || _sshm_host_exists_elsewhere "$name"; then
    echo "别名 $name 已存在，请用 sshedit 修改（旧的手工配置需先移除）"; return 1
  fi
  echo "请输入 $name ($user@$ip) 的 SSH 登录密码（只保存到 Mac 钥匙串）："
  /usr/bin/security add-generic-password -U -a "$user" -s "ssh-$name" -w || return 1
  _sshm_write "$name" "$ip" "$user" "$port" || return 1
  echo "已新增。登录：sshp $name"
}

sshls() {
  local file name ip user port
  local count=0
  printf '%-17s %-24s %-16s %s\n' '别名' 'IP/域名' '用户名' '端口'
  for file in "$_sshm_dir"/*.conf; do
    [[ -f "$file" ]] || continue
    name="${file##*/}"
    name="${name%.conf}"
    ip=$(/usr/bin/awk '$1 == "HostName" {print $2; exit}' "$file")
    user=$(/usr/bin/awk '$1 == "User" {print $2; exit}' "$file")
    port=$(/usr/bin/awk '$1 == "Port" {print $2; exit}' "$file")
    printf '%-17s %-24s %-16s %s\n' "$name" "$ip" "$user" "$port"
    (( count++ ))
  done
  if (( count == 0 )); then
    echo '暂无脚本管理的服务器。新增：sshnew test 192.168.1.100 root'
  fi
  if [[ -f "$_sshm_config" ]]; then
    local legacy
    legacy=$(/usr/bin/awk 'tolower($1) == "host" {for(i=2;i<=NF;i++) if ($i !~ /[*?!]/) print $i}' "$_sshm_config")
    if [[ -n "$legacy" ]]; then
      echo "其他手工配置的别名：${legacy//$'\n'/, }"
    fi
  fi
}

sshinfo() {
  local name="$1"
  if [[ -z "$name" ]]; then echo '用法：sshinfo 别名'; return 1; fi
  if ! _sshm_entry "$name" && ! _sshm_host_exists_elsewhere "$name"; then echo "未找到 $name"; return 1; fi
  /usr/bin/ssh -G -- "$name" 2>/dev/null | /usr/bin/awk '$1 ~ /^(hostname|user|port)$/ {print $1 ": " $2}'
}

sshpwd() {
  local name="$1" user
  if [[ -z "$name" ]]; then echo '用法：sshpwd 别名'; return 1; fi
  if ! _sshm_entry "$name" && ! _sshm_host_exists_elsewhere "$name"; then echo "未找到 $name"; return 1; fi
  user=$(_sshm_user "$name")
  if [[ -z "$user" ]]; then echo '服务器不存在或 SSH 配置无效'; return 1; fi
  echo "请输入 $name ($user) 的新密码："
  /usr/bin/security add-generic-password -U -a "$user" -s "ssh-$name" -w && echo '密码已保存到钥匙串'
}

sshedit() {
  local name="$1" ip="$2" user="$3" port="${4:-22}" olduser
  if [[ -z "$name" || -z "$ip" || -z "$user" || $# -gt 4 ]]; then
    echo '用法：sshedit 别名 新IP 新用户 [端口]'; return 1
  fi
  if ! _sshm_entry "$name"; then echo '此别名不是脚本添加的，不能自动修改'; return 1; fi
  _sshm_valid "$name" "$ip" "$user" "$port" || return 1
  olduser=$(_sshm_user "$name")
  if [[ "$olduser" != "$user" ]]; then
    echo '用户名变了，需要输入新用户的 SSH 密码：'
    /usr/bin/security add-generic-password -U -a "$user" -s "ssh-$name" -w || return 1
  fi
  _sshm_write "$name" "$ip" "$user" "$port" || return 1
  if [[ "$olduser" != "$user" ]]; then
    /usr/bin/security delete-generic-password -a "$olduser" -s "ssh-$name" >/dev/null 2>&1 || true
  fi
  echo "已修改。登录：sshp $name（密码若也变化，请执行 sshpwd $name）"
}

sshdel() {
  local name="$1" user reply
  if ! _sshm_entry "$name"; then echo '未找到脚本管理的服务器。用法：sshdel 别名'; return 1; fi
  user=$(_sshm_user "$name")
  printf "确认删除 %s 的 SSH 配置和钥匙串密码？输入 yes：" "$name"
  read -r reply
  [[ "$reply" == yes ]] || { echo '已取消'; return 0; }
  /bin/rm -- "$_sshm_dir/$name.conf" || return 1
  /usr/bin/security delete-generic-password -a "$user" -s "ssh-$name" >/dev/null 2>&1 || true
  echo "已删除 $name"
}

sshp() {
  local name="$1" user
  if [[ -z "$name" ]]; then echo '用法：sshp 别名'; return 1; fi
  if ! _sshm_entry "$name" && ! _sshm_host_exists_elsewhere "$name"; then echo "未找到 $name"; return 1; fi
  user=$(_sshm_user "$name")
  if [[ -z "$user" ]]; then echo "找不到服务器 $name"; return 1; fi
  # On the first connection let SSH show the host-key fingerprint interactively,
  # rather than sending the fingerprint confirmation through the password helper.
  local hostname port knownhost
  hostname=$(/usr/bin/ssh -G -- "$name" 2>/dev/null | /usr/bin/awk '$1 == "hostname" { print $2; exit }')
  port=$(/usr/bin/ssh -G -- "$name" 2>/dev/null | /usr/bin/awk '$1 == "port" { print $2; exit }')
  knownhost="$hostname"
  if [[ "$port" != 22 ]]; then knownhost="[$hostname]:$port"; fi
  if ! /usr/bin/ssh-keygen -F "$knownhost" >/dev/null 2>&1; then
    echo '首次连接请核对 SSH 服务器指纹，确认正确后输入 yes。'
    /usr/bin/ssh -o PubkeyAuthentication=no -o PreferredAuthentications=none \
      -o NumberOfPasswordPrompts=0 -- "$name" </dev/tty || true
    if ! /usr/bin/ssh-keygen -F "$knownhost" >/dev/null 2>&1; then
      echo '尚未确认服务器指纹，已取消登录。' >&2
      return 1
    fi
  fi
  SSH_LOGIN_HOST="$name" SSH_LOGIN_USER="$user" \
  SSH_ASKPASS="$HOME/.ssh/askpass-keychain" SSH_ASKPASS_REQUIRE=force \
  /usr/bin/ssh -o PubkeyAuthentication=no \
    -o PreferredAuthentications=password,keyboard-interactive -- "$name"
}

# Reuse the saved Keychain password for both uploads and downloads.
_sshm_scp() {
  local name="$1" user hostname port knownhost
  shift
  if ! _sshm_entry "$name" && ! _sshm_host_exists_elsewhere "$name"; then
    echo "未找到服务器 $name。先执行：sshnew $name IP 用户" >&2
    return 1
  fi
  user=$(_sshm_user "$name")
  if [[ -z "$user" ]]; then echo "找不到服务器用户：$name" >&2; return 1; fi

  # Prompt for host-key verification before supplying any saved password.
  hostname=$(/usr/bin/ssh -G -- "$name" 2>/dev/null | /usr/bin/awk '$1 == "hostname" { print $2; exit }')
  port=$(/usr/bin/ssh -G -- "$name" 2>/dev/null | /usr/bin/awk '$1 == "port" { print $2; exit }')
  knownhost="$hostname"
  if [[ "$port" != 22 ]]; then knownhost="[$hostname]:$port"; fi
  if ! /usr/bin/ssh-keygen -F "$knownhost" >/dev/null 2>&1; then
    echo '首次连接请核对服务器指纹，确认正确后输入 yes。'
    /usr/bin/ssh -o PubkeyAuthentication=no -o PreferredAuthentications=none \
      -o NumberOfPasswordPrompts=0 -- "$name" </dev/tty || true
    if ! /usr/bin/ssh-keygen -F "$knownhost" >/dev/null 2>&1; then
      echo '尚未确认服务器指纹，已取消传输。' >&2
      return 1
    fi
  fi

  SSH_LOGIN_HOST="$name" SSH_LOGIN_USER="$user" \
  SSH_ASKPASS="$HOME/.ssh/askpass-keychain" SSH_ASKPASS_REQUIRE=force \
  /usr/bin/scp -r -o PubkeyAuthentication=no \
    -o PreferredAuthentications=password,keyboard-interactive -- "$@"
}

sshup() {
  if (( $# != 3 )); then echo '用法：sshup 别名 本地路径 远程路径'; return 1; fi
  local name="$1" src="$2" dest="$3"
  if [[ ! -e "$src" ]]; then echo "本地路径不存在：$src" >&2; return 1; fi
  _sshm_scp "$name" "$src" "$name:$dest"
}

sshdown() {
  if (( $# != 3 )); then echo '用法：sshdown 别名 远程路径 本地路径'; return 1; fi
  local name="$1" src="$2" dest="$3"
  _sshm_scp "$name" "$name:$src" "$dest"
}
SSH_TOOLS
chmod 600 "$HOME/.ssh/ssh-tools.zsh"
cat > "$HOME/.ssh/askpass-keychain" <<'ASKPASS'
#!/bin/sh
# Accept only password prompts; do not inadvertently answer OTP/MFA prompts.
case "$1" in
    *[Pp]assword*|*密码*) ;;
    *) exit 1 ;;
esac
exec /usr/bin/security find-generic-password -a "$SSH_LOGIN_USER" -s "ssh-$SSH_LOGIN_HOST" -w
ASKPASS
chmod 700 "$HOME/.ssh/askpass-keychain"
if [ ! -f "$HOME/.ssh/config" ]; then
  touch "$HOME/.ssh/config"
fi
if ! grep -Fqx 'Include ~/.ssh/hosts.d/*.conf' "$HOME/.ssh/config"; then
  temp_config=$(mktemp "$HOME/.ssh/config.XXXXXX")
  {
    echo 'Include ~/.ssh/hosts.d/*.conf'
    cat "$HOME/.ssh/config"
  } > "$temp_config"
  chmod 600 "$temp_config"
  mv "$temp_config" "$HOME/.ssh/config"
fi
chmod 600 "$HOME/.ssh/config"
source_line='[[ -f "$HOME/.ssh/ssh-tools.zsh" ]] && source "$HOME/.ssh/ssh-tools.zsh"'
touch "$HOME/.zshrc"
if ! grep -Fqx "$source_line" "$HOME/.zshrc"; then
  printf '\n# Mac SSH shortcut commands\n%s\n' "$source_line" >> "$HOME/.zshrc"
fi
echo '安装完成。运行：source ~/.zshrc  然后 sshhelp（含 sshup、sshdown）'
