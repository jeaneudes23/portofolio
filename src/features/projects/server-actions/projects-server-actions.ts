"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { projectSchema } from "../schema/project-schema";

export async function editProject(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get("id") as string

  const rawFormData = {
    name: formData.get("name") as string,
    image: formData.get("image") as string,
    order: formData.get("order") as string,
    url: formData.get("url") as string,
    summary: formData.get("summary") as string,
    categoryId: formData.get("categoryId") as string
  }

  const formattedData = { ...rawFormData, order: parseInt(rawFormData.order) }

  const validated = projectSchema.safeParse(formattedData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormData
    }
  }

  try {
    await prisma.project.update({
      where: { id },
      data: validated.data
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
  const rawFormData = {
    name: formData.get("name") as string,
    image: formData.get("image") as string,
    order: formData.get("order") as string,
    url: formData.get("url") as string,
    summary: formData.get("summary") as string,
    categoryId: formData.get("categoryId") as string
  }
  const formattedData = { ...rawFormData, order: parseInt(rawFormData.order) }

  const validated = projectSchema.safeParse(formattedData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormData
    }
  }

  try {
    await prisma.project.create({
      data: validated.data
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