import { Request, Response } from "express";
import Team from "../models/Team.js";
import User from "../models/User.js";

const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const exists = await Team.findOne({ name });
    if (exists) return res.status(400).json({ message: "Team already exists" });

    const newTeam = await Team.create({
      name,
      description,
      members: [req.user._id],
      admins: [req.user._id],
    });

    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ message: `Error creating team: ${err}` });
  }
};

const getMyTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find({ active: true, members: req.user._id });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving teams: ${err}` });
  }
};

const getAllTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving teams: ${err}` });
  }
};

const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      active: true,
      members: req.user._id,
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving team: ${err}` });
  }
};

const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      active: true,
      members: req.user._id,
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    const { name, description } = req.body;

    if (name) team.name = name;
    if (description !== undefined) team.description = description;

    await team.save();

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: `Error updating team: ${err}` });
  }
};

const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findOne({
      _id: req.params.id,
      active: true,
      members: req.user._id,
    });

    if (!team) return res.status(404).json({ message: "Team not found" });

    team.active = false;
    await team.save();

    res.status(200).json({ message: `Team "${team.name}" deleted` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting team: ${err}` });
  }
};

const addMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const teamId = req.params.id;
    const requesterId = req.user._id;

    const user = await User.findOne({ _id: userId, active: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: teamId,
        active: true,
        admins: requesterId, // requester must be team admin
      },
      {
        $addToSet: { members: userId },
      },
      {
        new: true,
      }
    );

    if (!updatedTeam) {
      return res.status(403).json({
        message: "Team not found or you are not an admin",
      });
    }

    const wasAdded = updatedTeam.members.some(id => id.equals(userId));
    if (!wasAdded) {
      return res.status(400).json({ message: "User is already a member" });
    }

    return res.json({ message: `Member ${user.name} added` });
  } catch (err) {
    res.status(500).json({ message: `Error adding member: ${err}` });
  }
};

const removeMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const teamId = req.params.id;
    const requesterId = req.user._id;

    const user = await User.findOne({ _id: userId, active: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: teamId,
        active: true,
        admins: requesterId, // requester must be team admin
      },
      {
        $pull: { members: userId },
      },
      {
        new: true,
      }
    );

    if (!updatedTeam) {
      return res.status(403).json({
        message: "Team not found or you are not an admin",
      });
    }

    const stillMember = updatedTeam.members.some(id => id.equals(userId));
    if (!stillMember) {
      return res.status(400).json({ message: "User is not a member" });
    }

    return res.json({ message: `Member ${user.name} removed` });
  } catch (err) {
    res.status(500).json({ message: `Error adding member: ${err}` });
  }
};

const promoteMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const teamId = req.params.id;
    const requesterId = req.user._id;

    const user = await User.findOne({ _id: userId, active: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2) Validar que el usuario sea miembro del team
    const isMember = await Team.exists({
      _id: teamId,
      active: true,
      members: userId,
    });

    if (!isMember) {
      return res.status(400).json({
        message: "User must be a member before becoming admin",
      });
    }

    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: teamId,
        active: true,
        admins: requesterId, // requester must be team admin
      },
      {
        $addToSet: { admins: userId },
      },
      {
        new: true,
      }
    );

    if (!updatedTeam) {
      return res.status(403).json({
        message: "Team not found or you are not an admin",
      });
    }

    const isNowAdmin = updatedTeam.admins.some(id => id.equals(userId));
    if (!isNowAdmin) {
      return res.status(400).json({ message: "User is already an admin" });
    }

    return res.json({ message: `Member ${user.name} promoted to admin` });
  } catch (err) {
    return res.status(500).json({ message: `Error promoting member: ${err}` });
  }
};

export {
  createTeam,
  getMyTeams,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
  promoteMember,
};
