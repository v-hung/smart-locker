import { FastifyInstance } from "fastify";
import * as branchController from "../controllers/branch.controller";
import z from "zod";
import {
  branchInsertSchema,
  branchSelectSchema,
  branchUpdateSchema,
} from "../db/schema";
import { paginationQuerySchema } from "../schemas/auth/pagination.schema";
import {
  paginatedBranchSchema,
  branchWithRelationsSchema,
} from "../schemas/branch/branch.schema";

async function routes(app: FastifyInstance) {
  app.get(
    "",
    {
      schema: {
        response: {
          200: branchSelectSchema.array(),
        },
      },
    },
    branchController.getAllBranches
  );

  app.post(
    "/search",
    {
      schema: {
        body: paginationQuerySchema,
        response: {
          200: paginatedBranchSchema,
        },
      },
    },
    branchController.searchBranches
  );

  app.get(
    "/:id",
    {
      schema: {
        response: {
          200: branchWithRelationsSchema,
        },
      },
    },
    branchController.getBranchById
  );

  app.post(
    "",
    {
      schema: {
        body: branchInsertSchema,
        response: {
          200: branchSelectSchema,
        },
      },
    },
    branchController.createBranch
  );

  app.put(
    "/:id",
    {
      schema: {
        body: branchUpdateSchema,
        response: {
          200: branchSelectSchema,
        },
      },
    },
    branchController.updateBranch
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
    branchController.deleteBranch
  );

  app.delete(
    "/delete",
    {
      schema: {
        body: z.object({
          ids: z.number().array(),
        }),
        response: {
          200: z.boolean(),
        },
      },
    },
    branchController.deleteBranches
  );
}

export default routes;
