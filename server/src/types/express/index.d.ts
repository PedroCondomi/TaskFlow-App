import { Types } from "mongoose";

declare global {
  namespace Express {
    interface UserPayload {
      _id: Types.ObjectId;
      role: "user" | "admin";
      email: string;
      name: string;
    }

    interface Request {
      user: UserPayload;
    }
  }
}
