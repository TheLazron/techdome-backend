import express, { Router } from "express";
import { gethomePageBlogs } from "../controllers/blogController.js";
import { getPaginatedUsers } from "../controllers/userController.js";

const publicRouter: Router = express.Router();

publicRouter.get("/get-paginated-blogs", gethomePageBlogs);
publicRouter.get("/get-user-list", getPaginatedUsers);

export default publicRouter;
