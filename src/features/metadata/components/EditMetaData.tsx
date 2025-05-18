import prisma from "@/lib/prisma";
import React from "react";
import { EditMetadataDialog } from "./EditMetadataDialog";

export const EditMetaData = async () => {
  const metadata = await prisma.metadata.findFirst();
  if (!metadata) return "No Data";
  return <EditMetadataDialog metadata={metadata} />;
};
