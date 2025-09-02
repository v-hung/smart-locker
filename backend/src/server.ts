import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import registerRoutes from "./routes";
import fastifyStatic from "@fastify/static";
import { BASE_DIR } from "./config";
import jwtPlugin from "./plugins/jwt.plugin";

const PORT = +(process.env.PORT || 3000);

const app = Fastify({
  logger: true,
});

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>();

// 📌 Đăng ký Swagger
app.register(swagger, {
  openapi: {
    info: {
      title: "Smart Locker API",
      description: "API quản lý tủ đồ",
      version: "1.0.0",
    },
    servers: [],
    components: {
      securitySchemes: {
        // JWT qua Authorization header
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

app.register(jwtPlugin);

app.register(fastifyStatic, {
  root: BASE_DIR + "/public",
});

app.register(registerRoutes, { prefix: "/api" });

// Run the server!
app.listen({ port: PORT }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
