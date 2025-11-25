import { Request, Response } from "express";
import Task from "../models/Task.js";

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, team } =
      req.body;

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      priority: priority || "low",
      dueDate,
      assignedTo,
      team,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: `Error creating task: ${err}` });
  }
};

const assignTask = async (req: Request, res: Response) => {
  try {
    const { assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    );

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

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(201).json(task);
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
    res.status(200).json({ message: `task "${deleted.title}" deleted` });
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
};
