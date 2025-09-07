import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { users, userSelectSchema } from "./users";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const lockers = table("lockers", {
  id: t.int().primaryKey({ autoIncrement: true }),
  lockerCode: t.text("locker_code").notNull().unique(),
  location: t.text("location").notNull(),
  status: t
    .text({ enum: ["available", "in_use", "maintenance"] })
    .notNull()
    .default("available"),
  createdAt: t
    .text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$type<Date>(),

  // relations
  userId: t.integer("user_id").references(() => users.id),
});

export const lockerRelations = relations(lockers, ({ one }) => ({
  user: one(users, { fields: [lockers.userId], references: [users.id] }),
}));

export const lockerSelectSchema = createSelectSchema(lockers);
export const lockerInsertSchema = createInsertSchema(lockers);
export const lockerUpdateSchema = createUpdateSchema(lockers);

z.globalRegistry.add(lockerSelectSchema, { id: "Locker" });
z.globalRegistry.add(lockerInsertSchema, { id: "LockerInsert" });
z.globalRegistry.add(lockerUpdateSchema, { id: "LockerUpdate" });
