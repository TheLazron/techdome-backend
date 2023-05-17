import type { Request } from "express";
import { PrismaClient } from "@prisma/client";

import {
  updateUserRequestSchema,
  userQuerySchema,
} from "../schemas/userSchema.js";
import { Response } from "../types/reponseTypes.js";
import _ from "lodash";
import errorResponseHandler from "../utils/errorHandler.js";

const prisma = new PrismaClient();

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = res.userId;
    const { name } = updateUserRequestSchema.parse(req.body);
    const updatedData = _.pick(req.body, ["name", "profileUrl"]);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updatedData,
      },
    });
    return res.json({ error: null, data: updatedUser });
  } catch (error: any) {
    console.log(error);
    errorResponseHandler(res, error, "Error while fetching User Data");
  }
};

const getUser = async (req: Request, res: Response) => {
  console.log("req for", req.params.id);

  try {
    console.log("triggered");

    const { id } = userQuerySchema.parse(req.params);

    console.log(id);

    const userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileUrl: true,
        password: false,
        blogs: {
          select: {
            id: true,
            title: true,
            description: true,
            createdOn: true,
            tags: true,
          },
        },
      },
    });
    const blogCount = userDetails?.blogs.length ?? 0;
    return res.json({ error: null, data: { ...userDetails, blogCount } });
  } catch (error: any) {
    console.log(error);
    errorResponseHandler(res, error, "Error while fetching User Data");
  }
};

const getPaginatedUsers = async (req: Request, res: Response) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const blogsPerPage = parseInt(req.query.blogsPerPage as string) || 4;
    const offset = (pageNumber - 1) * blogsPerPage;

    const users = await prisma.user.findMany({
      skip: offset,
      take: blogsPerPage,
      select: {
        name: true,
        profileUrl: true,
        id: true,
        email: true,
        blogs: {
          select: {
            id: true,
          },
        },
      },
    });

    return res.json({ error: null, data: users });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving blogs");
  }
};

export { updateUser, getUser, getPaginatedUsers };
