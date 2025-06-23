import Link from 'next/link';
import { ExternalLink, Tag } from 'lucide-react';
import { AIAgent } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Badge, Button, FavoriteButton, Favicon } from '@/components/ui';

interface AgentCardProps {
  agent: AIAgent;
  showTags?: boolean;
  showDescription?: boolean;
}

export function AgentCard({ agent, showTags = true, showDescription = true }: AgentCardProps) {
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
    // Clean up the title by removing redundant text
    return title
      .replace(/^(Featured|Recently Added)/, '')
      .replace(agent.name, '')
      .replace(/^[A-Z][a-z\s]+/, '')
      .trim();
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Favicon 
              url={agent.url} 
              name={agent.name}
              size={40}
              className="flex-shrink-0 mt-1"
            />
            <CardTitle className="text-lg font-semibold line-clamp-2 flex-1">
              {agent.detailed_title || agent.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <FavoriteButton 
              agentName={agent.name} 
              variant="ghost" 
              size="sm"
              className="p-2"
            />
            <Badge 
              variant="secondary" 
              className={`${getPricingColor(agent.pricing)} text-xs font-medium`}
            >
              {agent.pricing}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {showDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {agent.meta_description || agent.description || formatTitle(agent.title)}
          </p>
        )}

        {agent.categories && agent.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {agent.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {agent.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.categories.length - 3}
              </Badge>
            )}
          </div>
        )}

        {showTags && agent.tags && agent.tags.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag size={12} />
            <span className="line-clamp-1">
              {agent.tags.slice(0, 2).map(tag => tag.replace('#', '')).join(', ')}
              {agent.tags.length > 2 && '...'}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Link href={`/agents/${agent.name}`} className="flex-1">
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full"
          >
            View Details
          </Button>
        </Link>
        
        {agent.external_links && agent.external_links.length > 0 && (
          <a 
            href={agent.external_links[0]} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <ExternalLink size={14} />
              Visit
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
