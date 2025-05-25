import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(5),
  categoryId: z.string().min(5),
  order: z.number().min(1),
  url: z.string().url().min(5),
  image: z.string().url().min(5),
  summary: z.string().min(5),
})