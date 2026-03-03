import api from "./axios";
import { Task } from "../types/task";

export type CreateTaskInput = {
  title: string;
  description?: string;
  team?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
};

export const getMyTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks/mytasks");
  return res.data.tasks;
};

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (task: CreateTaskInput) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<{
    title: string;
    status: "pending" | "in progress" | "completed";
    priority: "low" | "medium" | "high";
  }>;
}) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const assignTask = async ({
  id,
  assignedTo,
}: {
  id: string;
  assignedTo: string;
}) => {
  const res = await api.put(`/tasks/${id}/assign`, {
    assignedTo,
  });

  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
