import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookiedParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoues.js";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiedParser());
app.use("/api/users", userRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));
