import "./globalsIcon.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../public/assets/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

// Import of text font to apply on body.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investment Salad",
  description: "Investment Salad: a way to better visualize your investments' growth.",
};
//Function applied to all pages. Default style applied on all text in body.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
