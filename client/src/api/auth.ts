import api from "./axios";
import { User } from "../types/user";

export type LoginResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
  role: "user" | "admin";
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  adminSecret?: string;
};

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data;
};

export const registerUser = async (data: RegisterInput): Promise<User> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
