import { Hono } from "hono";
// import { serveStatic } from "@hono/node-server/serve-static";
// import { promises as fs } from "node:fs";

const app = new Hono();

app.get("/ping", (c) => c.text("pong"));

// app.get("/:full_path{.*}", async (c) => {
//   const full_path = c.req.param("full_path") ?? "";
//   const file_path = "./public/" + full_path;

//   try {
//     const stat = await fs.stat(file_path);

//     if (stat.isFile()) {
//       return serveStatic({ path: file_path })(c, async () => {});
//     }
//   } catch {}

//   return serveStatic({ path: "./public/index.html" })(c, async () => {});
// });

export default app;
