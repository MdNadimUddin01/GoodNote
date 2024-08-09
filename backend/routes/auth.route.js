import express from "express"
import { login, signOut, signUp } from "../controller/auth.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup" , signUp)
router.post("/login" , login)
router.get("/signout" ,verifyUser, signOut);

export default router;