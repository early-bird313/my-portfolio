import os
import sys
import socket
import time
import subprocess

def is_port_in_use(port=5173):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def start_daemon():
    if is_port_in_use(5173):
        print("Port 5173 is already in use and running!")
        return True

    dist_dir = "/home/minhaj-ahmed-pabel/Documents/As Suunah-20261011T111654Z-1-001/As Suunah/AI/web/Day 01/portfolio website/dist"

    pid = os.fork()
    if pid > 0:
        # Exit parent process
        return True

    os.setsid()
    os.umask(0)

    pid2 = os.fork()
    if pid2 > 0:
        sys.exit(0)

    sys.stdout.flush()
    sys.stderr.flush()

    with open("/tmp/portfolio_server.log", "a+") as f:
        os.dup2(f.fileno(), sys.stdin.fileno())
        os.dup2(f.fileno(), sys.stdout.fileno())
        os.dup2(f.fileno(), sys.stderr.fileno())

    os.execlp("python3", "python3", "-m", "http.server", "5173", "--directory", dist_dir)

if __name__ == "__main__":
    start_daemon()
    time.sleep(0.3)
    print("Server running status on 5173:", is_port_in_use(5173))
