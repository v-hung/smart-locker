import { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.controller";
import z from "zod";
import { userInsertSchema, userSelectSchema } from "../db/schema";

async function routes(app: FastifyInstance) {
  app.get(
    "/users",
    {
      schema: {
        response: {
          200: z.array(userSelectSchema),
        },
      },
    },
    userController.getAllUsers
  );

  app.get("/users/:id", userController.getUserById);

  app.post(
    "/users",
    {
      schema: {
        body: userInsertSchema,
        response: {
          200: userSelectSchema,
        },
      },
    },
    userController.createUser
  );
}

export default routes;
