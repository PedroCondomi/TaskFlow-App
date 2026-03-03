import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";
import {
  isTeamMember,
  isTaskTeamAdmin,
  isTeamAdmin,
} from "../middlewares/teamPermissions.js";
import {
  createTask,
  assignTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", [verifyToken, isTeamMember], createTask);

router.get("/mytasks", [verifyToken], getMyTasks);
router.put("/:id/assign", [verifyToken, isTaskTeamAdmin], assignTask);

router.get("/", verifyToken, getAllTasks);

router.get("/:id", [verifyToken], getTaskById);
router.put("/:id", [verifyToken, isTaskTeamAdmin], updateTask);
router.delete("/:id", [verifyToken, isTaskTeamAdmin], deleteTask);

export default router;
