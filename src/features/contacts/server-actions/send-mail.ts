"use server"

import { ServerActionResponse } from "@/lib/types";
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY)
export async function sendMail(prev: unknown, formData: FormData): Promise<ServerActionResponse> {
  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const message = formData.get("message") as string
  const { data, error } = await resend.emails.send({
    from: 'Portofolio <onboarding@resend.dev>',
    to: process.env.RESEND_EMAIL!,
    replyTo: email,
    subject: `Message from ${name}`,
    text: message
  })

  if (error) {
    return {
      ok: false,
      message: error.message
    }
  }

  return {
    ok: true,
    message: `Message sent ${data?.id}`,
  }
}