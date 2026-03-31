import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model("Task", taskSchema);
