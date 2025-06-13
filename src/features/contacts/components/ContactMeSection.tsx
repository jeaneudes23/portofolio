"use client";

import React from "react";
import { ContactForm } from "./ContactForm";

interface Props {
  contact_me_title: string;
  contact_me_description: string;
}

export const ContactMeSection = ({ contact_me_title, contact_me_description }: Props) => {
  return (
    <section className="my-section px-padding relative container">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/wrapped.svg')",
          backgroundSize: "contain",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="relative mx-auto max-w-2xl space-y-4">
        <div className="space-y-4">
          <h2 className="text-header-section text-center">{contact_me_title}</h2>
          <p className="text-muted-foreground mx-auto max-w-md text-center text-balance">{contact_me_description}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};
