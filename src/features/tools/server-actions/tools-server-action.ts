"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function editTool(prev: unknown, formData: FormData): Promise<ServerActionResponse> {

  const id = formData.get("id") as string

  const name = formData.get("name") as string
  const order = parseInt(formData.get("order") as string)
  const icon = formData.get("icon") as string

  if (!id) return {
    ok: false,
    message: 'Invalid Data'
  }

  try {
    await prisma.tool.update({
      where: {
        id: id
      },
      data: {
        name, order, icon
      }
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
  const name = formData.get("name") as string;
  const order = parseInt(formData.get("order") as string);
  const icon = formData.get("icon") as string;

  try {
    await prisma.tool.create({
      data: {
        name,
        order,
        icon
      }
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
    message: "Tool added"
  };
}