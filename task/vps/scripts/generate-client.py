#!/usr/bin/env python3
"""Generate a private, portable Clash Verge Rev/Mihomo profile from server export."""
import json
import os
from pathlib import Path
from urllib.parse import urlencode, quote
import yaml

os.umask(0o077)
root = Path(__file__).resolve().parents[1]
private = root / ".private"
client = json.loads((private / "client.json").read_text())
node = "MY-Private-REALITY"
snapshot = "2d368ff6025f49e068e848487bac54056e123a79"
rule_base = f"https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/{snapshot}/geo"
config = {
    "mixed-port": 7890,
    "allow-lan": False,
    "bind-address": "127.0.0.1",
    "mode": "rule",
    "log-level": "warning",
    "ipv6": False,
    "unified-delay": True,
    "tcp-concurrent": True,
    "profile": {"store-selected": True, "store-fake-ip": True},
    "tun": {"enable": False, "stack": "mixed", "auto-route": True,
            "auto-detect-interface": True, "dns-hijack": ["any:53"]},
    "dns": {
        "enable": True, "listen": "127.0.0.1:1053", "ipv6": False,
        "enhanced-mode": "fake-ip", "fake-ip-range": "198.18.0.1/16",
        "fake-ip-filter": ["*.lan", "*.local", "localhost", "+.stun.*.*"],
        "default-nameserver": ["223.5.5.5", "119.29.29.29"],
        "proxy-server-nameserver": ["223.5.5.5", "119.29.29.29"],
        "nameserver": ["https://1.1.1.1/dns-query#PROXY", "https://8.8.8.8/dns-query#PROXY"],
        "nameserver-policy": {"rule-set:cn-domain": ["https://dns.alidns.com/dns-query#DIRECT"],
                              "+.cn": ["https://dns.alidns.com/dns-query#DIRECT"]},
        "direct-nameserver": ["https://dns.alidns.com/dns-query#DIRECT"],
    },
    "proxies": [{
        "name": node, "type": "vless", "server": client["server"], "port": client["port"],
        "uuid": client["uuid"], "network": "tcp", "tls": True, "udp": True,
        "flow": client["flow"], "servername": client["serverName"], "client-fingerprint": "chrome",
        "reality-opts": {
            "public-key": client["publicKey"], "short-id": client["shortId"],
            # Xray 26.10.21 requires the hybrid key share; Mihomo removes it by default.
            "support-x25519mlkem768": True,
        },
    }],
    "proxy-groups": [{"name": "PROXY", "type": "select", "proxies": [node]}],
    "rule-providers": {
        "cn-domain": {"type": "http", "behavior": "domain", "format": "mrs",
                      "url": rule_base + "/geosite/cn.mrs", "path": "./ruleset/personal-cn-domain.mrs",
                      "proxy": "PROXY", "interval": 86400},
        "cn-ip": {"type": "http", "behavior": "ipcidr", "format": "mrs",
                  "url": rule_base + "/geoip/cn.mrs", "path": "./ruleset/personal-cn-ip.mrs",
                  "proxy": "PROXY", "interval": 86400},
    },
    "rules": [
        "DOMAIN,localhost,DIRECT", "DOMAIN-SUFFIX,local,DIRECT", "DOMAIN-SUFFIX,lan,DIRECT",
        "DOMAIN-SUFFIX,cn,DIRECT",
        "IP-CIDR,0.0.0.0/8,DIRECT,no-resolve", "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
        "IP-CIDR,100.64.0.0/10,DIRECT,no-resolve", "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
        "IP-CIDR,169.254.0.0/16,DIRECT,no-resolve", "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
        "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
        "RULE-SET,cn-domain,DIRECT", "RULE-SET,cn-ip,DIRECT,no-resolve", "MATCH,PROXY",
    ],
}
path = private / "malaysia-clash-verge.yaml"
path.write_text("# Private credentials: do not publish or commit this file.\n" + yaml.safe_dump(config, allow_unicode=True, sort_keys=False))
path.chmod(0o600)
query = urlencode({"encryption": "none", "security": "reality", "sni": client["serverName"],
                   "fp": "chrome", "pbk": client["publicKey"], "sid": client["shortId"],
                   "type": "tcp", "flow": client["flow"]})
uri = f"vless://{client['uuid']}@{client['server']}:{client['port']}?{query}#{quote(node)}"
(private / "vless-import.txt").write_text(uri + "\n")
(private / "vless-import.txt").chmod(0o600)
print("Created private Clash profile and VLESS URI; credentials not printed.")
