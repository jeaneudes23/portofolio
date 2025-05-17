import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";

const fontSans = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | JeanEudes',
    default: 'Welcome',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} antialiased font-sans text-foreground bg-background transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
