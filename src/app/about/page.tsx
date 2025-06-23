import { Bot, Database, Globe, Users, Calendar, Star, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { getDatabase } from '@/utils/data';

export default function AboutPage() {
  const database = getDatabase();
  const { metadata, agents, categories } = database;

  const stats = [
    {
      icon: Bot,
      label: 'Total AI Agents',
      value: metadata.total_agents.toLocaleString(),
      description: 'Curated AI tools and agents'
    },
    {
      icon: Database,
      label: 'Categories',
      value: metadata.total_categories.toString(),
      description: 'Organized by use case'
    },
    {
      icon: Users,
      label: 'Free Agents',
      value: agents.filter(agent => agent.pricing === 'Free').length.toString(),
      description: 'No cost to get started'
    },
    {
      icon: Globe,
      label: 'Data Source',
      value: 'Live',
      description: 'Updated from aiagentslist.com'
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Comprehensive Directory',
      description: 'The most complete collection of AI agents across all categories and use cases.'
    },
    {
      icon: Zap,
      title: 'Smart Filtering',
      description: 'Find exactly what you need with advanced search and filtering capabilities.'
    },
    {
      icon: Star,
      title: 'Curated Quality',
      description: 'Every agent is verified and categorized for accuracy and relevance.'
    },
    {
      icon: Database,
      title: 'Always Updated',
      description: 'Fresh data scraped regularly to keep you informed of the latest AI tools.'
    }
  ];

  return (
    <div className="container py-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Globe className="mr-2 h-4 w-4" />
            About AI Agents Directory
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your Gateway to the
            <br />
            <span className="text-primary">AI Revolution</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the most comprehensive directory of AI agents and tools, 
            helping you discover the perfect AI solution for your specific needs.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="font-medium">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making AI accessible to everyone by providing a centralized, searchable directory 
            of the world's best AI agents and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                What We Do
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We continuously scan and catalog AI agents from across the internet, 
                organizing them into meaningful categories and providing detailed information 
                about their capabilities, pricing, and use cases.
              </p>
              <p className="text-muted-foreground">
                Our platform serves as a bridge between AI innovation and practical application, 
                helping individuals and businesses discover tools that can transform their workflows.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Why It Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The AI landscape evolves rapidly, with new tools launching daily. 
                Without a centralized resource, valuable AI solutions remain undiscovered, 
                limiting innovation and productivity gains.
              </p>
              <p className="text-muted-foreground">
                We democratize access to AI by making discovery simple, ensuring that 
                everyone—from students to enterprises—can find and leverage the right AI tools.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with users in mind, our platform offers powerful features to help you 
            find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Data Source Section */}
      <section className="bg-muted/50 -mx-4 px-4 py-12 rounded-lg">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Data & Transparency</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our data is sourced from reputable directories and updated regularly 
              to ensure accuracy and completeness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <Calendar className="h-8 w-8 mx-auto text-primary" />
                <div>
                  <div className="font-semibold">Last Updated</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(metadata.scraped_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <Globe className="h-8 w-8 mx-auto text-primary" />
                <div>
                  <div className="font-semibold">Primary Source</div>
                  <div className="text-sm text-muted-foreground">
                    <a 
                      href={metadata.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      aiagentslist.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <Database className="h-8 w-8 mx-auto text-primary" />
                <div>
                  <div className="font-semibold">Data Version</div>
                  <div className="text-sm text-muted-foreground">
                    {metadata.scraper_version}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions, suggestions, or want to contribute? We'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Found an issue or have feedback?</div>
              <div className="font-medium">Open a GitHub Issue</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Want to suggest new features?</div>
              <div className="font-medium">Contact Us</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
