import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export const revalidate = 0;

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
