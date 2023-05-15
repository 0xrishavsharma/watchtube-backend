import express from "express";
import { googleAuth, signin, signout, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signout", signout)

// GOOGLE AUTH
router.post("/google", googleAuth)


export default router;  