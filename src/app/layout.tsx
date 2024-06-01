import type { Metadata } from "next";
import "@/styles/globals.css";
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "a web app to convert currencies",
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
