"use client";

import React from "react";
import { SubmitButton } from "./SubmitButton";
import { Mail } from "lucide-react";

interface Props {
  contact_me_description: string;
}

export const ContactMeSection = ({ contact_me_description }: Props) => {
  return (
    <section className="my-section px-padding relative container">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/wrapped.svg')",
          backgroundSize: "contain",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="relative mx-auto max-w-2xl space-y-4">
        <div className="space-y-4">
          <h2 className="text-header-section text-center">Contact Me</h2>
          <p className="text-subtle mx-auto max-w-md text-center text-balance">{contact_me_description}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export const ContactForm = () => {
  return (
    <form action="" className="space-y-6">
      <div className="grid items-start gap-x-4 text-sm sm:grid-cols-2 md:grid-cols-2">
        <div className="grid">
          <label htmlFor="name" className="text-subtle bg-background ml-2 w-fit translate-y-1/2 p-1 font-medium tracking-tight">
            Name
          </label>
          <input className="bg-background focus-within:border-primary border-subtle/50 w-full rounded-md border-2 p-3 transition-colors outline-none" type="text" name="name" id="email" />
        </div>
        <div className="grid">
          <label className="text-subtle bg-background ml-2 w-fit translate-y-1/2 p-1 font-medium tracking-tight" htmlFor="name">
            Email
          </label>
          <input className="bg-background focus-within:border-primary border-subtle/50 w-full rounded-md border-2 p-3 transition-colors outline-none" type="text" name="email" id="email" />
        </div>
        <div className="col-span-full grid">
          <label className="text-subtle bg-background ml-2 w-fit translate-y-1/2 p-1 font-medium tracking-tight" htmlFor="name">
            Message
          </label>
          <textarea rows={4} className="bg-background focus-within:border-primary border-subtle/50 w-full rounded-md border-2 p-3 transition-colors outline-none" name="message" id="message"></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <SubmitButton className="group bg-primary text-primary-foreground inline-flex items-center gap-2 justify-self-center rounded-md px-6 py-3 font-medium tracking-wide">
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
