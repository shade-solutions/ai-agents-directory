import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Agents Directory - Discover the Best AI Tools & Automation Solutions",
  description: "Explore and discover the best AI agents and tools for productivity, coding, customer service, marketing automation, content creation, and more. Find the perfect AI solution for your business needs.",
  keywords: "AI agents, AI tools, artificial intelligence, machine learning tools, productivity apps, automation software, chatbots, virtual assistants, AI-powered tools, business automation, content creation AI, coding assistants, AI marketing tools, customer service bots, AI analytics, workflow automation, intelligent agents, AI platforms, automated solutions, smart tools, AI applications, digital assistants, AI software, machine learning platforms, AI for business, automated workflows, AI productivity tools, intelligent automation, AI-driven solutions, robotic process automation, conversational AI, AI writing tools, AI image generators, AI video tools, AI data analysis, predictive analytics, natural language processing, computer vision tools, AI development tools, no-code AI, low-code automation, AI integrations, enterprise AI, AI SaaS, AI marketplace",
  authors: [{ name: "AI Agents Directory" }],
  creator: "AI Agents Directory",
  publisher: "AI Agents Directory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/feed/rss.xml', title: 'AI Agents Directory RSS Feed' }],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI Agents Directory - Discover the Best AI Tools & Automation Solutions",
    description: "Explore and discover the best AI agents and tools for productivity, coding, customer service, marketing automation, content creation, and more. Find AI solutions that transform your workflow.",
    siteName: "AI Agents Directory",
    images: [
      {
        url: '/api/og?title=AI%20Agents%20Directory&description=Discover%20the%20Best%20AI%20Tools%20%26%20Automation%20Solutions',
        width: 1200,
        height: 630,
        alt: 'AI Agents Directory - Best AI Tools and Automation Solutions',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents Directory - Discover the Best AI Tools & Automation Solutions",
    description: "Explore and discover the best AI agents and tools for productivity, coding, customer service, marketing automation, content creation, and more.",
    creator: "@aiagentsdirectory",
    images: ['/api/og?title=AI%20Agents%20Directory&description=Discover%20the%20Best%20AI%20Tools%20%26%20Automation%20Solutions'],
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
  verification: {
    // Add verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Agents Directory',
    description: 'Discover the perfect AI agent for your needs. Browse our curated directory of AI tools and agents.',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/agents?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Agents Directory',
      url: baseUrl,
      logo: `${baseUrl}/icon-512.svg`,
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="AI Agents Directory RSS Feed" href="/feed/rss.xml" />
        <link rel="icon" type="image/svg+xml" href="/icon-192.svg" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
