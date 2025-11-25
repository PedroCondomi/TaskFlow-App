import { Request, Response, NextFunction } from "express";
import Team from "../models/Team.js";
import Task from "../models/Task.js";

const isTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId } = req.body;

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
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.team)
      return res.status(403).json({ message: "Only admins can modify tasks" });

    const team = await Team.findById(task.team);

    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.admins.includes(req.user._id))
      return res
        .status(403)
        .json({ message: "Only team admins can modify tasks" });

    next();
  } catch (err) {
    res.status(500).json({ message: `Admin permission error: ${err}` });
  }
};

export { isTeamAdmin, isTeamMember };
