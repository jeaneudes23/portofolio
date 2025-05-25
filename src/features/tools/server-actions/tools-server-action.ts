"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { toolSchema } from "../schema/tool-schema";

export async function editTool(prev: unknown, formData: FormData): Promise<ServerActionResponse> {

  const id = formData.get("id") as string

  const rawFormdata = {
    name: formData.get('name') as string,
    order: formData.get('order') as string,
    icon: formData.get('icon') as string
  }
  const formattedData = { ...rawFormdata, order: parseInt(rawFormdata.order) }

  const validated = toolSchema.safeParse(formattedData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormdata
    }
  }

  if (!id) return {
    ok: false,
    message: 'Invalid Data'
  }

  try {
    await prisma.tool.update({
      where: {
        id: id
      },
      data: validated.data
    })
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB error',
    }
  }

  revalidatePath('/')
  return {
    ok: true,
    message: "Tool updated"
  }
}

export async function deleteTool(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get("id") as string;

  if (!id) {
    return {
      ok: false,
      message: "Invalid Data"
    };
  }

  try {
    await prisma.tool.delete({
      where: { id }
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: "DB error"
    };
  }

  revalidatePath('/')
  return {
    ok: true,
    message: "Tool removed"
  };
}

export async function createTool(prev: unknown, formData: FormData): Promise<ServerActionResponse> {

  const rawFormdata = {
    name: formData.get('name') as string,
    order: formData.get('order') as string,
    icon: formData.get('icon') as string
  }
  const formattedData = { ...rawFormdata, order: parseInt(rawFormdata.order) }

  const validated = toolSchema.safeParse(formattedData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormdata
    }
  }

  try {
    await prisma.tool.create({
      data: validated.data
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: "DB error",
      prevs: rawFormdata,
    };
  }

  revalidatePath('/')
  return {
    ok: true,
    message: "Tool added"
  };
}