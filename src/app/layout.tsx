import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Agents Directory - Discover the Best AI Tools",
  description: "Explore and discover the best AI agents and tools for productivity, coding, customer service, and more. Find the perfect AI solution for your needs.",
  keywords: "AI agents, AI tools, artificial intelligence, productivity, automation, chatbots",
  authors: [{ name: "AI Agents Directory" }],
  creator: "AI Agents Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiagents.directory",
    title: "AI Agents Directory - Discover the Best AI Tools",
    description: "Explore and discover the best AI agents and tools for productivity, coding, customer service, and more.",
    siteName: "AI Agents Directory",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents Directory - Discover the Best AI Tools",
    description: "Explore and discover the best AI agents and tools for productivity, coding, customer service, and more.",
    creator: "@aiagentsdirectory",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
