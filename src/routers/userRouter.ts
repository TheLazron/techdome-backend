import express, { Router } from "express";
import {
  getPaginatedUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter: Router = express.Router();

userRouter.post("/update-user/", updateUser);
userRouter.get("/get-user/:id", getUser);
userRouter.get("/get-user-list/", getPaginatedUsers);

export default userRouter;
