"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function editProject(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const image = formData.get("image") as string
  const order = parseInt(formData.get("order") as string)
  const url = formData.get("url") as string
  const summary = formData.get("summary") as string
  const categoryId = formData.get("categoryId") as string

  try {
    await prisma.project.update({
      where: { id },
      data: { name, image, order, url, summary, categoryId }
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
    message: "Project updated"
  }
}

export async function createProject(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const name = formData.get("name") as string
  const image = formData.get("image") as string
  const order = parseInt(formData.get("order") as string)
  const url = formData.get("url") as string
  const summary = formData.get("summary") as string
  const categoryId = formData.get("categoryId") as string

  try {
    await prisma.project.create({
      data: {
        name, image, order, url, summary, categoryId
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
    message: "Project added"
  }
}

export async function deleteProject(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get("id") as string

  try {
    await prisma.project.delete({
      where: { id }
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
    message: "Project removed"
  }
}