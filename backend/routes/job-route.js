import express from "express";

import isAuthenticated from "../middleware/authentication.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job-controller.js";


const router = express.Router();

router.post("/post",isAuthenticated, postJob);
router.post("/get-all-jobs",isAuthenticated, getAllJobs);
router.post("/get-admin-jobs",isAuthenticated, getAdminJobs);
router.post("/get/:id",isAuthenticated, getJobById);



export default router;