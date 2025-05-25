import { z } from "zod";

export const toolSchema = z.object({
  name: z.string().min(3),
  order: z.number().min(1),
  icon: z.string().url().min(5),
});
