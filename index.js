import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()
const app = express();
const connect = () => {
    mongoose.connect(process.env.MONGO_DB_API_KEY).then(() => {
        console.log("Connected to MongoDB!")
    }).catch(err => {
        throw err;
    })
}

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)

// Creating middleware for error handling in a express server
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong, please try again!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8800, () => {
    connect();
    console.log("Server is listening at 8800");
})