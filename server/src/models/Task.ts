import mongoose, { Schema, Types } from "mongoose";

export interface ITask {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: "pending" | "in progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdBy?: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: Date,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
