import { Request } from "express";
import type { Response } from "../types/reponseTypes.js";
import { Blog, PrismaClient } from "@prisma/client";
import {
  createBlogSchema,
  updateBlogSchema,
  blogQuerySchema,
} from "../schemas/blogSchemas.js";
import { z } from "zod";
import _ from "lodash";
import errorResponseHandler from "../utils/errorHandler.js";
import {
  blogResponse,
  customBlogResponse,
  customResponse,
} from "../types/reponseTypes.js";
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
    return res.json({ error: null, data: newBlog });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while creating blog");
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
    return res.json({ error: null, data: updatedBlog });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while updating blog");
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
    return res.json({ error: null, data: deletedBlog });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while deleting blog");
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
    return res.json({ error: null, data: returnedBlog });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving blog");
  }
};

const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const { id } = blogQuerySchema.parse(req.params);
    const fetchedBlogs = await prisma.blog.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdOn: true,
        tags: true,
        userId: true,
        content: false,
        user: false,
      },
    });
    return res.json({ error: null, data: fetchedBlogs as Blog[] });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving user's blog");
  }
};

const getMyBlogs = async (req: Request, res: Response) => {
  try {
    const userId = res.userId;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const blogsPerPage = parseInt(req.query.blogsPerPage as string) || 4;

    const offset = (pageNumber - 1) * blogsPerPage;

    const userBlogs = await prisma.blog.findMany({
      where: {
        userId: userId,
      },
      skip: offset,
      take: blogsPerPage,
    });
    res.json({ error: null, data: userBlogs });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving blogs");
  }
};

const gethomePageBlogs = async (req: Request, res: Response) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const blogsPerPage = parseInt(req.query.blogsPerPage as string) || 4;

    const offset = (pageNumber - 1) * blogsPerPage;

    const blogs = await prisma.blog.findMany({
      skip: offset,
      take: blogsPerPage,
    });

    return res.json({ error: null, data: blogs });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving blogs");
  }
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getUserBlogs,
  gethomePageBlogs,
  getMyBlogs,
};
