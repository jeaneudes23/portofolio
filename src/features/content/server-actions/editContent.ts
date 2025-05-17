"use server"

import prisma from "@/lib/prisma"
import { ServerActionResponse } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function editContent(formData: FormData): Promise<ServerActionResponse> {
  const rawFormData = Object.fromEntries(formData)

  const field = rawFormData.field.toString()
  const value = rawFormData.value.toString()

  const content = await prisma.content.findFirst()

  if (!content) return {
    ok: false,
    message: 'Operation failed'
  }

  try {
    await prisma.content.update({
      where: {
        id: content?.id
      },
      data: {
        [field]: value
      }
    })
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Operation failed'
    }
  }

  revalidatePath('/')
  return {
    ok: true,
    message: field + ' updated'
  }

}