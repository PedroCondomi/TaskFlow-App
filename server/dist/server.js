import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8080;
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port:${PORT}`);
    });
});
