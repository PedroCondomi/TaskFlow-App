import api from "./axios";
import { Team } from "../types/team";

export type CreateTeamInput = {
  name: string;
  description?: string;
};

export const getTeams = async (): Promise<Team[]> => {
  const res = await api.get("/teams");
  return res.data;
};

export const getMyTeams = async (): Promise<Team[]> => {
  const res = await api.get("/teams/myteams");
  return res.data;
};

export const createTeam = async (data: CreateTeamInput): Promise<Team> => {
  const res = await api.post("/teams", data);
  return res.data;
};

export const updateTeam = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<{
    name: string;
    description?: string;
  }>;
}) => {
  const res = await api.put(`/teams/${id}`, data);
  return res.data;
};

export const deleteTeam = async (id: string): Promise<Team> => {
  const res = await api.delete(`/teams/${id}`);
  return res.data;
};

export const addMember = async (teamId: string, userId: string) => {
  const res = await api.put(`/teams/${teamId}/members`, {
    userId,
  });
  return res.data;
};

export const removeMember = async (teamId: string, userId: string) => {
  const res = await api.delete(`/teams/${teamId}/members`, {
    data: { userId },
  });
  return res.data;
};

export const promoteMember = async (teamId: string, userId: string) => {
  const res = await api.put(`/teams/${teamId}/promote`, {
    userId,
  });
  return res.data;
};

export const demoteAdmin = async (teamId: string, userId: string) => {
  const res = await api.put(`/teams/${teamId}/demote`, {
    userId,
  });
  return res.data;
};
