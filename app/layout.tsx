import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./style-component.css";
import "./style-menu.css";
import Menu from "./components/Menu";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
