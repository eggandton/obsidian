# 马来西亚个人代理

已部署 Xray-core **26.10.21**，协议为 **VLESS + REALITY + Vision**，入口 `47.254.202.53:443/TCP`。客户端按 Clash Verge Rev / Mihomo 配置，服务由 `personal-xray.service` 管理。现有 SSH 登录方式未修改。

## 导入 Clash Verge Rev

1. 在「订阅」页面选择新建/导入本地文件，选择本项目 `.private/malaysia-clash-verge.yaml`。不同版本按钮名称略有区别。macOS 文件选择框可按 `⌘⇧G` 输入完整文件路径。
2. 选中新配置，点击订阅页的「重新激活订阅」，使用「规则」模式，在代理组 `PROXY` 中选择 `MY-Private-REALITY`。若编辑了本地 YAML，也必须重新激活才能应用到运行内核。
3. 开启 Clash Verge Rev 的「系统代理」。初次使用先不启用 TUN；应用中显示的代理端口可能覆盖文件内的 `7890`，以应用设置为准。
4. 自行打开目标网站检查连接、出口 IP 和速度。完整 YAML 包含分流和 DNS；不要把 VLESS URI 当成 HTTP 订阅地址填入。

配置路径：`/Users/zhangqiliang/project/task/vps/.private/malaysia-clash-verge.yaml`。

### 全局模式与 GitHub 拉取/推送

Clash Verge Rev 首页「代理模式」可切换「规则 / 全局 / 直连」。使用全局模式时，`GLOBAL` 组应选择 `PROXY`（其下为 `MY-Private-REALITY`）；如果选择 `DIRECT`，即使切到全局也仍然直连。全局模式仍只处理进入 Clash 的连接，终端 Git 不会自动遵循 macOS 系统代理。

2026-10-29 已复现终端 Git 直连 GitHub 超时，而通过本地 `7897` 代理可以访问。另在推送预检查中遇到 `Error in the HTTP2 framing layer`，使用 HTTP/1.1 后通过。已在本机 Git 全局配置中按 GitHub 域名限定以下设置，规则模式下也可使用：

```sh
git config --global http.https://github.com.proxy http://127.0.0.1:7897
git config --global http.https://github.com.version HTTP/1.1
git config --global http.https://gist.github.com.proxy http://127.0.0.1:7897
```

以上适用于 HTTPS 仓库地址，需要 Clash 正在运行且混合端口保持 `7897`。`git@github.com:...` 的 SSH 地址需另行配置 SSH 代理，HTTP 代理设置不会作用于 SSH。全局模式已验证出口为 `47.254.202.53`、MY；检查后恢复规则模式，并保留 `GLOBAL → PROXY` 选择。

撤销上述 Git 设置可分别运行对应的 `git config --global --unset`，例如 `git config --global --unset http.https://github.com.proxy`。修改前的 Git 配置和 Clash 配置备份保存在 `.private/github-proxy-backup-20261029-103817/`。

其他兼容客户端可使用 `.private/vless-import.txt`，但需支持服务端要求的 X25519MLKEM768 握手。Clash Verge Rev 请优先导入完整 YAML：其中的 `reality-opts.support-x25519mlkem768: true` 是本部署的必要兼容选项，单独导入 URI 可能丢失此设置。这些文件含访问凭据，仅保存在权限受限、已被 Git 忽略的目录中；不应上传到公开订阅服务。服务端 REALITY 私钥没有导出到本机。

## 分流与 DNS

- 局域网、`.cn` 和中国站点/地址规则走 `DIRECT`；其余默认走 `PROXY`。没有自动回退到直连的代理选项。
- 默认 DNS 使用通过 `PROXY` 访问的 DoH；国内域名使用直连阿里 DoH。公共 bootstrap DNS 只用于解析 DNS 服务等基础设施域名。
- 此配置禁用内核 IPv6。系统代理只覆盖遵循系统代理设置的应用；它不会全局禁用操作系统 IPv6，也不能接管所有应用自己的 DNS/连接。如需要全应用覆盖，再在客户端启用 TUN 并自行检查相关应用。
- 国内域名/IP 规则使用 MetaCubeX 的固定快照 `2d368ff6025f49e068e848487bac54056e123a79`。第一次加载通过该代理下载并缓存；虽然客户端定期检查相同 URL，固定快照不会自动变更。今后更新快照需替换两个规则 URL 中的提交号，并检查新规则。
- 20 Mbps 是所有设备共享的带宽，理论上限约 2.5 MB/s；BBR 优化后的限量短测见下文，长期速度仍取决于线路和负载。

