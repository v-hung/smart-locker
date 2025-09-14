import db from "../config/db";
import { eq } from "drizzle-orm";
import { PaginationInput } from "../schemas/auth/pagination.schema";
import { PaginatedBranch } from "../schemas/branch/branch.schema";
import { branches } from "../db/schema/branches";

export const getAll = async () => {
  return await db.query.branches.findMany();
};

export const search = async (
  input: PaginationInput
): Promise<PaginatedBranch> => {
  const limit = input.pageSize;
  const offset = (input.page - 1) * input.pageSize;

  const data = await db.select().from(branches).offset(offset).limit(limit);

  const total = await db.$count(branches);

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
  const [locker] = await db.query.branches.findMany({
    where: eq(branches.id, id),
    with: {
      lockers: true,
    },
  });
  return locker;
};

export const create = async (data: typeof branches.$inferInsert) => {
  const [locker] = await db.insert(branches).values(data).returning();
  return locker;
};

export const update = async (
  id: number,
  data: Partial<typeof branches.$inferInsert>
) => {
  const [locker] = await db
    .update(branches)
    .set(data)
    .where(eq(branches.id, id))
    .returning();
  return locker;
};

export const remove = async (id: number) => {
  const result = await db.delete(branches).where(eq(branches.id, id));
  return result.rowsAffected > 0;
};
