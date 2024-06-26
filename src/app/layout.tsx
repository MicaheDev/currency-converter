import type { Metadata } from "next";
import "@/styles/globals.css";
import "remixicon/fonts/remixicon.css";
import Head from "next/head";

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
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />{" "}
      </Head>
      <body>{children}</body>
    </html>
  );
}
