import { z } from "zod";

export const emailSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(5).email(),
  message: z.string().min(5),
})