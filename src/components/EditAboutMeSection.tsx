import React from "react";
import { EditContent } from "../features/content/components/EditContent";

interface Props {
  about_me_title: string;
  about_me_description: string;
}

export const EditAboutMeSection = ({ about_me_title, about_me_description }: Props) => {
  return (
    <div>
      <EditContent field="about_me_title" className="text-header-section mb-4">
        {about_me_title}
      </EditContent>
      <EditContent className="text-muted-foreground leading-7 tracking-wide" field="about_me_description">
        {about_me_description}
      </EditContent>
      <hr className="text-muted-foreground mt-12" />
    </div>
  );
};