## 当前状态与用户验收

已确认：官方发行文件 SHA256、服务端配置语法、非 root 运行、开机启动、服务重启、TCP 443 可达、SSH 保留及客户端配置解析。主机防火墙和云安全组没有被改动。

2026-10-26 用户报告「未获取到代理信息」后，已修复两个问题：

- 本地订阅文件已经有节点，但运行内核仍使用空配置。点击「重新激活订阅」后，`PROXY` 和 `MY-Private-REALITY` 已恢复显示。
- 原生成器遗漏 `reality-opts.support-x25519mlkem768: true`。Xray 26.10.21 的 REALITY 会拒绝没有混合密钥共享的 ClientHello，而 Mihomo 默认会移除此共享，导致 `REALITY authentication failed`。已修正生成器、交付 YAML 和当前已选中的本地订阅，并在 Clash Verge Rev 中重新激活。

通过用户实际运行的 Clash Verge Rev / Mihomo 1.19.32、HTTP 代理端口 `7897` 验证：Cloudflare 请求 HTTP 200，出口 `47.254.202.53`、地区 MY；Google 检测页 HTTP 204；百度 HTTP 200。国内域名规则 110448 条、国内 IP 规则 10011 条均已加载。诊断结束后服务端日志恢复 warning 级别。

**尚未确认：完整分流/DNS行为、内网拦截、错误凭据拒绝、持续速度和长期稳定性。** 用户此前要求自行验收，本次只完成与报告故障相关的修复与连通性确认，没有运行大流量测速。旧的 `.private/acceptance-results.json` 对应修复前配置，已被后续修复取代；最新修复结果见 `.private/repair-results.json`。应用中已存在的其他配置保持不变，本次修改了当前自建订阅的兼容字段。

## 维护

在本项目目录运行，沿用已有 SSH 别名及钥匙串 askpass，不读取或打印 SSH 密码：

```sh
./scripts/ssh-alivps.sh 'systemctl status personal-xray --no-pager'
./scripts/ssh-alivps.sh 'journalctl -u personal-xray -n 50 --no-pager'
./scripts/ssh-alivps.sh 'systemctl restart personal-xray'
./scripts/ssh-alivps.sh 'systemctl stop personal-xray'
./scripts/ssh-alivps.sh 'systemctl start personal-xray'
```

也可使用 `sshp alivps` 登录后执行同样的 `systemctl` / `journalctl` 命令。默认不记录访问日志，只记录 warning 及更高等级信息，并限制日志速率。

服务端文件：

| 路径 | 用途 |
|---|---|
| `/etc/personal-xray/config.json` | 配置及 REALITY 私钥，`root:personal-xray`、0640 |
| `/var/lib/personal-xray/client.json` | 客户端连接参数，root 专用 |
| `/var/lib/personal-xray/deployment.json` | 版本、目标和文件摘要 |
| `/usr/local/lib/personal-xray/v26.10.21/xray` | 固定版本的官方程序 |
| `/etc/systemd/system/personal-xray.service` | 服务与权限隔离设置 |

服务用户只有监听低端口所需的 capability；Xray 路由规则及 systemd IPAddressDeny 限制访问私网、回环、链路本地和其他保留地址。配置使用 IPOnDemand 处理域名对应地址。权限和规则已配置，最终实际拦截效果由用户验收。

## BBR 优化与回退

2026-10-26 按用户明确要求启用 **BBR + fq**，使用 Alibaba Cloud Linux 已安装的 `tcp_bbr`、`sch_fq` 模块，没有更换内核或重启服务器。当前默认 TCP 拥塞控制为 `bbr`，默认及 `eth0` 实际根队列为 `fq`。实际 TCP 443 连接的内核 socket 信息已确认使用 BBR；新的 SSH 登录和代理出口也已验证正常。

