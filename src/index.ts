import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import blogRouter from "./routers/blogRouter.js";
import authRouter from "./routers/authRouter.js";
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(blogRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3300");
  console.log(process.env.PORT);
});
