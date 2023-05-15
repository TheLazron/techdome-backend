import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createBlogSchema,
  updateBlogQuerySchema,
  updateBlogSchema,
} from "../schemas/blogSchemas.js";
import { z } from "zod";
import _ from "lodash";
const prisma = new PrismaClient();

const createBlog = async (req: Request, res: Response) => {
  console.log(req.body.title);

  try {
    const { title, description, content } = createBlogSchema.parse(req.body);
    const newBlog = await prisma.blog.create({
      data: {
        title: "First Blog",
        description: "This is the first blog",
        content: "First Blog Content. What to talk about?",
        tags: ["First blog", "content"],
        userId: "1",
      },
    });
    res.json({ blog: newBlog });
  } catch (error) {
    if (error instanceof z.ZodError) {
      //   console.log("zodError", error);
      res.json({ error: error.issues });
      return;
    }
    console.log("error", error);
    res.json({ error: "Error while creating blog" });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  const { title, description, content, tags } = updateBlogSchema.parse(
    req.body
  );
  const { id } = updateBlogQuerySchema.parse(req.params);
  const updatedData = _.pick(req.body, [
    "title",
    "description",
    "content",
    "tags",
  ]);
  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
      },
    });
    res.json({ updatedBlog: updatedBlog });
  } catch (error) {
    if (error instanceof z.ZodError) {
      //   console.log("zodError", error);
      res.json({ error: error.issues });
      return;
    }
    console.log("error", error);
    res.json({ error: "Error while creating blog" });
  }
};

const deleteBlog = (req: Request, res: Response) => {};

const getBlog = (req: Request, res: Response) => {};

export { createBlog, updateBlog, deleteBlog, getBlog };
