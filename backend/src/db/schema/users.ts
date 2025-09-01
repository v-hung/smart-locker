import { relations, sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { lockers } from "./lockers";

export const users = table(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    firstName: t.text("first_name"),
    lastName: t.text("last_name"),
    email: t.text().notNull(),
    role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
    createdAt: t.integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)]
);

export const usersRelations = relations(users, ({ one }) => ({
  locker: one(lockers),
}));
