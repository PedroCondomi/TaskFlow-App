import { UserPreview } from "./user";

export type Team = {
  _id: string;
  name: string;
  description?: string;
  members: TeamUser[];
  admins: TeamUser[];
  active: boolean;
};

export type TeamUser = {
  _id: string;
  name: string;
  email: string;
};

export type TeamWithMembers = {
  _id: string;
  name: string;
  members: UserPreview[];
};
