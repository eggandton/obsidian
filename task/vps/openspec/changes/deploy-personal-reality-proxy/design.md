## Context

See proposal.md for motivation. The target is `alivps`, Alibaba Cloud Linux 4 x86_64 with 2 CPUs, about 1.3 GiB available RAM and 20 Mbps purchased bandwidth. TCP 443 is unused. SSH access uses the user's existing Keychain-backed SSH helper. Short ICMP tests showed missing replies; application performance needs measurement.

## Goals / Non-Goals

**Goals:** A small single-process deployment with reproducible configuration, privately delivered client credentials, and actual client-core acceptance tests.

**Non-Goals:** Router deployment, multi-user billing, public subscription hosting, web panels, changing SSH authentication or installing a second protocol before evidence justifies it. Kernel tuning is limited to the later user-authorized BBR/fq change described below.

## Decisions

- Use official Xray release assets with published digest verification, pin the installed version and retain deployment metadata. Native systemd avoids a container dependency on a small VPS.
- Use VLESS + REALITY + Vision on TCP 443, with a tested TLS 1.3 / H2 target. A dedicated unprivileged account receives only the bind capability it requires. No public management listener is added.
- Restrict server-side outbound access with explicit internal destination rules, domain resolution before routing, and an operating-system address deny list on the service where supported. This also covers REALITY fallback destinations after DNS resolution.
- Use a standalone Mihomo/Clash profile in rule mode: explicit LAN bypass, maintained China domain/IP rules, proxy by default, DoH through the proxy for non-China domains, IPv6 disabled in the profile. System proxy is the initial mode; TUN is opt-in and not silently enabled.
- Keep generated secrets in a gitignored, owner-only local directory and root-controlled server files. Never print private keys or client credentials in command output. Test via an isolated local client process on unused loopback ports, without changing current system proxy settings.
- Use journald with access logging disabled and bounded service log rates. Preserve existing host and cloud services and SSH access. Open only TCP 443 where a change is necessary and available credentials authorize it.

## Risks / Trade-offs

- [20 Mbps shared capacity] → Measure bounded downloads and explain the 2.5 MB/s theoretical ceiling; avoid indefinite speed tests.
- [Cloud security group unknown] → Test from the actual client host; if blocked, inspect available management access and report the exact manual rule if necessary.
- [Line quality and time-of-day variation] → Record short acceptance tests honestly; do not claim long-term stability or guaranteed reachability.
- [Remote rules and bootstrap dependency] → Use pinned/cached rule assets for initial delivery and explicit update behavior.
- [System proxy does not cover every application] → Document scope and optional TUN mode rather than alter host routing globally.

## Migration Plan

1. Inspect target state and official release; select the REALITY target and client-core version.
2. Stage and validate configuration before starting a dedicated systemd service.
3. Generate private client files and run isolated real-client checks, including negative credentials and internal destination denial.
4. Deliver results and import/maintenance instructions. Rollback stops/disables only the new service and removes its documented files/account; existing SSH and unrelated services remain intact.

## User-directed acceptance handoff

After deployment the user explicitly requested to perform verification personally. Stop automated connectivity/performance acceptance and deliver the profile with honest status. Initial tests with www.autodesk.com failed REALITY authentication despite matching exported credentials; the target was changed to www.logitech.com and client files synchronized. Final-profile end-to-end acceptance remains pending with the user. Service and syntax checks are not proof of proxy connectivity.

## Reported failure repair

The user subsequently reported an empty proxy page and unusable service, authorizing diagnosis and repair. The populated local profile was not activated in the running core; reactivating it restored the node and group. Source inspection identified the authentication root cause: Xray 26.10.21 requires an X25519MLKEM768 share before optional X25519, while Mihomo removes that share unless `reality-opts.support-x25519mlkem768` is true. Add this option rather than disable server validation or downgrade software. Preserve existing credentials and other app profiles; back up and correct the user's current self-hosted local profile and the delivered generator output, then reactivate through the app.

Actual Clash Verge / Mihomo 1.19.32 requests verified VPS exit IP, Cloudflare HTTP 200, Google HTTP 204, Baidu HTTP 200 and non-empty rule providers. Temporary server debug logging was restored to warning. Broader performance/security acceptance remains with the user as previously requested.

## User-authorized BBR optimization

After bounded measurements showed low TCP throughput and substantial retransmission, the user explicitly requested BBR optimization. Use the distribution-provided `tcp_bbr` and `sch_fq` modules; keep the installed kernel and proxy credentials. Capture current sysctls, root qdisc and relevant files before changing anything. Set the default TCP congestion algorithm to bbr and default qdisc to fq, apply fq to the current primary interface, and persist only these settings and module loading. Restart only personal-xray once so new listening/accepted sockets inherit BBR; preserve SSH sessions and verify a fresh SSH login. Compare the same bounded single/four-connection workload before and after, record competing traffic and sample limits, and check actual server-client sockets use BBR. Provide a rollback command restoring prior settings, qdisc and files; automatically roll back if application or service-health checks fail. Do not broaden into kernel replacement, buffer tuning or a second protocol.
