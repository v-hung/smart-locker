import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export const lockers = table("lockers", {
  id: t.int().primaryKey({ autoIncrement: true }),
  lockerCode: t.text("locker_code").notNull().unique(),
  location: t.text("location").notNull(),
  status: t.text("status").notNull().default("available"), // available, in_use, maintenance
  createdAt: t.text("created_at").default(sql`CURRENT_TIMESTAMP`),

  // relations
  userId: t.integer("user_id").references(() => users.id),
});

export const lockerRelations = relations(lockers, ({ one }) => ({
  user: one(users, { fields: [lockers.userId], references: [users.id] }),
}));

export const lockerSelectSchema = createSelectSchema(lockers);

export const lockerInsertSchema = createInsertSchema(lockers);
export type lockerInsertType = z.infer<typeof lockerInsertSchema>;
