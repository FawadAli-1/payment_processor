import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
        <body className="font-sans antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
