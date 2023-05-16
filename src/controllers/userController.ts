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
  try {
    const { id } = userQuerySchema.parse(req.params);
    const userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
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

export { updateUser, getUser };
