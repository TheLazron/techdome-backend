import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import errorResponseHandler from "../utils/errorHandler.js";
import { comparePasswords, encryptPassowrd } from "../utils/bcryptUtils.js";
import { loginSchema, signUpSchema } from "../schemas/authSchema.js";
import { z } from "zod";
import { generateAccessToken } from "../utils/jwtUtils.js";
import type { loginResponse } from "../types/reponseTypes.js";

const prisma = new PrismaClient();

const signUserUp = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = signUpSchema.parse(req.body);

    const encryptedPass = await encryptPassowrd(password);
    const createdUser = await prisma.user.create({
      data: {
        email,
        name: username,
        password: encryptedPass,
      },
    });
    return res.redirect("/login");
  } catch (error: any) {
    errorResponseHandler(res, error, "Trouble Signing User In");
  }
};

const logUserIn = async (req: Request, res: Response<loginResponse>) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const loggedUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!loggedUser) {
      return res.json({
        error: "User Not Found",
        user: { found: false, token: null },
      });
    }

    const isPasswordMatch = await comparePasswords(
      password,
      loggedUser?.password
    );

    if (!isPasswordMatch) {
      return res.json({
        error: "Invalid password",
        user: { found: false, token: null },
      });
    }

    const token = generateAccessToken(loggedUser?.email, loggedUser?.id);
    res.json({ error: null, user: { found: true, token: token } });
  } catch (error: any) {
    errorResponseHandler(res, error, "Trouble Logging User In");
  }
};

export { signUserUp, logUserIn };
