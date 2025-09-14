import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { lockers } from "./lockers";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const branches = table("branches", {
  id: t.int().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  address: t.text().notNull(),
  location: t.text(),

  createdAt: t
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$type<Date>(),
});

export const branchesRelations = relations(branches, ({ many }) => ({
  lockers: many(lockers),
}));

export const branchSelectSchema = createSelectSchema(branches);
export const branchInsertSchema = createInsertSchema(branches);
export const branchUpdateSchema = createUpdateSchema(branches);

z.globalRegistry.add(branchSelectSchema, { id: "Branch" });
z.globalRegistry.add(branchInsertSchema, { id: "BranchInsert" });
z.globalRegistry.add(branchUpdateSchema, { id: "BranchUpdate" });
