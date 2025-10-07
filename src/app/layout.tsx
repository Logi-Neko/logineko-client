import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { QueryClient } from "@tanstack/react-query";
import AppProvider from "@/components/app-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogiNeko - Learn with a Cat Neko",
  description:
    "Fun, safe, and educational mobile app where children learn with their adorable cat companion Neko. Interactive stories, games, and activities designed for ages 3-8.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AppProvider>
            <Header />
            {/* <TokenCleanup /> */}
            {children}
          </AppProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
