import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/user.service";
import { users } from "../db/schema";
import { PaginationInput } from "../schemas/auth/pagination.schema";
import { PaginatedUser } from "../schemas/user/user.schema";

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  return userService.getAll();
};

export const searchUsers = async (
  req: FastifyRequest<{ Querystring: PaginationInput }>,
  reply: FastifyReply
): Promise<PaginatedUser> => {
  return userService.search(req.query);
};

export const getUserById = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return userService.getById(id);
};

export const createUser = async (
  req: FastifyRequest<{ Body: typeof users.$inferInsert }>,
  reply: FastifyReply
) => {
  return userService.create(req.body);
};

export const updateUser = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: typeof users.$inferInsert;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return userService.update(id, req.body);
};

export const deleteUser = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return userService.remove(id);
};
