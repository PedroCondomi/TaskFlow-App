import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  isTeamMember,
  isTaskTeamAdmin,
  isAdmin,
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

router.get("/", [verifyToken, isAdmin], getAllTasks);

router.get("/:id", [verifyToken], getTaskById);
router.put("/:id", [verifyToken, isTaskTeamAdmin], updateTask);
router.delete("/:id", [verifyToken, isTaskTeamAdmin], deleteTask);

export default router;
