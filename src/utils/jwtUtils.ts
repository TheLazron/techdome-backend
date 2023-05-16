import jwt from "jsonwebtoken";
const generateAccessToken = (email: String, userId: string): string => {
  return jwt.sign({ email, userId }, "secret", { expiresIn: "1800s" });
};

const parseJwt = (token: any) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export { generateAccessToken, parseJwt };
