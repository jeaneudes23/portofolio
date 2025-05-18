"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function editMetadata(_prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const keywords = formData.get("keywords") as string

  const metadata = await prisma.metadata.findFirst()

  if (!metadata) return {
    ok: false,
    message: 'Operation failed'
  }

  try {
    await prisma.metadata.update({
      where: {
        id: metadata.id
      },
      data: {
        title, description, keywords: keywords.split(',').map(keyword => keyword.trim())
      }
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/')

  return {
    ok: true,
    message: 'Haahah'
  }

}