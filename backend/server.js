import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user-route.js";
import companyRoute from "./routes/company-route.js"
import jobRoute from "./routes/job-route.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Test route
app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});