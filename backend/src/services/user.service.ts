import db from "../config/db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { PaginationInput } from "../schemas/auth/pagination.schema";
import { lockers } from "../db/schema";
import { PaginatedUser } from "../schemas/user/user.schema";

export const getAll = async () => {
  return await db.select().from(users);
};

export const search = async (
  input: PaginationInput
): Promise<PaginatedUser> => {
  const limit = input.pageSize;
  const offset = (input.page - 1) * input.pageSize;

  const data = await db.select().from(users).offset(offset).limit(limit);

  const total = await db.$count(users);

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
  const [user] = await db
    .select()
    .from(users)
    .leftJoin(users, eq(users.id, lockers.id))
    .where(eq(users.id, id));

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
