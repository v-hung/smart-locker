import z from "zod";
import { lockerSelectSchema, userSelectSchema } from "../../db/schema";
import { createPaginatedSchema } from "../../utils/schema.utils";
import { branchSelectSchema } from "../../db/schema/branches";

export const paginatedLockerSchema = createPaginatedSchema(lockerSelectSchema);

export type PaginatedLocker = z.infer<typeof paginatedLockerSchema>;

export const lockerWithRelationsSchema = lockerSelectSchema.extend({
  user: userSelectSchema.nullable(),
  branch: branchSelectSchema.nullable(),
});

z.globalRegistry.add(paginatedLockerSchema, { id: "paginatedLocker" });
z.globalRegistry.add(lockerWithRelationsSchema, { id: "lockerWithRelations" });
