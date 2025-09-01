import { Request, Response } from "express";
import * as lockerService from "../services/locker.service";

export const getAllLockers = async (_req: Request, res: Response) => {
  const lockers = await lockerService.getAll();
  res.json(lockers);
};

export const getLockerById = async (req: Request, res: Response) => {
  res.json({});
  // const locker = await lockerService.getById(Number(req.params.id));
  // if (!locker) return res.status(404).json({ message: "Locker not found" });
  // res.json(locker);
};

export const createLocker = async (req: Request, res: Response) => {
  res.json({});
  // const locker = await lockerService.create(req.body);
  // res.status(201).json(locker);
};

export const updateLocker = async (req: Request, res: Response) => {
  res.json({});
  // const locker = await lockerService.update(Number(req.params.id), req.body);
  // if (!locker) return res.status(404).json({ message: "Locker not found" });
  // res.json(locker);
};

export const deleteLocker = async (req: Request, res: Response) => {
  res.json({});
  // const success = await lockerService.remove(Number(req.params.id));
  // if (!success) return res.status(404).json({ message: "Locker not found" });
  // res.status(204).send();
};
