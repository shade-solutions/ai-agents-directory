import Link from 'next/link';
import { ArrowRight, Bot, Search, Filter, Star } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { AgentsGrid } from '@/components/agents';
import { getAllCategories, getFeaturedAgents, getPopularCategories } from '@/utils/data';

export default function HomePage() {
  const featuredAgents = getFeaturedAgents(6);
  const popularCategories = getPopularCategories(8);
  const totalAgents = getAllCategories().reduce((sum, cat) => sum + cat.count, 0);
  const totalCategories = getAllCategories().length;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                🚀 Discover the Future of AI
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find the Perfect{' '}
              <span className="text-primary">AI Agent</span>
              <br />
              for Your Needs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated directory of {totalAgents}+ AI agents across {totalCategories} categories. 
              From productivity tools to coding assistants, find the AI solution that transforms your workflow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agents">
              <Button size="lg" className="text-lg px-8">
                <Search className="mr-2 h-5 w-5" />
                Explore All Agents
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Filter className="mr-2 h-5 w-5" />
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalAgents}+</div>
              <div className="text-sm text-muted-foreground">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalCategories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Always Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="container space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Featured AI Agents</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked agents with detailed information and proven capabilities
          </p>
        </div>

        <AgentsGrid agents={featuredAgents} />

        <div className="text-center">
          <Link href="/agents">
            <Button variant="outline" size="lg">
              View All Agents
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-muted/50 py-16">
        <div className="container space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover AI agents organized by their primary use cases and industries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <Link key={category.name} href={`/categories/${category.name}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="line-clamp-1">
                        {category.title.split(/\d+/)[0].trim() || category.name.replace('-', ' ')}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.title.includes('tools') 
                        ? category.title.split('tools')[1]?.trim() || 'Explore tools in this category'
                        : 'Discover amazing AI agents in this category'
                      }
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/categories">
              <Button variant="outline" size="lg">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center space-y-6">
            <Bot className="h-16 w-16 mx-auto opacity-90" />
            <h2 className="text-3xl font-bold">Ready to Transform Your Workflow?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of users who have already discovered their perfect AI agent. 
              Start exploring our directory and find tools that will revolutionize how you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/agents">
                <Button variant="secondary" size="lg" className="text-lg px-8">
                  <Star className="mr-2 h-5 w-5" />
                  Start Exploring
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
