import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { readdirSync } from "fs";
import { createServer, IncomingMessage } from "http";
import { join } from "path";

interface tinyMessage extends IncomingMessage {
  query?: any
}

function startServer() {
  const pagesDir = join(process.cwd(), "dist/pages");
  const pages = readdirSync(pagesDir).map(
    (page) => page.split(".")[0]
  );

  const server = createServer(async (req: tinyMessage, res) => {
    const urlParts = req.url && req.url !== "/" ? req.url.split("/") : ["", "index"];
    const page = urlParts[1];

    if (pages.includes(page)) {
      const file = await import(`file://${join(pagesDir, `${page}.js`)}`);
      const Component = file.default;

      var props = {};
      if (file.getServerSideProps) {
        props = await file.getServerSideProps({ query: req.query });
      }

      const { pipe } = renderToPipeableStream(
        <body>
          <div id="root">
            <Component {...props} />
          </div>
        </body>,
        { bootstrapScripts: ["http://localhost:3000/src/index.js"] }
      );

      pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`Page ${page} not found in ${pages} at ${pagesDir}.`)
    }
  });

  server.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
    console.log(`Reading pages from ${pagesDir}`);
    console.log(`Available pages: ${pages}`);
  });
}

export { startServer };