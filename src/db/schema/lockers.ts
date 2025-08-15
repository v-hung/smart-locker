import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const lockers = table("lockers", {
  id: t.int().primaryKey({ autoIncrement: true }),
  lockerCode: t.text("locker_code").notNull().unique(),
  location: t.text("location").notNull(),
  status: t.text("status").notNull().default("available"), // available, in_use, maintenance
  createdAt: t.integer("created_at").default(sql`CURRENT_TIMESTAMP`),

  // relations
  userId: t.integer("user_id").references(() => users.id),
});

export const lockerRelations = relations(lockers, ({ one }) => ({
  user: one(users, { fields: [lockers.userId], references: [users.id] }),
}));
