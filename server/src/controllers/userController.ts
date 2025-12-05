import { Request, Response } from "express";
import User from "../models/User.js";

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({ active: true }).select("-active -__v");
    if (!users) return res.status(404).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving users: ${err}` });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      active: true,
    }).select("-active -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving user: ${err}` });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, active: true },
      req.body,
      {
        new: true,
      }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: `Error updating user: ${err}` });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await User.findOneAndUpdate(
      { _id: req.params.id, active: true },
      { active: false },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ user: deleted, message: `User ${deleted.name} deleted` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting user: ${err}` });
  }
};

const getMyProfile = async (req: any, res: Response) => {
  res.status(200).json(req.user);
};

export { getAllUsers, getUserById, updateUser, deleteUser, getMyProfile };
