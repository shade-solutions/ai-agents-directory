import Link from 'next/link';
import { Bot, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Agents</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover and explore the best AI agents and tools for your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-muted-foreground hover:text-primary transition-colors">
                  All Agents
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/ai-agent-builders" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Agent Builders
                </Link>
              </li>
              <li>
                <Link href="/categories/coding" className="text-muted-foreground hover:text-primary transition-colors">
                  Coding
                </Link>
              </li>
              <li>
                <Link href="/categories/productivity" className="text-muted-foreground hover:text-primary transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/categories/customer-service" className="text-muted-foreground hover:text-primary transition-colors">
                  Customer Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} AI Agents Directory. All rights reserved.</p>
          <p className="mt-2">
            Data sourced from{' '}
            <a 
              href="https://aiagentslist.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              aiagentslist.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
