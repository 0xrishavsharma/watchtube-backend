import express from "express";
import { createVideo, updateVideo, getVideo, deleteVideo } from "../controllers/video.js";

const router = express.Router();

router.post("/", verifyToken, createVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo) // verify token is created when you are logged in but logging in to find a video is not required
router.put("/view/:id", verifyToken, deleteVideo)
router.get("/random", verifyToken, deleteVideo)
router.get("/subscriptions", verifyToken, deleteVideo)

export default router;  