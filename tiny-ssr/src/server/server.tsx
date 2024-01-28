import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { readdirSync } from "fs";
import { createServer } from "http";
import { join } from "path";

function startServer(port: number) {
  const pagesDir = join(process.cwd(), "build/pages");
  const pages = readdirSync(pagesDir).map(
    (page) => page.split(".")[0]
  );

  const server = createServer(async (req, res) => {
    const urlParts = req.url && req.url !== "/" ? req.url.split("/") : ["", "index"];
    const page = urlParts[1];

    if (pages.includes(page)) {
      const file = await import(`file://${join(pagesDir, `${page}.js`)}`);
      const Component = file.default;

      const { pipe } = renderToPipeableStream(
        <body>
          <div id="root">
            <Component />
          </div>
        </body>,
        { bootstrapScripts: ["/index.js"] }
      );

      pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`Page ${page} not found in ${pages} at ${pagesDir}.`)
    }
  });

  server.listen(port, () => {
    console.log("Server is running at http://localhost:3000");
    console.log(`Reading pages from ${pagesDir}`);
    console.log(`Available pages: ${pages}`);
  });
}

export { startServer };