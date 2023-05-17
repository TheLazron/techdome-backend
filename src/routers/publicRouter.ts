import express, { Router } from "express";
import {
  getBlog,
  getUserBlogs,
  gethomePageBlogs,
} from "../controllers/blogController.js";
import { getPaginatedUsers, getUser } from "../controllers/userController.js";

const publicRouter: Router = express.Router();

publicRouter.get("/get-paginated-blogs", gethomePageBlogs);
publicRouter.get("/get-user-list", getPaginatedUsers);
publicRouter.get("/get-blog/:id", getBlog);
publicRouter.get("/author-blogs/:id", getUserBlogs);
publicRouter.get("/get-user/:id", getUser);

export default publicRouter;
