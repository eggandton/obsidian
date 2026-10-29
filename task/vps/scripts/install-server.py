#!/usr/bin/env python3
"""Run as root on alivps. Installs only this project's dedicated proxy service."""
import hashlib
import io
import json
import os
from pathlib import Path
import pwd
import re
import secrets
import socket
import ssl
import subprocess
import urllib.request
import uuid
import zipfile

os.umask(0o077)
VERSION = "v26.10.21"
ARCHIVE_SHA256 = "0eec3ed4163c273d8c8bf821f7d219e257921cf584aa3fb970715e458e631978"
SERVICE = "personal-xray"
CONFIG = Path("/etc/personal-xray")
STATE = Path("/var/lib/personal-xray")
RELEASE = Path("/usr/local/lib/personal-xray") / VERSION
DENY = [
    "0.0.0.0/8", "10.0.0.0/8", "100.64.0.0/10", "127.0.0.0/8",
    "169.254.0.0/16", "172.16.0.0/12", "192.0.0.0/24", "192.0.2.0/24",
    "192.168.0.0/16", "198.18.0.0/15", "198.51.100.0/24", "203.0.113.0/24",
    "224.0.0.0/4", "240.0.0.0/4", "::/128", "::1/128", "fc00::/7",
    "fe80::/10", "ff00::/8", "2001:db8::/32",
]

def run(*args, capture=False):
    return subprocess.run(args, check=True, text=True, capture_output=capture)

def fetch(url):
    with urllib.request.urlopen(url, timeout=60) as response:
        return response.read()

def write_json(path, data):
    path.write_text(json.dumps(data, indent=2) + "\n")
    path.chmod(0o600)

if os.geteuid() != 0:
    raise SystemExit("Run as root on the authorized VPS")
if (CONFIG.exists() and any(CONFIG.iterdir())) or (STATE.exists() and any(STATE.iterdir())) or Path(f"/etc/systemd/system/{SERVICE}.service").exists():
    raise SystemExit("Existing deployment detected; refusing to overwrite credentials or service")
with socket.socket() as probe:
    probe.bind(("0.0.0.0", 443))

target_name = "www.logitech.com"
target_ip = socket.getaddrinfo(target_name, 443, socket.AF_INET, socket.SOCK_STREAM)[0][4][0]
context = ssl.create_default_context()
context.minimum_version = ssl.TLSVersion.TLSv1_3
context.set_alpn_protocols(["h2"])
with socket.create_connection((target_ip, 443), timeout=15) as raw:
    with context.wrap_socket(raw, server_hostname=target_name) as tls:
        assert tls.version() == "TLSv1.3" and tls.selected_alpn_protocol() == "h2"
print(f"Verified REALITY target: {target_name} ({target_ip}), TLS 1.3, h2", flush=True)

base = f"https://github.com/XTLS/Xray-core/releases/download/{VERSION}"
archive = fetch(base + "/Xray-linux-64.zip")
assert hashlib.sha256(archive).hexdigest() == ARCHIVE_SHA256, "Release SHA256 mismatch"
digest = fetch(base + "/Xray-linux-64.zip.dgst").decode()
normalized_digest = re.sub(r"\s+", "", digest).lower()
assert ARCHIVE_SHA256 in normalized_digest, "Published digest does not match"
print(f"Verified official Xray {VERSION} archive SHA256", flush=True)

RELEASE.mkdir(parents=True, mode=0o755, exist_ok=True)
RELEASE.parent.chmod(0o755)
RELEASE.chmod(0o755)
with zipfile.ZipFile(io.BytesIO(archive)) as z:
    (RELEASE / "xray").write_bytes(z.read("xray"))
(RELEASE / "xray").chmod(0o755)
binary = str(RELEASE / "xray")
run(binary, "version")
try:
    existing = pwd.getpwnam(SERVICE)
    assert existing.pw_shell == "/sbin/nologin" and existing.pw_uid != 0, "Unexpected existing account"
except KeyError:
    run("useradd", "--system", "--user-group", "--no-create-home", "--shell", "/sbin/nologin", SERVICE)
