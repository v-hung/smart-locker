import { Router } from "express";
import * as lockerController from "../controllers/locker.controller";

const router = Router();

/**
 * @swagger
 * /api/lockers:
 *   get:
 *     summary: Lấy danh sách tủ đồ
 *     tags: [Lockers]
 *     responses:
 *       200:
 *         description: Danh sách tủ đồ
 */
router.get("/", lockerController.getAllLockers);

// GET /api/lockers/:id → lấy chi tiết 1 tủ
router.get("/:id", lockerController.getLockerById);

// POST /api/lockers → tạo tủ mới
router.post("/", lockerController.createLocker);

// PUT /api/lockers/:id → cập nhật tủ
router.put("/:id", lockerController.updateLocker);

// DELETE /api/lockers/:id → xoá tủ
router.delete("/:id", lockerController.deleteLocker);

export default router;
