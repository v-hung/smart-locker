import z from "zod";
import { createPaginatedSchema } from "../../utils/schema.utils";
import { branchSelectSchema } from "../../db/schema/branches";
import { lockerSelectSchema } from "../../db/schema";

export const paginatedBranchSchema = createPaginatedSchema(branchSelectSchema);

export type PaginatedBranch = z.infer<typeof paginatedBranchSchema>;

export const branchWithRelationsSchema = branchSelectSchema.extend({
  lockers: lockerSelectSchema.array(),
});

z.globalRegistry.add(paginatedBranchSchema, { id: "paginatedBranch" });
z.globalRegistry.add(branchWithRelationsSchema, { id: "branchWithRelations" });
