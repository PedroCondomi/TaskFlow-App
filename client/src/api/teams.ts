import api from "./axios";
import { Team } from "../types/team";

export const getTeams = async (): Promise<Team[]> => {
  const res = await api.get("/teams");
  return res.data;
};
