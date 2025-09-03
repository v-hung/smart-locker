import { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.controller";
import z from "zod";
import {
  userInsertSchema,
  userSelectSchema,
  userUpdateSchema,
} from "../db/schema";

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

  app.put(
    "/users/:id",
    {
      schema: {
        body: userUpdateSchema,
        response: {
          200: userSelectSchema,
        },
      },
    },
    userController.updateUser
  );

  app.delete(
    "/users/:id",
    {
      schema: {
        response: {
          200: z.boolean(),
        },
      },
    },
    userController.deleteUser
  );
}

export default routes;
