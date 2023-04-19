import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, update);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/subscribe/:id", verifyToken, subscribe);

// unsubscribe a user
router.put("/unsubscribe/:id", verifyToken, unsubscribe);

// like a video
router.patch("/like/:id", verifyToken, like);

// dislike a video
router.patch("/dislike/:id", verifyToken, dislike);

export default router;  