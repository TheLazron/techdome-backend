import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createBlogSchema,
  updateBlogSchema,
  blogQuerySchema,
} from "../schemas/blogSchemas.js";
import { z } from "zod";
import _ from "lodash";
const prisma = new PrismaClient();

const createBlog = async (req: Request, res: Response) => {
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
    res.json({ data: newBlog });
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
  try {
    const { title, description, content, tags } = updateBlogSchema.parse(
      req.body
    );
    const { id } = blogQuerySchema.parse(req.params);
    const updatedData = _.pick(req.body, [
      "title",
      "description",
      "content",
      "tags",
    ]);
    const updatedBlog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
      },
    });
    res.json({ data: updatedBlog });
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

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = blogQuerySchema.parse(req.params);
    const deletedBlog = await prisma.blog.delete({
      where: {
        id,
      },
    });
    res.json({ message: "deletion successful", data: deletedBlog });
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

const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = blogQuerySchema.parse(req.params);
    const returnedBlog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    res.json({ data: returnedBlog });
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

export { createBlog, updateBlog, deleteBlog, getBlog };
