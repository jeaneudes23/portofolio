import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";

const fontSans = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Jean Eudes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${fontSans.variable} text-foreground bg-background font-sans antialiased transition-colors`}>
          <Navbar />
          {children}
          <Toaster />
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}
