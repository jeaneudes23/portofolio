import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin",
};
export default function AdminLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
