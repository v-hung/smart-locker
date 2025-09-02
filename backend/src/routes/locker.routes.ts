import { FastifyInstance } from "fastify";
import * as lockerController from "../controllers/locker.controller";
import z from "zod";
import { lockerInsertSchema, lockerSelectSchema } from "../db/schema";

async function routes(app: FastifyInstance) {
  app.get(
    "/lockers",
    {
      schema: {
        response: {
          200: z.array(lockerSelectSchema),
        },
      },
    },
    lockerController.getAllLockers
  );

  app.get("/lockers/:id", lockerController.getLockerById);

  app.post(
    "/lockers",
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
}

export default routes;
