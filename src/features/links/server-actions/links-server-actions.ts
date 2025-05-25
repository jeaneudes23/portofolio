"use server"

import prisma from "@/lib/prisma";
import { ServerActionResponse } from "@/lib/types";
import { linkSchema } from "../schema/link-schema";

export async function createLink(_prev: unknown, formData: FormData): Promise<ServerActionResponse> {

  const rawFormData = {
    name: formData.get("name") as string,
    url: formData.get("url") as string
  }

  const validated = linkSchema.safeParse(rawFormData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormData
    }
  }

  try {
    await prisma.link.create({
      data: validated.data
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

  const rawFormData = {
    name: formData.get("name") as string,
    url: formData.get("url") as string
  }

  const validated = linkSchema.safeParse(rawFormData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormData
    }
  }

  try {
    await prisma.link.update({
      where: { id },
      data: validated.data
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