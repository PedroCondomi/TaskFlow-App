import jwt from "jsonwebtoken";
import User from "../models/User.js";
const verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token)
            return res.status(401).json({ message: "Unauthorized, token required" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = {
            _id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
        };
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token failed or invalid" });
    }
};
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "User not autenticated" });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Requires role: ${role}` });
        }
        next();
    };
};
export { verifyToken, requireRole };
