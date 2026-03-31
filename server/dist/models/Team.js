import mongoose, { Schema } from "mongoose";
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    admins: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    active: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model("Team", teamSchema);
