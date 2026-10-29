#!/usr/bin/env python3
"""Run on the authorized VPS: python3 - apply|rollback < this script.

Uses distribution kernel modules only. Captures the original settings before
mutation and restores them if application fails. Does not touch SSH or routing.
"""
import json
import os
from pathlib import Path
import shlex
import stat
import subprocess
import sys
import time
from datetime import datetime, timezone

os.umask(0o077)
STATE = Path("/var/lib/personal-xray/bbr-backup")
SYSCTL_FILE = Path("/etc/sysctl.d/99-personal-xray-bbr.conf")
MODULE_FILE = Path("/etc/modules-load.d/personal-xray-bbr.conf")
KEYS = ["net.ipv4.tcp_congestion_control", "net.core.default_qdisc",
        "net.ipv4.tcp_allowed_congestion_control"]

def run(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True).stdout.strip()

def save(path, text, mode=0o644):
    path.write_text(text)
    path.chmod(mode)

def rollback(state):
    # Restore the original default before removing BBR from the allowed list.
    for key in KEYS:
        run("sysctl", "-w", key + "=" + state["sysctls"][key])
    run(*state["restoreQdiscCommand"])
    for filename, original in state["files"].items():
        path = Path(filename)
        if original is None:
            path.unlink(missing_ok=True)
        else:
            save(path, original["text"], original["mode"])
    run("systemctl", "restart", "personal-xray")
    time.sleep(1)
    run("systemctl", "is-active", "personal-xray")

if os.geteuid() != 0:
    raise SystemExit("Run on the authorized VPS as root")
action = sys.argv[1] if len(sys.argv) > 1 else ""
if action == "rollback":
    state = json.loads((STATE / "before.json").read_text())
    rollback(state)
    save(STATE / "status.json", json.dumps({"status": "rolled-back"}) + "\n", 0o600)
    print("Original congestion control, qdisc and persistence files restored; proxy active.")
    raise SystemExit(0)
if action != "apply":
    raise SystemExit("Usage: python3 - apply|rollback < scripts/configure-bbr.py")
if STATE.exists():
    raise SystemExit("Existing BBR backup found; refusing to overwrite rollback state")
if not STATE.parent.is_dir():
    raise SystemExit("Expected personal-xray deployment is absent")
assert run("systemctl", "is-active", "personal-xray") == "active"
for module in ["tcp_bbr", "sch_fq"]:
    run("modinfo", "-F", "filename", module)
routes = json.loads(run("ip", "-j", "route", "show", "default"))
assert routes, "No primary route"
interface = routes[0]["dev"]
qdiscs = json.loads(run("tc", "-j", "qdisc", "show", "dev", interface))
root = next(q for q in qdiscs if q.get("root"))
assert root["kind"] == "fq_codel", "Inspect non-fq_codel qdisc before changing it"
options = root["options"]
restore = ["tc", "qdisc", "replace", "dev", interface, "root", "fq_codel"]
for key in ["limit", "flows", "quantum", "drop_batch"]:
    if key in options:
        restore += [key, str(options[key])]
for key in ["target", "interval"]:
    if key in options:
        restore += [key, str(options[key]) + "us"]
if "memory_limit" in options:
    restore += ["memory_limit", str(options["memory_limit"]) + "b"]
restore += ["ecn" if options.get("ecn") else "noecn"]
state = {
    "at": datetime.now(timezone.utc).isoformat(), "interface": interface,
    "sysctls": {key: run("sysctl", "-n", key) for key in KEYS},
    "qdisc": root, "restoreQdiscCommand": restore,
    "files": {str(path): ({"text": path.read_text(), "mode": stat.S_IMODE(path.stat().st_mode)}
                          if path.exists() else None) for path in [SYSCTL_FILE, MODULE_FILE]},
}
STATE.mkdir(mode=0o700)
save(STATE / "before.json", json.dumps(state, indent=2) + "\n", 0o600)
save(STATE / "restore-qdisc.txt", shlex.join(restore) + "\n", 0o600)
try:
    for module in ["tcp_bbr", "sch_fq"]:
        run("modprobe", module)
    save(MODULE_FILE, "# Personal proxy BBR/fq; distribution kernel modules.\ntcp_bbr\nsch_fq\n")
    save(SYSCTL_FILE, "# Personal proxy TCP pacing; rollback state in /var/lib/personal-xray/bbr-backup\n"
         "net.core.default_qdisc = fq\nnet.ipv4.tcp_congestion_control = bbr\n")
    run("sysctl", "-p", str(SYSCTL_FILE))
    run("tc", "qdisc", "replace", "dev", interface, "root", "fq")
    assert run("sysctl", "-n", KEYS[0]) == "bbr"
    assert run("sysctl", "-n", KEYS[1]) == "fq"
    assert "bbr" in run("sysctl", "-n", KEYS[2]).split()
    live = json.loads(run("tc", "-j", "qdisc", "show", "dev", interface))
    assert any(q.get("root") and q["kind"] == "fq" for q in live)
    run("systemctl", "restart", "personal-xray")
    time.sleep(2)
    assert run("systemctl", "is-active", "personal-xray") == "active"
except BaseException:
    rollback(state)
    save(STATE / "status.json", json.dumps({"status": "automatically-rolled-back"}) + "\n", 0o600)
    raise
result = {"status": "applied", "interface": interface,
          "sysctls": {key: run("sysctl", "-n", key) for key in KEYS},
          "liveQdisc": live, "backup": str(STATE)}
save(STATE / "status.json", json.dumps(result, indent=2) + "\n", 0o600)
print(json.dumps(result, indent=2))
