import { FastifyInstance } from "fastify";
import * as lockerController from "../controllers/locker.controller";
import z from "zod";
import {
  lockerInsertSchema,
  lockerSelectSchema,
  lockerUpdateSchema,
} from "../db/schema";
import { paginationSchema } from "../schemas/auth/pagination.schema";
import {
  lockerWithRelationsSchema,
  paginatedLockerSchema,
} from "../schemas/locker/locker.schema";

async function routes(app: FastifyInstance) {
  app.get(
    "",
    {
      schema: {
        response: {
          200: lockerSelectSchema.array(),
        },
      },
    },
    lockerController.getAllLockers
  );

  app.get(
    "/search",
    {
      schema: {
        querystring: paginationSchema,
        response: {
          200: paginatedLockerSchema,
        },
      },
    },
    lockerController.searchLockers
  );

  app.get(
    "/:id",
    {
      schema: {
        response: {
          200: lockerWithRelationsSchema,
        },
      },
    },
    lockerController.getLockerById
  );

  app.post(
    "",
    {
      schema: {
        body: lockerInsertSchema,
        response: {
          200: lockerSelectSchema,
        },
      },
    },
    lockerController.createLocker
  );

  app.put(
    "/:id",
    {
      schema: {
        body: lockerUpdateSchema,
        response: {
          200: lockerSelectSchema,
        },
      },
    },
    lockerController.updateLocker
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
    lockerController.deleteLocker
  );
}

export default routes;
