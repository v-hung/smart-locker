import db from "../config/db";
import { lockers } from "../db/schema/lockers";
import { eq } from "drizzle-orm";

export const getAll = async () => {
  return await db.query.users.findMany();
};

export const getById = async (id: number) => {
  const [locker] = await db.query.users.findMany({
    where: eq(lockers.id, id),
  });
  return locker;
};

export const create = async (data: {
  lockerCode: string;
  location: string;
}) => {
  const [locker] = await db.insert(lockers).values(data).returning();
  return locker;
};

export const update = async (
  id: number,
  data: Partial<typeof lockers.$inferInsert>
) => {
  const [locker] = await db
    .update(lockers)
    .set(data)
    .where(eq(lockers.id, id))
    .returning();
  return locker;
};

export const remove = async (id: number) => {
  const result = await db.delete(lockers).where(eq(lockers.id, id));
  return result.rowsAffected > 0;
};
