import { Request, Response } from "express";
import Team from "../models/Team.js";

const createTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: `Error creating team: ${err}` });
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
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving team: ${err}` });
  }
};

const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: `Error updating team: ${err}` });
  }
};

const deleteTeam = async (req: Request, res: Response) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: `Team "${deleted.name}" deleted` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting team: ${err}` });
  }
};

export { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };
