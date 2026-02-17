import api from "./axios";

export type LoginResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data;
}
