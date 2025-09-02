import { FastifyInstance } from "fastify";
import { login } from "../controllers/auth.controller";
import {
  loginBodySchema,
  loginResponseSchema,
} from "../schemas/auth/login.schema";

async function routes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      schema: {
        body: loginBodySchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    login
  );
}

export default routes;
