import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user-controller.js";
import isAuthenticated from "../middleware/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// Apply isAuthenticated middleware to the /update-profile route
router.post("/update-profile", isAuthenticated, updateProfile);

export default router;