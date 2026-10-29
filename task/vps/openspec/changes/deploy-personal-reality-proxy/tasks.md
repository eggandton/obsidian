## 1. Deployment preparation

- [x] 1.1 Inspect current server state, select an official stable release and a compatible REALITY target; verify release digests and target TLS 1.3/H2 support.
- [x] 1.2 Prepare private output storage and reproducible deployment materials; verify secrets are ignored by Git and file permissions are restricted.

## 2. Server and client

- [x] 2.1 Deploy a least-privilege Xray service with internal address isolation; verify configuration validation, enabled/active status, port 443 and service restart while SSH remains accessible.
- [x] 2.2 Generate a Clash Verge Rev profile and connection URI with rule routing and DNS settings; validate using a compatible Mihomo core and keep existing profiles unchanged.

## 3. Acceptance and handover

- [ ] 3.1 USER ACCEPTANCE: verify invalid-credential rejection, internal destination isolation, complete DNS/routing behavior and long-term stability. After the user's failure report, actual Clash Verge connectivity and VPS exit IP were verified; broader acceptance remains user-owned.
- [x] 3.2 Deliver private client files and README covering import, observed deployment status, update/restart and rollback. Throughput and repeated-request acceptance are delegated to the user per explicit instruction; do not claim a measured working proxy speed.

## 4. Reported client failure repair

- [x] 4.1 Diagnose empty runtime despite a populated local profile; reactivate the selected subscription and confirm PROXY and MY-Private-REALITY are visible in Clash Verge.
- [x] 4.2 Add the required support-x25519mlkem768 option to the generator, delivered YAML and current self-hosted app profile; confirm the actual runtime contains the option.
- [x] 4.3 Confirm real requests through the user's Clash Verge core: Cloudflare HTTP 200 with VPS exit IP, Google HTTP 204, Baidu HTTP 200, and both rule providers loaded; restore normal server logging and document the results.

## 5. User-authorized BBR optimization

- [x] 5.1 Save fresh bounded baseline measurements and existing server sysctl/qdisc state; verify distribution-provided BBR/fq modules are available.
- [x] 5.2 Enable and persist BBR/fq with a saved rollback path; verify sysctl values, live qdisc, proxy service health, actual BBR sockets and fresh SSH access.
- [x] 5.3 Repeat the bounded workload and report measured changes and limitations; document persistence and rollback without claiming guaranteed bandwidth.
