import { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/user.service";
import { users } from "../db/schema";

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  return userService.getAll();
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
