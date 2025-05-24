import { ManageLinksModal } from "@/features/links/components/ManageLinksModal";
import { EditMetadataModalForm } from "@/features/metadata/components/EditMetadataModalForm";
import { Link, Metadata } from "@prisma/client";
import React from "react";

interface Props {
  metadata: Metadata;
  links: Link[];
}

export const ManageSiteInfo = ({ metadata, links }: Props) => {
  return (
    <footer className="border-muted px-padding border-t py-6 text-sm">
      <div className="container flex flex-wrap items-center justify-center gap-2 sm:justify-between">
        <p className="text-muted-foreground font-medium">© Copyright {new Date().getFullYear()}. All rights reserved.</p>
        <div className="flex items-center justify-center gap-2">
          <EditMetadataModalForm metadata={metadata} />
          <ManageLinksModal links={links} />
        </div>
      </div>
    </footer>
  );
};
