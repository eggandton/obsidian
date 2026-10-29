# Mac SSH 管理工具使用手册

> 适用：macOS（自带 OpenSSH + 钥匙串），iTerm2 或「终端」均可。
>
> 目标：使用 **SSH 密码认证**，密码保存在 **Mac 钥匙串**；通过简短命令登录、管理服务器和 SCP 传文件，**不需要 SSH 公钥**。

## 1. 安装（一次即可）

将 `install-ssh-tools-v2.sh` 下载到 Mac 的「下载」文件夹，打开终端运行：

```bash
bash ~/Downloads/install-ssh-tools-v2.sh
source ~/.zshrc
sshhelp
```

重复运行安装脚本会保留原有服务器配置；已有 `~/.ssh/ssh-tools.zsh` 会备份为 `.bak`。安装脚本会向 `~/.ssh/config` 加入一条 `Include`，并向 `~/.zshrc` 加入加载命令。

## 2. 所有命令速查

| 命令 | 用途 | 示例 |
| --- | --- | --- |
| `sshnew` | 新增服务器，并保存密码 | `sshnew dev 10.8.34.134 zdkn 22` |
| `sshls` | 查看服务器列表 | `sshls` |
| `sshinfo` | 查看服务器详情 | `sshinfo dev` |
| `sshedit` | 修改 IP、用户名、端口 | `sshedit dev 10.8.34.135 zdkn 22` |
| `sshpwd` | 修改钥匙串中保存的密码 | `sshpwd dev` |
| `sshdel` | 删除服务器配置及保存的密码 | `sshdel dev` |
| `sshp` | 自动读取钥匙串密码并登录 | `sshp dev` |
| `sshup` | SCP 上传文件或文件夹 | `sshup dev ~/Downloads/test.jar /tmp/` |
| `sshdown` | SCP 下载文件或文件夹 | `sshdown dev /tmp/test.log ~/Downloads/` |
| `sshhelp` | 显示帮助 | `sshhelp` |

**注意**：`sshnew` 和 `sshedit` 的第 4 个参数是可选端口，省略时为 `22`。服务器别名以字母开头，可含数字、`_`、`-`。

## 3. 第一次新增、连接服务器

假设服务器 IP 为 `10.8.34.134`、登录名为 `zdkn`、端口为 `22`：

```bash
sshnew dev 10.8.34.134 zdkn
```

根据提示**输入一次服务器密码**，密码会存入 Mac 钥匙串，而不是明文写到 `~/.ssh/config`。

以后在终端执行：

```bash
sshp dev
```

首次连接新服务器时，SSH 会展示**服务器主机指纹**。请向管理员或可靠渠道核对，确认后输入 `yes`；随后的认证失败提示可能是脚本预检查的正常现象，接着会正式登录。首次从钥匙串读取密码时，Mac 可能要求授权。

> 注意：这是**自动填写保存的密码**，底层仍为密码登录，并非 SSH 公钥免密认证。服务器必须允许密码认证。

## 4. 查看、修改和删除服务器

```bash
sshls                              # 列出服务器
sshinfo dev                       # 查看 dev 的 IP、用户、端口
sshedit dev 10.8.34.135 zdkn 22   # 修改 IP/用户/端口
sshpwd dev                        # 更新密码（按提示输入新密码）
sshdel dev                        # 删除配置和钥匙串密码，需要输入 yes 确认
```

- `sshedit` 只更新连接信息，**不会**自动获取服务器上的新密码；密码变更请执行 `sshpwd`。
- `sshedit` 如果更换用户名，会提示保存新用户密码。
- `sshdel` 删除的是**脚本添加的服务器**；原先自己在 `~/.ssh/config` 中写的 Host 不会被它删除。
- `sshls` 主要列出脚本管理的服务器；可能另外提示已有的手工配置别名。

## 5. SCP 文件上传、下载

### 上传一个文件

```bash
sshup dev ~/Downloads/test.jar /tmp/
```

本地 `~/Downloads/test.jar` → 服务器 `/tmp/test.jar`。

### 下载一个文件

```bash
sshdown dev /tmp/test.log ~/Downloads/
```

服务器 `/tmp/test.log` → 本地 `~/Downloads/test.log`。

### 上传/下载整个目录

```bash
sshup dev ~/Downloads/project /tmp/
sshdown dev /var/log/myapp ~/Downloads/
```

上述命令会递归传输目录（脚本内部调用 `scp -r`）。

### 路径包含空格

```bash
sshup dev "$HOME/Downloads/项目资料/test.jar" /tmp/
sshdown dev /tmp/test.log "$HOME/Downloads/测试附件/"
```

下载到本地的目标目录应先存在：

```bash
mkdir -p "$HOME/Downloads/测试附件"
```

SCP 传输依赖服务器的文件系统权限；如果提示 `Permission denied`，检查远程路径读写权限，而不是反复修改本地保存的密码。

## 6. 常见问题

**Q：必须安装 iTerm2 或 Termius 吗？**  
A：都不用。Mac 自带「终端」即可。iTerm2 只是体验更好的终端窗口。

**Q：`ssh dev` 和 `sshp dev` 有什么区别？**  
A：`ssh` 是系统原生命令，通常会提示你输入密码；`sshp` 调用同一个系统 SSH，但会从 Mac 钥匙串自动读取密码。

**Q：新开一个终端后提示 `command not found: sshp`？**  
A：先执行 `source ~/.zshrc`；如果仍然不行，重新运行安装脚本。

**Q：SSH 连接失败？**  
A：先检查 `sshinfo dev` 中的 IP、用户和端口；确认 VPN、网络和服务器状态；若服务器密码改变，运行 `sshpwd dev`。

**Q：服务器提示 `Permission denied (publickey)`？**  
A：服务器可能禁用了密码认证，或账号被限制。需要服务器管理员允许密码登录；本工具不会绕过服务器限制。

**Q：钥匙串自动读取失败？**  
A：确认已执行 `sshnew` 或 `sshpwd`，并允许 macOS 钥匙串访问。企业管控、交互式验证码、MFA 等情况可能无法自动登录。

**Q：为什么 `sshdel` 不能删除之前手工配置的服务器？**  
A：为了保护既有配置，脚本只自动删除其自己管理的 Host，手工 Host 需要单独编辑 `~/.ssh/config`。

## 7. 文件存放位置

| 路径 | 内容 |
| --- | --- |
| `~/.ssh/config` | SSH 总配置（包含 Include） |
| `~/.ssh/hosts.d/` | 脚本创建的各服务器配置 |
| `~/.ssh/ssh-tools.zsh` | 命令函数脚本 |
| `~/.ssh/askpass-keychain` | 从钥匙串取密码的辅助脚本 |
| macOS「钥匙串访问」 | 以 `ssh-别名` 为服务名保存密码 |
| `~/.zshrc` | 加载 SSH 工具函数 |

## 8. 安全提醒

- 私密服务器密码保存在**当前 Mac 用户的钥匙串**，不要把密码写入 Shell 脚本、截图或 Git 仓库。
- **首次连接必须核对服务器指纹**，不要对未知服务器盲目输入 `yes`。
- Mac 已登录的其他程序如果取得钥匙串访问权限，也可能读取你的 SSH 密码。为 Mac 开启锁屏、登录密码与 FileVault，并遵守公司凭据管理规定。
- 工具不会修改服务器端的 SSH 设置，也不会绕过 MFA 或服务器权限。

---

**日常只记 5 个命令：** `sshnew`（添加）、`sshls`（列表）、`sshp`（连接）、`sshup`（上传）、`sshdown`（下载）。其他操作可随时运行 `sshhelp`。
