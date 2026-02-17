import { UserPreview } from "./user";
import { TeamWithMembers } from "./team";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdBy: UserPreview;
  assignedTo?: UserPreview;
  team?: TeamWithMembers;
};
