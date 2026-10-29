## Purpose

为个人设备提供可认证、可维护的加密代理入口，并通过兼容 Clash Verge Rev 的独立配置实现国内及局域网直连、其他流量代理，同时保护服务器内部网络与连接凭据。

## ADDED Requirements

### Requirement: Authenticated encrypted proxy
The service SHALL accept authorized VLESS REALITY Vision clients on TCP 443 and SHALL NOT provide proxy access with invalid credentials.

#### Scenario: Authorized access
- **WHEN** a compatible client connects with the supplied credentials
- **THEN** external HTTPS requests exit through the VPS public address

#### Scenario: Invalid credentials
- **WHEN** a client supplies an incorrect user credential
- **THEN** it cannot proxy a request through the service

### Requirement: Internal network isolation
The proxy SHALL block destinations in loopback, private, link-local, multicast and cloud metadata address ranges, including domain names resolving to these ranges.

#### Scenario: Metadata access attempt
- **WHEN** an authenticated client requests a link-local cloud metadata address
- **THEN** the request fails without returning metadata

### Requirement: Client routing and DNS
The delivered configuration SHALL be compatible with Clash Verge Rev, route LAN and Chinese sites directly, route other destinations through the VPS, resolve proxy destinations through the proxy, and disable IPv6 in the delivered profile. Existing client profiles SHALL remain unchanged.

#### Scenario: Rule based browsing
- **WHEN** the user imports and selects the new profile in rule mode
- **THEN** local and Chinese destinations select DIRECT and an external test destination selects the VPS

### Requirement: Recoverable operation and private credentials
The service SHALL start at boot, restart on failure, run without root identity, and keep credentials out of version control and public logs. Delivery SHALL include maintenance and rollback instructions while preserving SSH access.

#### Scenario: Service restart
- **WHEN** the proxy service is restarted
- **THEN** it becomes healthy and the existing SSH login remains usable

### Requirement: Explicit acceptance evidence
Delivery SHALL distinguish verified connectivity, measured performance and unverified conditions. If a cloud security group prevents external access and cannot be modified with available authorization, delivery SHALL identify the exact required ingress rule and mark external acceptance incomplete.

#### Scenario: External acceptance
- **WHEN** deployment checks finish
- **THEN** results identify authentication, exit address, routing, isolation and bounded throughput/stability checks, including any unresolved external dependency
