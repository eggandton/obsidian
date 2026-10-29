#!/usr/bin/env python3
"""Bounded real-core acceptance checks. Does not change the system proxy."""
import copy
import json
import os
from pathlib import Path
import secrets
import socket
import subprocess
import time
import urllib.request
import uuid
import yaml

os.umask(0o077)
ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / ".private"
CORE = PRIVATE / "mihomo"
profile = yaml.safe_load((PRIVATE / "malaysia-clash-verge.yaml").read_text())
results = {"startedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z"), "tests": []}
processes = []
logs = []
secret = secrets.token_urlsafe(24)

def record(name, passed, **details):
    row = {"name": name, "passed": passed, **details}
    results["tests"].append(row)
    print(json.dumps(row, ensure_ascii=False), flush=True)

def port_free(port):
    with socket.socket() as s:
        s.bind(("127.0.0.1", port))

def api(path, data=None):
    request = urllib.request.Request("http://127.0.0.1:19090" + path,
        data=json.dumps(data).encode() if data is not None else None,
        headers={"Authorization": "Bearer " + secret, "Content-Type": "application/json"},
        method="PATCH" if data is not None else "GET")
    with urllib.request.urlopen(request, timeout=5) as response:
        body = response.read()
        return json.loads(body) if body else None

def curl(url, port=17890, max_time=25, output=None):
    command = ["curl", "--silent", "--show-error", "--noproxy", "", "--proxy",
               f"socks5h://127.0.0.1:{port}", "--connect-timeout", "12", "--max-time", str(max_time),
               "--output", str(output or os.devnull), "--write-out", "%{json}", url]
    run = subprocess.run(command, capture_output=True, text=True, timeout=max_time + 5)
    try:
        raw = json.loads(run.stdout)
    except json.JSONDecodeError:
        raw = {}
    return {"exitCode": run.returncode, "httpCode": raw.get("http_code", 0),
            "seconds": raw.get("time_total"), "bytes": raw.get("size_download"),
            "bytesPerSecond": raw.get("speed_download"), "error": run.stderr.strip()[:200]}

def launch(name, config, port):
    port_free(port)
    folder = PRIVATE / name
    folder.mkdir(mode=0o700, exist_ok=True)
    path = folder / "config.yaml"
    path.write_text(yaml.safe_dump(config, sort_keys=False))
    path.chmod(0o600)
    check = subprocess.run([str(CORE), "-t", "-d", str(folder), "-f", str(path)],
                           capture_output=True, text=True, timeout=30)
    if check.returncode:
        raise RuntimeError("Core configuration validation failed: " + check.stdout[-1500:] + check.stderr[-500:])
    log = (folder / "core.log").open("w")
    logs.append(log)
    process = subprocess.Popen([str(CORE), "-d", str(folder), "-f", str(path)],
                               stdin=subprocess.DEVNULL, stdout=log, stderr=log)
    processes.append(process)
    for _ in range(100):
        if process.poll() is not None:
            raise RuntimeError("Client exited; inspect private core log")
        try:
            with socket.create_connection(("127.0.0.1", port), timeout=0.2):
                return folder
        except OSError:
            time.sleep(0.2)
    raise RuntimeError("Client port did not start")

