import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: "AI Agents Blog - Expert Insights, Tips & Trends | AI Tools Directory",
  description: "Stay updated with the latest AI agent trends, expert reviews, automation tips, and in-depth guides. Learn how to maximize productivity with AI tools and discover emerging technologies.",
  keywords: "AI blog, AI agent reviews, automation tips, AI trends, machine learning insights, productivity guides, AI tools comparison, automation strategies, AI implementation, business AI, AI tutorials, AI news, artificial intelligence blog, AI best practices, AI productivity tips",
  openGraph: {
    title: "AI Agents Blog - Expert Insights, Tips & Trends",
    description: "Stay updated with the latest AI agent trends, expert reviews, automation tips, and in-depth guides.",
    type: "website",
  },
};

const blogPosts = [
  {
    id: 'best-ai-agents-2025',
    title: '10 Best AI Agents for Business Automation in 2025',
    excerpt: 'Discover the top AI agents that are revolutionizing business automation, from customer service to content creation.',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Reviews',
    tags: ['Business AI', 'Automation', 'Productivity'],
    featured: true
  },
  {
    id: 'ai-productivity-guide',
    title: 'Complete Guide to AI-Powered Productivity: Transform Your Workflow',
    excerpt: 'Learn how to integrate AI agents into your daily workflow for maximum productivity and efficiency.',
    publishDate: '2024-01-12',
    readTime: '12 min read',
    category: 'Guides',
    tags: ['Productivity', 'Workflow', 'AI Tools'],
    featured: true
  },
  {
    id: 'chatbot-vs-ai-agent',
    title: 'Chatbots vs AI Agents: Understanding the Key Differences',
    excerpt: 'Explore the fundamental differences between traditional chatbots and modern AI agents, and when to use each.',
    publishDate: '2024-01-10',
    readTime: '6 min read',
    category: 'Education',
    tags: ['Chatbots', 'AI Agents', 'Technology'],
    featured: false
  },
  {
    id: 'ai-content-creation-tools',
    title: 'Top AI Content Creation Tools for Marketers and Creators',
    excerpt: 'Comprehensive review of the best AI tools for content creation, from writing assistants to image generators.',
    publishDate: '2024-01-08',
    readTime: '10 min read',
    category: 'Reviews',
    tags: ['Content Creation', 'Marketing', 'AI Tools'],
    featured: true
  },
  {
    id: 'implementing-ai-workplace',
    title: 'How to Successfully Implement AI Agents in Your Workplace',
    excerpt: 'Step-by-step guide to introducing AI agents in your organization, including best practices and common pitfalls.',
    publishDate: '2024-01-05',
    readTime: '9 min read',
    category: 'Business',
    tags: ['Implementation', 'Workplace AI', 'Strategy'],
    featured: false
  },
  {
    id: 'ai-coding-assistants-2025',
    title: 'Best AI Coding Assistants for Developers in 2025',
    excerpt: 'Compare the top AI coding assistants and learn how they can accelerate your development workflow.',
    publishDate: '2024-01-03',
    readTime: '11 min read',
    category: 'Development',
    tags: ['Coding', 'Development', 'AI Tools'],
    featured: true
  },
  {
    id: 'ai-customer-service-revolution',
    title: 'The AI Customer Service Revolution: What Businesses Need to Know',
    excerpt: 'Discover how AI agents are transforming customer service and what it means for your business.',
    publishDate: '2024-01-01',
    readTime: '7 min read',
    category: 'Business',
    tags: ['Customer Service', 'AI Revolution', 'Business'],
    featured: false
  },
  {
    id: 'ai-security-privacy-guide',
    title: 'AI Agent Security and Privacy: A Comprehensive Guide',
    excerpt: 'Essential security and privacy considerations when implementing AI agents in your business.',
    publishDate: '2023-12-28',
    readTime: '8 min read',
    category: 'Security',
    tags: ['Security', 'Privacy', 'AI Safety'],
    featured: false
  },
  {
    id: 'future-ai-agents-predictions',
    title: '2025 Predictions: The Future of AI Agents and Automation',
    excerpt: 'Expert predictions on how AI agents will evolve and shape the future of work and business.',
    publishDate: '2023-12-25',
    readTime: '6 min read',
    category: 'Trends',
    tags: ['Future Tech', 'Predictions', 'AI Trends'],
    featured: false
  },
  {
    id: 'ai-roi-measurement-guide',
    title: 'How to Measure ROI of AI Agent Implementation',
    excerpt: 'Learn practical methods to measure and demonstrate the return on investment of AI agent adoption.',
    publishDate: '2023-12-22',
    readTime: '9 min read',
    category: 'Business',
    tags: ['ROI', 'Metrics', 'Business Value'],
    featured: false
  }
];

const categories = ['All', 'Reviews', 'Guides', 'Business', 'Development', 'Education', 'Security', 'Trends'];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="container py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">AI Agents Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay ahead of the curve with expert insights, in-depth reviews, and practical guides 
          on AI agents and automation tools. Learn from industry experts and discover how AI 
          can transform your business.
        </p>
      </div>

      {/* Featured Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">All Articles</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <Button variant="ghost" size="sm">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-muted/50 rounded-lg p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold">Stay Updated</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get the latest insights on AI agents, automation tools, and productivity tips delivered 
          straight to your inbox. Join thousands of professionals who stay ahead with our weekly newsletter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-md border border-input"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
}