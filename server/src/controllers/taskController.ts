import { Request, Response } from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Team from "../models/Team.js";

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, team } =
      req.body;

    const creatorId = req.user._id;

    let finalAssignedTo = assignedTo || creatorId;

    const taskExists = await Task.findOne({ title });
    if (taskExists)
      return res.status(400).json({ message: "Task already exists" });

    // Validate assigned user
    const assignedUser = await User.findOne({
      _id: finalAssignedTo,
      active: true,
    });
    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user not found" });
    }

    // Validate membership if team
    if (team) {
      const teamDoc = await Team.findOne({
        _id: team,
        active: true,
        members: creatorId,
      });

      if (!teamDoc) {
        return res.status(403).json({
          message: "You must be a member of the team to create tasks in it",
        });
      }

      // If assignedTo is different from creator, ensure they are also members
      if (!teamDoc.members.some(id => id.equals(finalAssignedTo))) {
        return res.status(400).json({
          message: "Assigned user must be a member of the same team",
        });
      }
    }

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      priority: priority || "low",
      dueDate,
      assignedTo: finalAssignedTo,
      team: team || undefined,
      createdBy: creatorId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: `Error creating task: ${err}` });
  }
};

const assignTask = async (req: Request, res: Response) => {
  try {
    const { assignedTo } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const user = await User.findOne({ _id: assignedTo, active: true });
    if (!user) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    if (task.team) {
      const team = await Team.findOne({ _id: task.team, active: true });

      if (!team) return res.status(404).json({ message: "Team not found" });

      if (!team.members.some(id => id.equals(assignedTo))) {
        return res.status(400).json({
          message: "User must be part of the team to be assigned this task",
        });
      }
    } else {
      // Personal tasks can't be assigned to others
      if (!assignedTo.equals(task.createdBy)) {
        return res.status(403).json({
          message: "Personal tasks can only be assigned to the creator",
        });
      }
    }

    task.assignedTo = assignedTo;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: `Error assigning task: ${err}` });
  }
};

const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving tasks: ${err}` });
  }
};

const getMyTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const teams = await Team.find({
      active: true,
      members: userId,
    }).select("_id");

    const teamIds = teams.map(team => team._id);

    const tasks = await Task.find({
      $or: [
        { createdBy: userId },
        { assignedTo: userId },
        { team: { $in: teamIds } },
      ],
    })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("team", "name");

    return res.json({ tasks });
  } catch (err) {
    return res.status(500).json({
      message: `Error fetching tasks: ${err}`,
    });
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving task: ${err}` });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: `Error updating task: ${err}` });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: `task ${deleted.title} deleted` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting task: ${err}` });
  }
};

export {
  createTask,
  assignTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
};
