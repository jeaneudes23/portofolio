"use server"

import prisma from "@/lib/prisma"
import { ServerActionResponse } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { contentSchema } from "../schema/content-schema"

export async function editContent(formData: FormData): Promise<ServerActionResponse> {

  const rawFormData = Object.fromEntries(formData)

  const validated = contentSchema.safeParse(rawFormData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation Error',
      errors: validated.error.flatten().fieldErrors
    }
  }

  try {
    const content = await prisma.content.findFirst()

    if (!content) throw new Error('DB Error')

    await prisma.content.update({
      where: {
        id: content.id
      },
      data: {
        [validated.data.field]: validated.data.value
      }
    })
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB error'
    }
  }

  revalidatePath('/')
  return {
    ok: true,
    message: validated.data.field + ' updated'
  }

}