import express, { Router } from "express";
import { logUserIn, signUserUp } from "../controllers/authController.js";

const authRouter: Router = express.Router();

authRouter.post("/signUp", signUserUp);
authRouter.post("/login", logUserIn);

export default authRouter;
