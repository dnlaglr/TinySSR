import * as fs from "fs";
import * as http from "http";
import * as path from "path";

function serveStaticFiles(port: number, staticDir: string) {
  const server = http.createServer((req, res) => {
    const reqPath = req.url === "/" ? "index.html" : req.url || "index.html";
    const filePath = path.join(process.cwd(), staticDir, reqPath);

    fs.readFile(filePath, (err, data) => {
      console.log(filePath);
      if (err) {
        res.writeHead(404, {"Content-Type": "text/html" });
        res.end("Error: Path not found.");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    })
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(staticDir)
  });
}

export { serveStaticFiles };