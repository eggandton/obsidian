## Why

用户希望利用已有的马来西亚 2 核 2 GB、20 Mbps VPS，供个人日常上网并通过 Clash Verge Rev 按规则分流。用户已确认推荐方案并授权部署；保留现有 SSH 访问方式。

## What Changes

- 在 `alivps` 部署官方 Xray-core 稳定版，提供 TCP 443 的 VLESS + REALITY + Vision 入口。
- 使用独立服务用户、受保护的凭据、systemd 开机启动及自动恢复，限制代理访问服务器内部地址。
- 生成私有 Clash Verge Rev 配置，提供国内/局域网直连、其他流量代理及 DNS/IPv6 策略。
- 验证服务、客户端真实连接与外网访问，记录带宽/稳定性测试结果和维护、卸载步骤。
- 根据用户后续明确授权启用发行版内核自带的 BBR + fq，保存原设置及回退方法，并用限量请求比较优化前后的吞吐。

## Capabilities

### New Capabilities
- `personal-proxy`: 个人认证代理、规则分流、运行维护及连接验收。

### Modified Capabilities

无。

## Impact

影响本仓库部署资料、VPS 的 Xray 文件和 systemd 服务，以及 TCP 443 入站访问。客户端配置独立交付，不覆盖现有配置。无需购买域名或添加管理面板；不改动 SSH 认证及端口。云安全组如无法通过现有授权工具修改，交付准确的放行规则并明确外部阻塞。

BBR 优化另影响服务器默认 TCP 拥塞控制、默认及当前主网卡队列和两个开机加载模块；使用已有内核，无需重启系统，并提供原值备份与回退。
