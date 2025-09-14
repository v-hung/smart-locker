import { FastifyReply, FastifyRequest } from "fastify";
import * as branchService from "../services/branch.service";
import { branches } from "../db/schema";
import { PaginationInput } from "../schemas/auth/pagination.schema";
import { PaginatedBranch } from "../schemas/branch/branch.schema";

export const getAllBranches = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  return branchService.getAll();
};

export const searchBranches = async (
  req: FastifyRequest<{ Body: PaginationInput }>,
  reply: FastifyReply
): Promise<PaginatedBranch> => {
  return branchService.search(req.body);
};

export const getBranchById = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return branchService.getById(id);
};

export const createBranch = async (
  req: FastifyRequest<{ Body: typeof branches.$inferInsert }>,
  reply: FastifyReply
) => {
  return branchService.create(req.body);
};

export const updateBranch = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: typeof branches.$inferInsert;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return branchService.update(id, req.body);
};

export const deleteBranch = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  return branchService.remove(id);
};