account = pwd.getpwnam(SERVICE)
CONFIG.mkdir(mode=0o750, exist_ok=True)
CONFIG.chmod(0o750)
os.chown(CONFIG, 0, account.pw_gid)
STATE.mkdir(mode=0o700, exist_ok=True)

key_output = run(binary, "x25519", capture=True).stdout
keys = dict(line.split(":", 1) for line in key_output.splitlines() if ":" in line)
private_key = keys["PrivateKey"].strip()
public_key = (keys.get("Password (PublicKey)") or keys.get("Password") or keys.get("PublicKey") or "").strip()
assert private_key and public_key, "Unexpected X25519 output format"
user_id = str(uuid.uuid4())
short_id = secrets.token_hex(8)
config = {
    "log": {"access": "none", "loglevel": "warning"},
    "dns": {"servers": ["https+local://1.1.1.1/dns-query", "https+local://8.8.8.8/dns-query"], "queryStrategy": "UseIPv4"},
    "inbounds": [{
        "tag": "reality-in", "listen": "0.0.0.0", "port": 443, "protocol": "vless",
        "settings": {"clients": [{"id": user_id, "flow": "xtls-rprx-vision"}], "decryption": "none"},
        "streamSettings": {"network": "raw", "security": "reality", "realitySettings": {
            "show": False, "target": f"{target_ip}:443", "xver": 0,
            "serverNames": [target_name], "privateKey": private_key, "shortIds": [short_id],
        }},
    }],
    "outbounds": [
        {"tag": "direct", "protocol": "freedom", "streamSettings": {"sockopt": {"domainStrategy": "UseIPv4"}}},
        {"tag": "blocked", "protocol": "blackhole", "settings": {}},
    ],
    "routing": {"domainStrategy": "IPOnDemand", "rules": [
        {"type": "field", "ip": DENY, "outboundTag": "blocked"},
        {"type": "field", "ip": ["47.254.202.53/32"], "outboundTag": "blocked"},
    ]},
}
candidate = CONFIG / "config.json"
write_json(candidate, config)
os.chown(candidate, 0, account.pw_gid)
candidate.chmod(0o640)
run(binary, "run", "-test", "-config", str(candidate))

unit = f"""[Unit]
Description=Personal VLESS REALITY proxy
Wants=network-online.target
After=network-online.target
StartLimitIntervalSec=60
StartLimitBurst=5

[Service]
Type=simple
User={SERVICE}
Group={SERVICE}
ExecStart={binary} run -config {candidate}
Restart=on-failure
RestartSec=5s
AmbientCapabilities=CAP_NET_BIND_SERVICE
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
NoNewPrivileges=true
PrivateTmp=true
PrivateDevices=true
ProtectSystem=strict
ProtectHome=true
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectKernelLogs=true
ProtectControlGroups=true
RestrictSUIDSGID=true
LockPersonality=true
RestrictRealtime=true
RestrictNamespaces=true
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
SystemCallArchitectures=native
UMask=0077
LimitNOFILE=65536
TasksMax=128
MemoryMax=512M
IPAddressDeny={' '.join(DENY)}
LogRateLimitIntervalSec=30s
LogRateLimitBurst=100

[Install]
WantedBy=multi-user.target
"""
unit_path = Path(f"/etc/systemd/system/{SERVICE}.service")
unit_path.write_text(unit)
unit_path.chmod(0o644)
write_json(STATE / "client.json", {
    "server": "47.254.202.53", "port": 443, "uuid": user_id, "publicKey": public_key,
    "shortId": short_id, "serverName": target_name, "flow": "xtls-rprx-vision",
})
write_json(STATE / "deployment.json", {
    "version": VERSION, "archiveSha256": ARCHIVE_SHA256, "targetName": target_name,
    "targetAddress": target_ip, "service": SERVICE, "config": str(candidate), "binary": binary,
})
run("systemd-analyze", "verify", str(unit_path))
run("systemctl", "daemon-reload")
run("systemctl", "enable", "--now", SERVICE)
import time
time.sleep(1)
run("systemctl", "is-active", SERVICE)
print("Server installed; credentials retained in root-only state directory, not printed.")
