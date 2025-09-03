import { FastifyInstance } from "fastify";
import * as authController from "../controllers/auth.controller";
import {
  loginBodySchema,
  loginResponseSchema,
} from "../schemas/auth/login.schema";
import { userSelectSchema } from "../db/schema";
import { securitySchema } from "../utils/router.utils";

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
    authController.login
  );

  app.get(
    "/load",
    {
      schema: {
        security: securitySchema,
        response: {
          200: userSelectSchema,
        },
      },
    },
    authController.load
  );
}

export default routes;
