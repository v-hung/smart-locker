import z from "zod";
import { lockerSelectSchema, userSelectSchema } from "../../db/schema";
import { createPaginatedSchema } from "../../utils/schema.utils";

export const paginatedLockerSchema = createPaginatedSchema(lockerSelectSchema);

export type PaginatedLocker = z.infer<typeof paginatedLockerSchema>;

export const lockerWithRelationsSchema = lockerSelectSchema.extend({
  user: userSelectSchema.nullable(),
});

z.globalRegistry.add(paginatedLockerSchema, { id: "paginatedLocker" });
z.globalRegistry.add(lockerWithRelationsSchema, { id: "lockerWithRelations" });
