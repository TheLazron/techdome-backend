import { z } from "zod";

const createBlogSchema = z.object({
  title: z.string().max(100),
  description: z.string().optional(),
  content: z.string().max(2000),
  tags: z.array(z.string()),
});

const updateBlogSchema = z
  .object({
    title: z.string().max(100).optional(),
    description: z.string().optional(),
    content: z.string().max(2000).optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine((data: any) => {
    return Object.keys(data).length > 0;
  }, "At least one of title, description, content, or tags must be present");

const blogQuerySchema = z.object({
  id: z.string().uuid(),
});

export { createBlogSchema, updateBlogSchema, blogQuerySchema };
