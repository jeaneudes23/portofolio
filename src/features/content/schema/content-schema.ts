import { z } from "zod";

export const contentSchema = z.object({
  field: z.string().min(5),
  value: z.string().min(5)
})