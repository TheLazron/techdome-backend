import express, { Router } from "express";

const userRouter: Router = express.Router();

userRouter.post("/update-user");
userRouter.post("/get-user");

export default userRouter;
