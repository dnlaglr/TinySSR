"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  serveStaticFiles: () => serveStaticFiles
});
module.exports = __toCommonJS(src_exports);

// src/server.ts
var fs = __toESM(require("fs"));
var http = __toESM(require("http"));
var path = __toESM(require("path"));
function serveStaticFiles(port, staticDir) {
  const server = http.createServer((req, res) => {
    const reqPath = req.url === "/" ? "index.html" : req.url || "index.html";
    const filePath = path.join(process.cwd(), staticDir, reqPath);
    fs.readFile(filePath, (err, data) => {
      console.log(filePath);
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("Error: Path not found.");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  });
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(staticDir);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serveStaticFiles
});
