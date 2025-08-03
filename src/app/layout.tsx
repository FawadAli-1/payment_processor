import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayFlow - Modern Payment Platform for Pakistan",
  description: "Unify PayFast, Safepay, Easypaisa, and JazzCash into one simple API. Build payment experiences that work seamlessly across Pakistan.",
  keywords: ["payments", "Pakistan", "PayFast", "Safepay", "Easypaisa", "JazzCash", "API", "checkout"],
  authors: [{ name: "PayFlow Team" }],
  openGraph: {
    title: "PayFlow - Modern Payment Platform for Pakistan",
    description: "Unify PayFast, Safepay, Easypaisa, and JazzCash into one simple API.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
