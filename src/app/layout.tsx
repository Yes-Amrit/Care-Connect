import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'; 
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Connect - AI Powered Dental Assistant",
  description: "Get instant dental advice through voice calls with our AI assistant. Available 24/7.",
  icons: {
    icon: '/logo.png',  // Corrected path
    apple: '/logo.png', // Corrected path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#0ea5e9",
            colorBackground: "#f3f4f6",
            colorText: "#111827",
            colorTextSecondary: "#6b7280",
            colorInputBackground: "#f3f4f6",
          },
        }}
      >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
