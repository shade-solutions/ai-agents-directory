import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All AI Agents & Tools Directory | Browse 500+ AI Solutions",
  description: "Browse our complete directory of AI agents and automation tools. Filter by category, pricing, and features. Find AI solutions for productivity, coding, marketing, customer service, and more.",
  keywords: "AI agents directory, AI tools catalog, artificial intelligence software, automation tools, AI productivity apps, business AI solutions, AI agent marketplace, intelligent automation, AI software directory, machine learning tools",
  openGraph: {
    title: "All AI Agents & Tools Directory | Browse 500+ AI Solutions",
    description: "Browse our complete directory of AI agents and automation tools. Filter by category, pricing, and features.",
    type: "website",
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}