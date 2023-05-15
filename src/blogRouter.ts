import express, { Router } from "express";

const blogRouter: Router = express.Router();

blogRouter.get("/getBlog/:id");
blogRouter.post("/create-blog");
blogRouter.post("/update-blog");
blogRouter.delete("/delete-blog");

export default blogRouter;
