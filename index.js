import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const app = express();
const connect = () => {
    mongoose.connect(process.env.MONGO_DB_API_KEY).then(() => {
        console.log("Connected to MongoDB!")
    }).catch(err => {
        throw err;
    })
}

app.listen(8800, () => {
    connect();
    console.log("Server is listening at 8800");
})