"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { metadataSchema } from "../schema/metadata-schema";

export async function editMetadata(_prev: unknown, formData: FormData): Promise<ServerActionResponse> {

  const id = formData.get("id") as string

  const rawFormData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    keywords: formData.get("keywords") as string,
    image: formData.get("image") as string,
  }

  const formattedData = { ...rawFormData, keywords: rawFormData.keywords.split(',').map(tag => tag.trim()) }

  const validated = metadataSchema.safeParse(formattedData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormData
    }
  }

  try {
    await prisma.metadata.update({
      where: { id },
      data: validated.data
    })
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'DB Error'
    }
  }

  revalidatePath('/')
  return {
    ok: true,
    message: 'Haahah'
  }

}