try:
    port_free(19090)
    port_free(1153)
    config = copy.deepcopy(profile)
    config.update({"mixed-port": 17890, "external-controller": "127.0.0.1:19090",
                   "secret": secret, "log-level": "info"})
    config["dns"]["listen"] = "127.0.0.1:1153"
    main_folder = launch("acceptance", config, 17890)
    record("mihomo_config_validation", True)
    providers = {}
    for _ in range(45):
        providers = api("/providers/rules").get("providers", {})
        if len(providers) == 2 and all(p.get("ruleCount", 0) > 0 for p in providers.values()):
            break
        time.sleep(2)
    ready = len(providers) == 2 and all(p.get("ruleCount", 0) > 0 for p in providers.values())
    record("rule_providers_loaded", ready,
           counts={name: p.get("ruleCount", 0) for name, p in providers.items()})
    trace_file = main_folder / "trace.txt"
    trace = curl("https://www.cloudflare.com/cdn-cgi/trace", output=trace_file)
    exit_ip = None
    if trace_file.exists():
        fields = dict(line.split("=", 1) for line in trace_file.read_text().splitlines() if "=" in line)
        exit_ip = fields.get("ip")
    record("proxy_exit_ip", trace["exitCode"] == 0 and exit_ip == profile["proxies"][0]["server"], exitIp=exit_ip, **trace)
    for url in ["https://www.google.com/generate_204", "https://github.com", "https://www.youtube.com/", "https://www.baidu.com"]:
        response = curl(url)
        record("browse:" + url, response["exitCode"] == 0 and 200 <= response["httpCode"] < 400, **response)
    # Requests that remain inside the client demonstrate rule selection in the local log.
    time.sleep(0.5)
    text = (main_folder / "core.log").read_text()
    direct = any("www.baidu.com" in line and "DIRECT" in line for line in text.splitlines())
    proxied = any("www.google.com" in line and "PROXY" in line for line in text.splitlines())
    record("rule_routing", direct and proxied, chinaDirect=direct, externalProxy=proxied)
    api("/configs", {"mode": "global"})
    # GLOBAL's selection is read back to avoid mistaking local DIRECT for server-side tests.
    global_group = api("/proxies/GLOBAL")
    if global_group.get("now") == "DIRECT":
        request = urllib.request.Request("http://127.0.0.1:19090/proxies/GLOBAL",
            data=json.dumps({"name": "PROXY"}).encode(), method="PUT",
            headers={"Authorization": "Bearer " + secret, "Content-Type": "application/json"})
        urllib.request.urlopen(request, timeout=5).close()
    assert api("/proxies/GLOBAL")["now"] != "DIRECT"
    baseline = curl("https://1.1.1.1/cdn-cgi/trace", max_time=20)
    record("global_mode_baseline", baseline["exitCode"] == 0 and baseline["httpCode"] == 200, **baseline)
    # Only an HTTP HEAD is attempted against internal addresses, so no metadata body is read.
    for address in ["127.0.0.1", "172.19.54.240", "169.254.169.254", "100.100.100.200", "127.0.0.1.sslip.io"]:
        run = subprocess.run(["curl", "-I", "-sS", "--noproxy", "", "--proxy", "socks5h://127.0.0.1:17890",
                              "--connect-timeout", "5", "--max-time", "8", "http://" + address + "/"],
                              capture_output=True, text=True, timeout=12)
        record("internal_denied:" + address, baseline["exitCode"] == 0 and run.returncode != 0 and "HTTP/" not in run.stdout,
               exitCode=run.returncode)
    api("/configs", {"mode": "rule"})
    negative = copy.deepcopy(profile)
    negative["mixed-port"] = 17891
    negative["dns"]["listen"] = "127.0.0.1:1154"
    negative["dns"].pop("nameserver-policy", None)
    negative.pop("rule-providers", None)
    negative["rules"] = ["MATCH,PROXY"]
    negative["proxies"][0]["uuid"] = str(uuid.uuid4())
    launch("negative-acceptance", negative, 17891)
    invalid = curl("https://1.1.1.1/cdn-cgi/trace", port=17891, max_time=15)
    record("invalid_uuid_denied", baseline["exitCode"] == 0 and invalid["exitCode"] != 0 and invalid["httpCode"] == 0, **invalid)
    for index in range(6):
        response = curl("https://www.google.com/generate_204", max_time=20)
        record("repeat_request_" + str(index + 1), response["exitCode"] == 0 and response["httpCode"] == 204, **response)
        time.sleep(1)
    response = curl("https://speed.cloudflare.com/__down?bytes=10000000", max_time=45)
    record("bounded_download_10MB", response["exitCode"] == 0 and response["httpCode"] == 200 and response["bytes"] == 10000000, **response)
finally:
    for process in processes:
        process.terminate()
    for process in processes:
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
    for log in logs:
        log.close()
    results["finishedAt"] = time.strftime("%Y-%m-%dT%H:%M:%S%z")
    results["allPassed"] = bool(results["tests"]) and all(t["passed"] for t in results["tests"])
    (PRIVATE / "acceptance-results.json").write_text(json.dumps(results, indent=2, ensure_ascii=False) + "\n")
    print("Temporary client processes stopped; system proxy unchanged.", flush=True)
