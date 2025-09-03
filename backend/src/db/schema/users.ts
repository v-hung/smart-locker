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

export const users = table(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    fullName: t.text("full_name"),
    email: t.text().notNull(),
    password: t.text().notNull(),
    role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
    createdAt: t.text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)]
);

export const usersRelations = relations(users, ({ one }) => ({
  locker: one(lockers),
}));

export const userSelectSchema = createSelectSchema(users).omit({
  password: true,
});
export const userInsertSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users);

z.globalRegistry.add(userSelectSchema, { id: "User" });
z.globalRegistry.add(userInsertSchema, { id: "UserInsert" });
z.globalRegistry.add(userUpdateSchema, { id: "UserUpdate" });
