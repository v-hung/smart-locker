import { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.controller";
import z from "zod";
import {
  userInsertSchema,
  userSelectSchema,
  userUpdateSchema,
} from "../db/schema";
import { paginationSchema } from "../schemas/auth/pagination.schema";
import {
  paginatedUserSchema,
  userWithRelationsSchema,
} from "../schemas/user/user.schema";

async function routes(app: FastifyInstance) {
  app.get(
    "",
    {
      schema: {
        response: {
          200: userSelectSchema.array(),
        },
      },
    },
    userController.getAllUsers
  );

  app.get(
    "/search",
    {
      schema: {
        querystring: paginationSchema,
        response: {
          200: paginatedUserSchema,
        },
      },
    },
    userController.searchUsers
  );

  app.get(
    "/:id",
    {
      schema: {
        response: {
          200: userWithRelationsSchema,
        },
      },
    },
    userController.getUserById
  );

  app.post(
    "",
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
    "/:id",
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
    "/:id",
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
