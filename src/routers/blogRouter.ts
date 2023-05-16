import express, { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getUserBlogs,
  gethomePageBlogs,
  updateBlog,
} from "../controllers/blogController.js";

const blogRouter: Router = express.Router();

blogRouter.get("/get-blog/:id", getBlog);
blogRouter.post("/create-blog", createBlog);
blogRouter.post("/update-blog/:id", updateBlog);
blogRouter.delete("/delete-blog/:id", deleteBlog);
blogRouter.get("/author-blogs/:id", getUserBlogs);
blogRouter.get("/getPaginatedBlogs", gethomePageBlogs);
export default blogRouter;
