import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atrak Parfumeria",
    template: "%s | Atrak Parfumeria"
  },
  description:
    "A modern luxury perfume store for men's perfumes, women's perfumes, unisex fragrances, bakhoor, air fresheners, and gift sets."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
