import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import blogRouter from "./routers/blogRouter.js";
import authRouter from "./routers/authRouter.js";
import { parseJwt, verifyJWT } from "./utils/jwtUtils.js";
import type { customResponse } from "./types/reponseTypes.js";
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

//VeriyJWT Middleware
const verifyToken = (req: Request, res: customResponse, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("provide token");
    return res
      .status(401)
      .json({ message: "Provide with a valid authentication token" });
  }

  verifyJWT(token, res, next);
};
app.use("/", verifyToken);
app.use(blogRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3300");
  console.log(process.env.PORT);
});
