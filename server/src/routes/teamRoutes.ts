import { Router } from "express";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";
import { isTeamAdmin, isTeamMember } from "../middlewares/teamPermissions.js";
import {
  createTeam,
  getMyTeams,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
  promoteMember,
} from "../controllers/teamController.js";

const router = Router();

// Logged users
router.get("/myteams", [verifyToken], getMyTeams);
router.get("/:id", [verifyToken, isTeamMember], getTeamById);

// Global admins
router.get("/", [verifyToken, requireRole("admin")], getAllTeams);
router.post("/", [verifyToken, requireRole("admin")], createTeam);
router.put("/:id", [verifyToken, requireRole("admin")], updateTeam);
router.delete("/:id", [verifyToken, requireRole("admin")], deleteTeam);

// Team admins
router.post("/:id/members", [verifyToken, isTeamAdmin], addMember);
router.delete("/:id/members", [verifyToken, isTeamAdmin], removeMember);
router.delete("/:id/promote", [verifyToken, isTeamAdmin], promoteMember);

export default router;
