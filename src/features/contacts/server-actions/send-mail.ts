"use server"

import { ServerActionResponse } from "@/lib/types";
import { Resend } from 'resend';
import { emailSchema } from "../schema/email-schema";


const resend = new Resend(process.env.RESEND_API_KEY)
export async function sendMail(prev: unknown, formData: FormData): Promise<ServerActionResponse> {

  const rawFormData = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    message: formData.get("message") as string,
  }

  const validated = emailSchema.safeParse(rawFormData)

  if (validated.error) {
    return {
      ok: false,
      message: 'Validation error',
      errors: validated.error.flatten().fieldErrors,
      prevs: rawFormData
    }
  }

  const { data, error } = await resend.emails.send({
    from: 'Portofolio <onboarding@resend.dev>',
    to: process.env.RESEND_EMAIL!,
    replyTo: validated.data.email,
    subject: `Message from ${validated.data.name}`,
    text: validated.data.message
  })


  if (error) {
    return {
      ok: false,
      message: error.message,
      prevs: rawFormData
    }
  }

  console.log(data?.id)

  return {
    ok: true,
    message: `Message sent`,
  }
}