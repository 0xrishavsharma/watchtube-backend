import express from "express";
import { createVideo, updateVideo, getVideo, deleteVideo, updateViews, getRandomVideos, getTrendingVideos, getSubscriptionVideos, getByTags, getSearchedVideos, likeVideo, dislikeVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo) // verify token is created when you are logged in but logging in to find a video is not required
router.put("/view/:id", updateViews)
router.get("/random", getRandomVideos)
router.get("/trending", getTrendingVideos)
router.get("/subscriptions", verifyToken, getSubscriptionVideos)
router.get("/tags", getByTags)
router.get("/search", getSearchedVideos)
router.put("/like/:videoId", verifyToken, likeVideo)
router.put("/dislike/:videoId", verifyToken, dislikeVideo)

export default router;  