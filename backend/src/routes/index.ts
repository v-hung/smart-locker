import { Router } from "express";
import lockerRoutes from "./locker.routes";

const router = Router();

router.use("/lockers", lockerRoutes);

export default router;
