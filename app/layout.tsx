import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gouresh Vernekar - Software Developer & UI/UX Designer",
  description: "Portfolio of Gouresh Vernekar - Software Developer and UI/UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

