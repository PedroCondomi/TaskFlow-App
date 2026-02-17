import { Request, Response, NextFunction } from "express";
import Team from "../models/Team.js";
import Task from "../models/Task.js";

const isTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const teamId = req.params.id;

    if (!teamId) return next(); // Personal task, allowed

    const team = await Team.findById(teamId);
    if (!team || !team.active)
      return res.status(404).json({ message: "Team not found" });

    if (!team.members.includes(req.user._id))
      return res.status(403).json({ message: "Not a member of this team" });

    next();
  } catch (err) {
    res.status(500).json({ message: `Permission error: ${err}` });
  }
};

const isTeamAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await Team.findOne({ _id: req.params.id, active: true });

    if (!team) return res.status(404).json({ message: "Team not found" });

    const requesterId = req.user._id.toString();
    const isAdmin = team.admins.some(id => id.toString() === requesterId);

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only team admins can perform this action" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: `Admin permission error: ${err}` });
  }
};

const isTaskTeamAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🟢 TASK PERSONAL
    if (!task.team) {
      // owner o admin global
      if (
        task.createdBy.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return next();
    }

    // 🟣 TASK DE TEAM
    const team = await Team.findById(task.team);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const isAdmin = team.admins.some(id => id.equals(req.user._id));

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only team admins can modify tasks" });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: `Task team-admin validation error: ${err}`,
    });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "User must be an admin" });
  }
  next();
};

export { isTeamAdmin, isTeamMember, isTaskTeamAdmin, isAdmin };
