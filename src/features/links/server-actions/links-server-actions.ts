"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";

export async function createLink(_prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;

  try {
    await prisma.link.create({
      data: { name, url }
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB Error'
    };
  }
  return {
    ok: true,
    message: 'Link added',
  };
}

export async function editLink(_prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const url = formData.get("url") as string;

  try {
    await prisma.link.update({
      where: { id },
      data: { name, url }
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB Error'
    };
  }
  return {
    ok: true,
    message: 'Link updated'
  };
}

export async function deleteLink(_prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const id = formData.get("id") as string;

  try {
    await prisma.link.delete({
      where: { id }
    });
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'DB Error'
    };
  }
  return {
    ok: true,
    message: 'Link removed'
  };
}