优化前后均通过用户 Clash Verge Rev 的 7897 端口，访问同一个 Cloudflare 测速接口，单连接请求 2 MB、四连接分别请求 0.5 MB，每个请求最多 20 秒：

| 短测 | 优化前 CUBIC | 优化后 BBR |
|---|---:|---:|
| 单连接平均速度 | 85.4 KB/s，20 秒收到约 1.71 MB 后超时 | 1512.1 KB/s，约 1.32 秒完成 2 MB |
| 四连接合计平均速度 | 769.5 KB/s | 1419.4 KB/s |

单位使用十进制 KB/s。样本较小、线路和用户其他流量会波动，结果只说明本次短测改善，不能当作持续或晚高峰保证。详细记录在 `.private/bbr-before.json`、`.private/bbr-after.json` 和 `.private/bbr-comparison.json`。客户端配置和凭据没有因 BBR 发生变化，无需重新导入。

持久化文件：

- `/etc/sysctl.d/99-personal-xray-bbr.conf`：`net.core.default_qdisc=fq`、`net.ipv4.tcp_congestion_control=bbr`。
- `/etc/modules-load.d/personal-xray-bbr.conf`：开机加载 `tcp_bbr`、`sch_fq`。
- `/var/lib/personal-xray/bbr-backup/before.json`：root 专用的原 sysctl、网卡队列参数及持久化文件备份。
- `/var/lib/personal-xray/bbr-backup/status.json`：当前应用状态及 socket 验证记录。

在本项目目录可检查当前值：

```sh
./scripts/ssh-alivps.sh 'sysctl net.ipv4.tcp_congestion_control net.core.default_qdisc; tc qdisc show dev eth0'
```

如需恢复优化前设置，运行：

```sh
./scripts/ssh-alivps.sh 'python3 - rollback' < scripts/configure-bbr.py
```

回退会恢复原来的 CUBIC、fq_codel 和对应队列参数，恢复/移除本次修改的两个持久化文件，并重启代理服务使新连接生效。它不会更改 SSH 认证或端口。执行 BBR 配置脚本时如应用或服务健康检查失败，会尝试自动执行同样的回退；备份保留供审阅。

## 更新与回退

程序不会自动升级。升级时按以下顺序操作：

1. 从 [Xray 官方 Releases](https://github.com/XTLS/Xray-core/releases) 选择稳定版，将 Linux x86_64 文件下载到新的版本目录，核对官方 SHA256；保留旧版本。
2. 在 root 专用目录备份配置和 unit。不要公开包含私钥的备份。
3. 用新版本以 `personal-xray` 用户执行 `xray run -test -config /etc/personal-xray/config.json`，通过后修改 unit 的 `ExecStart` 路径。
4. 执行 `systemctl daemon-reload` 和 `systemctl restart personal-xray`，检查状态和实际客户端连接。
5. 若新版本有问题，恢复旧 unit/必要的配置，重新 daemon-reload 和 restart。

`scripts/install-server.py` 用于首次部署，遇到已有配置会拒绝覆盖，不应当成升级脚本运行。`scripts/generate-client.py` 从私有导出文件重新生成 YAML，依赖本机 Python 和 PyYAML。

REALITY 目标 IP 当前固定在部署时解析的地址，避免服务依赖本地 DNS；如果以后该 CDN 地址失效，需要重新核查目标站点并更新服务端 `target`，域名发生变化时同步客户端 `servername`。

## 停用或卸载

暂时停用：`systemctl disable --now personal-xray`。恢复：`systemctl enable --now personal-xray`。

彻底卸载时，先停用服务，再删除上述 unit、`/etc/personal-xray`、`/var/lib/personal-xray` 和 `/usr/local/lib/personal-xray`，执行 `systemctl daemon-reload`，最后删除专用用户 `personal-xray`。这会删除代理凭据；如需恢复先保存 root 专用备份。仅操作这些本次新增的路径，不修改 SSH 或其他阿里云服务。
