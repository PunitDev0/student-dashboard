import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthRedirect from "@/hooks/AuthRedirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mojo Communication",
  description: "ERP Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthRedirect />
        {children}
      </body>
    </html>
  );
}
