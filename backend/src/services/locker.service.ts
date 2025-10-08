import db from "../config/db";
import { lockers } from "../db/schema/lockers";
import { eq, like } from "drizzle-orm";
import { PaginationInput } from "../schemas/auth/pagination.schema";
import { PaginatedLocker } from "../schemas/locker/locker.schema";

export const getAll = async () => {
  return await db.query.lockers.findMany();
};

export const search = async (
  input: PaginationInput
): Promise<PaginatedLocker> => {
  const limit = input.pageSize;
  const offset = (input.page - 1) * input.pageSize;

  const data = await db
    .select()
    .from(lockers)
    .offset(offset)
    .limit(limit)
    .where(like(lockers.lockerCode, `%${input.p}%`));

  const total = await db.$count(lockers);

  return {
    data,
    meta: {
      page: input.page,
      pageSize: input.pageSize,
      total,
      totalPages: Math.ceil(total / input.pageSize),
    },
  };
};

export const getById = async (id: number) => {
  const [locker] = await db.query.lockers.findMany({
    where: eq(lockers.id, id),
    with: {
      user: true,
    },
  });
  return locker;
};

export const create = async (data: typeof lockers.$inferInsert) => {
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
