import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));











app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    connectDB()
})

app.use("/home",(req,res) =>{
    return res.status(200).json({
        message:"all goods back-end",
        succes:true
    })
})

