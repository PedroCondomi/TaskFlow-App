import { UserPreview } from "./user";

export type Team = {
  _id: string;
  name: string;
  description?: string;
  members?: string[];
  admins: string[];
};

export type TeamWithMembers = {
  _id: string;
  name: string;
  members: UserPreview[];
};
