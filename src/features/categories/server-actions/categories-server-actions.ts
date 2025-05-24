"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCategory(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const name = formData.get('name') as string

  try {
    await prisma.category.create({
      data: { name }
    })
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB Error'
    }
  }

  revalidatePath('/')
  return {
    ok: true,
    message: "Category added"
  }
}


export async function editCategory(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  try {
    await prisma.category.update({
      where: { id },
      data: { name }
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB Error'
    };
  }

  revalidatePath('/')
  return {
    ok: true,
    message: "Category updated"
  };
}

export async function deleteCategory(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get('id') as string;

  try {
    await prisma.category.delete({
      where: { id }
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB Error'
    };
  }

  revalidatePath('/')
  return {
    ok: true,
    message: "Category deleted"
  };
}