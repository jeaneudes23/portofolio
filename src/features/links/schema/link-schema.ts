import { z } from "zod";

export const linkSchema = z.object({
  name: z.string().min(3),
  url: z.string().min(5).url()
})