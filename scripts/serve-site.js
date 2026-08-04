const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = 4173;
const siteDir = path.join(__dirname, "..", "site");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function resolveFile(urlPath) {
  if (urlPath === "/") return path.join(siteDir, "index.html");
  if (urlPath === "/login") return path.join(siteDir, "login.html");
  if (urlPath === "/forgot") return path.join(siteDir, "forgot.html");
  if (urlPath === "/about") return path.join(siteDir, "about.html");
  if (urlPath === "/dashboard") return path.join(siteDir, "dashboard.html");

  const normalized = path.normalize(urlPath).replace(/^\\+|^\/+/, "");
  return path.join(siteDir, normalized);
}

const server = http.createServer((req, res) => {
  const requestPath = req.url ? req.url.split("?")[0] : "/";
  const filePath = resolveFile(requestPath);

  if (!filePath.startsWith(siteDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(port, host, () => {
  process.stdout.write(`Teaching site running at http://${host}:${port}\n`);
});
