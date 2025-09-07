import z from "zod";
import { lockerSelectSchema, userSelectSchema } from "../../db/schema";
import { createPaginatedSchema } from "../../utils/schema.utils";

export const paginatedUserSchema = createPaginatedSchema(userSelectSchema);

export type PaginatedUser = z.infer<typeof paginatedUserSchema>;

export const userWithRelationsSchema = userSelectSchema.extend({
  locker: lockerSelectSchema.nullable(),
});

z.globalRegistry.add(userWithRelationsSchema, { id: "userWithRelations" });
