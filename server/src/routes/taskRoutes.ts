import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isTeamMember, isTeamAdmin } from "../middlewares/teamPermissions.js";
import {
  createTask,
  assignTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", [verifyToken, isTeamMember], createTask);
router.put("/:id", [verifyToken, isTeamAdmin], updateTask);
router.put("/:id/assign", [verifyToken, isTeamAdmin], assignTask);
router.get("/", [verifyToken], getAllTasks);
router.get("/:id", [verifyToken], getTaskById);
router.delete("/:id", [verifyToken, isTeamAdmin], deleteTask);

export default router;
