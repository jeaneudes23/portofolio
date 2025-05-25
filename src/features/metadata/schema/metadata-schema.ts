import { z } from "zod";

export const metadataSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  keywords: z.array(z.string()).min(1),
  image: z.string().min(5).url()
})