import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON body

// Swagger JSDoc options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "A sample API for demonstration",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [path.resolve(__dirname, "./routes/*.ts")], // Path to your API route files with JSDoc comments
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve Swagger UI at a specific route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/*splat", (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
