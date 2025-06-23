import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Tag, Users, Globe, Calendar, DollarSign } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, FavoriteButton, Favicon } from '@/components/ui';
import { getAgentByName } from '@/utils/data';
import { Metadata } from 'next';

interface AgentPageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { name } = await params;
  const agent = getAgentByName(name);
  
  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }

  return {
    title: `${agent.detailed_title || agent.name} - AI Agent`,
    description: agent.meta_description || agent.description,
    openGraph: {
      title: `${agent.detailed_title || agent.name} - AI Agent`,
      description: agent.meta_description || agent.description,
      type: 'website',
    },
  };
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { name } = await params;
  const agent = getAgentByName(name);

  if (!agent) {
    notFound();
  }

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Paid':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Free + Paid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTitle = (title: string) => {
    return title
      .replace(/^(Featured|Recently Added)/, '')
      .replace(agent.name, '')
      .replace(/^[A-Z][a-z\s]+/, '')
      .trim();
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Back Button */}
      <div>
        <Link href="/agents">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to All Agents
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-start gap-4">
              <Favicon 
                url={agent.url} 
                name={agent.name}
                size={64}
                className="flex-shrink-0 mt-2"
              />
              <div className="space-y-2 flex-1 min-w-0">
                <h1 className="text-4xl font-bold">{agent.detailed_title || agent.name}</h1>
                <p className="text-xl text-muted-foreground">
                  {agent.meta_description || agent.description || formatTitle(agent.title)}
                </p>
              </div>
            </div>

            {/* Categories */}
            {agent.categories && agent.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {agent.categories.map((category) => (
                  <Link key={category} href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Badge variant="outline" className="hover:bg-accent cursor-pointer">
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pricing and Actions */}
          <div className="space-y-4 lg:w-80">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pricing</span>
                  <Badge className={getPricingColor(agent.pricing)}>
                    {agent.pricing}
                  </Badge>
                </div>

                {agent.pricing_info && agent.pricing_info !== agent.pricing && (
                  <p className="text-sm text-muted-foreground">
                    {agent.pricing_info}
                  </p>
                )}

                {agent.external_links && agent.external_links.length > 0 && (
                  <div className="space-y-2">
                    {agent.external_links.slice(0, 3).map((link, index) => {
                      const domain = new URL(link).hostname.replace('www.', '');
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <ExternalLink className="h-4 w-4" />
                            {domain}
                          </Button>
                        </a>
                      );
                    })}
                  </div>
                )}

                <div className="pt-2 border-t">
                  <FavoriteButton 
                    agentName={agent.name} 
                    variant="outline" 
                    size="default"
                    className="w-full"
                    showText={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {agent.meta_description || agent.description || formatTitle(agent.title)}
              </p>
              
              {agent.title && agent.title !== agent.name && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Original listing:</strong> {formatTitle(agent.title)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {agent.tags && agent.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags & Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag.replace('#', '')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* External Links */}
          {agent.external_links && agent.external_links.length > 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {agent.external_links.slice(3).map((link, index) => {
                    const domain = new URL(link).hostname.replace('www.', '');
                    return (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors text-sm"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        {domain}
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Info */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Pricing:</strong> {agent.pricing}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Categories:</strong> {agent.categories?.length || 0}
                </span>
              </div>

              {agent.source && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Source:</strong> {agent.source.replace(':', ' - ')}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/agents">
                <Button variant="outline" className="w-full">
                  Browse Similar Agents
                </Button>
              </Link>
              
              {agent.categories && agent.categories.length > 0 && (
                <Link href={`/categories/${agent.categories[0].toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="outline" className="w-full">
                    View {agent.categories[0]} Category
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
