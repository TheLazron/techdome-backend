import { z } from "zod";

const updateUserRequestSchema = z.object({
  name: z.string().max(40),
});

const userQuerySchema = z.object({
  id: z.string().uuid(),
});

export { userQuerySchema, updateUserRequestSchema };
