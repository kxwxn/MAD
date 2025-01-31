import type { Metadata } from "next";
import "@/styles/globals.css";
import TopNav from "@/components/TopNav";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const helvetica = localFont({ src: "../fonts/helvmb__0.ttf" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={helvetica.className}>
      <body>
        <TopNav />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
