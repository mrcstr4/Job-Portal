import express from "express";

import isAuthenticated from "../middleware/authentication.js";
import { getCompany, getCompanyByID, registerCompany, updateCompany } from "../controllers/company-controller.js";

const router = express.Router();

router.post("/register",isAuthenticated, registerCompany);
router.get("/get-companies", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyByID);
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;