import React from "react";
import { ContactForm } from "./ContactForm";
import { EditContent } from "@/features/content/components/EditContent";

interface Props {
  contact_me_title: string;
  contact_me_description: string;
}

export const EditContactMeSection = ({ contact_me_title, contact_me_description }: Props) => {
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
          <EditContent field="contact_me_title" className="text-header-section text-center">
            {contact_me_title}
          </EditContent>
          <EditContent field="contact_me_description" className="text-muted-foreground mx-auto max-w-md text-center text-balance">
            {contact_me_description}
          </EditContent>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};
