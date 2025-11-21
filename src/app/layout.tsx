import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import AppProvider from "@/components/app-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  keywords: ["LogiNeko", "học cùng Neko","ứng dụng giáo dục","trò chơi giáo dục","app học tập cho bé","Neko","giáo dục sớm","học qua trò chơi","ứng dụng học tập cho trẻ em"],
  authors: [{ name: "LogiNeko Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ff8c00" />
        <meta name="msvalidate.01" content="5C434BDB3AAA4A81912FC982F28D3E2A" />
        <meta
          name="google-site-verification"
          content="cWRXnWTkAuFWfRLRmJvnQeb7RqDdgfYxsLI4Juc5eBA"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalApplication",
              name: "LogiNeko",
              url: "https://www.logineko.edu.vn",
              description:
                "An educational app where kids learn with their cat companion Neko through interactive stories and games.",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Android, iOS, Web",
              offers: {
                "@type": "Offer",
                price: "0.00",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1423",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
