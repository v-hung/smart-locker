import { FastifyReply, FastifyRequest } from "fastify";
import * as lockerService from "../services/locker.service";
import { lockers } from "../db/schema";
import { PaginationInput } from "../schemas/auth/pagination.schema";
import { PaginatedLocker } from "../schemas/locker/locker.schema";

export const getAllLockers = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  return lockerService.getAll();
};

export const searchLockers = async (
  req: FastifyRequest<{ Body: PaginationInput }>,
  reply: FastifyReply
): Promise<PaginatedLocker> => {
  return lockerService.search(req.body);
};

export const getLockerById = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return lockerService.getById(id);
};

export const createLocker = async (
  req: FastifyRequest<{ Body: typeof lockers.$inferInsert }>,
  reply: FastifyReply
) => {
  return lockerService.create(req.body);
};

export const updateLocker = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: typeof lockers.$inferInsert;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return lockerService.update(id, req.body);
};

export const deleteLocker = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return lockerService.remove(id);
};
