import mongoose, { Schema, Types } from "mongoose";

export interface ITeam {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[];
  active: boolean;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>("Team", teamSchema);
