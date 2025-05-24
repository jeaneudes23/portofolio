"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

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
    return {
      ok: false,
      message: 'DB error',
    }
  }
  return {
    ok: true,
    message: "Tool edited successfully"
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
    return {
      ok: false,
      message: "DB error"
    };
  }

  return {
    ok: true,
    message: "Tool deleted successfully"
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
    return {
      ok: false,
      message: "DB error"
    };
  }

  return {
    ok: true,
    message: "Tool created successfully"
  };
}