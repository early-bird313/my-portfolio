import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

def run():
    dist_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")
    os.chdir(dist_dir)
    server = ThreadingHTTPServer(("0.0.0.0", 5173), CustomHandler)
    print("Serving on port 5173 with ThreadingHTTPServer...")
    sys.stdout.flush()
    server.serve_forever()

if __name__ == "__main__":
    run()
