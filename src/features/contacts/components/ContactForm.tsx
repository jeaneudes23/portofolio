"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import React, { useActionState } from "react";
import { sendMail } from "../server-actions/send-mail";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { FormFieldError } from "@/components/FormFieldError";

export const ContactForm = () => {
  const [state, action] = useActionState(sendMail, {});

  useServerActionToast({ state });

  return (
    <form action={action} className="space-y-6">
      <div className="grid items-start gap-x-4 text-sm sm:grid-cols-2 md:grid-cols-2">
        <div className="grid">
          <Label htmlFor="name" className="bg-background ml-2 w-fit translate-y-1/2 p-1 font-medium tracking-tight">
            Name
          </Label>
          <input defaultValue={state.prevs?.name} className="bg-background focus-within:border-primary w-full rounded-md border-2 p-3 transition-colors outline-none" type="text" name="name" id="name" />
          <FormFieldError error={state.errors?.name} />
        </div>
        <div className="grid">
          <Label htmlFor="email" className="bg-background ml-2 w-fit translate-y-1/2 p-1 font-medium tracking-tight">
            Email
          </Label>
          <input defaultValue={state.prevs?.email} className="bg-background focus-within:border-primary w-full rounded-md border-2 p-3 transition-colors outline-none" type="text" name="email" id="email" />
          <FormFieldError error={state.errors?.email} />
        </div>
        <div className="col-span-full grid">
          <Label htmlFor="message" className="bg-background ml-2 w-fit translate-y-1/2 p-1 font-medium tracking-tight">
            Message
          </Label>
          <textarea defaultValue={state.prevs?.message} rows={4} className="bg-background focus-within:border-primary w-full rounded-md border-2 p-3 transition-colors outline-none" name="message" id="message" />
          <FormFieldError error={state.errors?.message} />
        </div>
      </div>
      <div className="flex justify-center">
        <SubmitButton size={"custom"} className="group px-6 py-3 text-base">
          <span className="h-6 overflow-hidden">
            <span className="grid transition-all duration-300 ease-out group-hover:-translate-y-6">
              <span>Send Message</span>
              <span aria-hidden>Send Message</span>
            </span>
          </span>
          <Mail className="size-5" />
        </SubmitButton>
      </div>
    </form>
  );
};
