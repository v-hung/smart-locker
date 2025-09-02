import db from "../config/db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";

export const getAll = async () => {
  return await db.query.users.findMany();
};

export const getById = async (id: number) => {
  const [user] = await db.query.users.findMany({
    where: eq(users.id, id),
  });
  return user;
};

export const create = async (data: typeof users.$inferInsert) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const update = async (
  id: number,
  data: Partial<typeof users.$inferInsert>
) => {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};

export const remove = async (id: number) => {
  const result = await db.delete(users).where(eq(users.id, id));
  return result.rowsAffected > 0;
};
