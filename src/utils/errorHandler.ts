import { Response } from "express";
import { ZodError, z } from "zod";

const errorResponseHandler = (
  res: Response,
  error?: Error | z.ZodError,
  message?: String
) => {
  console.log(error);

  if (error instanceof z.ZodError) {
    res.json({ error: error.issues });
    return;
  }

  res.json({ error: message });
  return;
};

export default errorResponseHandler;
