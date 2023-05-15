import express, { Router } from "express";
import { createBlog, updateBlog } from "./controllers/blogController.js";

const blogRouter: Router = express.Router();

blogRouter.get("/get-blog/:id");
blogRouter.post("/create-blog", createBlog);
blogRouter.post("/update-blog/:id", updateBlog);
blogRouter.delete("/delete-blog");

export default blogRouter;
