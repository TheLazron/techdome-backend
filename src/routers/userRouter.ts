import express, { Router } from "express";
import { getUser, updateUser } from "../controllers/userController.js";

const userRouter: Router = express.Router();

userRouter.post("/update-user", updateUser);
userRouter.post("/get-user/:id", getUser);

export default userRouter;
