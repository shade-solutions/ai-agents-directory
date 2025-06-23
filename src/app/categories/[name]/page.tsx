import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Folder, Users } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { AgentsGrid } from '@/components/agents';
import { getAllCategories, getAgentsByCategory } from '@/utils/data';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const categories = getAllCategories();
  const category = categories.find(cat => cat.name === name);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const title = category.title.split(/\d+/)[0].trim() || category.name.replace('-', ' ');
  const description = `Discover ${category.count} AI agents in the ${title} category. ${category.title.includes('tools') ? category.title.split('tools')[1]?.trim() || '' : ''}`;

  return {
    title: `${title} AI Agents - Category`,
    description,
    openGraph: {
      title: `${title} AI Agents - Category`,
      description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  const categories = getAllCategories();
  const category = categories.find(cat => cat.name === name);
  
  if (!category) {
    notFound();
  }

  const agents = getAgentsByCategory(name);
  const title = category.title.split(/\d+/)[0].trim() || category.name.replace('-', ' ');
  const description = category.title.includes('tools') 
    ? category.title.split('tools')[1]?.trim() || 'Explore tools in this category'
    : 'Discover amazing AI agents in this category';

  // Get related categories (categories with similar names or overlapping agents)
  const relatedCategories = categories
    .filter(cat => cat.name !== name)
    .slice(0, 4);

  return (
    <div className="container py-8 space-y-8">
      {/* Back Button */}
      <div>
        <Link href="/categories">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Folder className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">{title}</h1>
                <Badge variant="secondary" className="text-sm">
                  <Users className="mr-1 h-4 w-4" />
                  {category.count} agents
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{agents.length}</div>
          <div className="text-sm text-muted-foreground">Total Agents</div>
        </div>
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {agents.filter(agent => agent.pricing === 'Free').length}
          </div>
          <div className="text-sm text-muted-foreground">Free Agents</div>
        </div>
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {new Set(agents.flatMap(agent => agent.tags || [])).size}
          </div>
          <div className="text-sm text-muted-foreground">Unique Tags</div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All {title} Agents</h2>
          <Link href="/agents">
            <Button variant="outline">
              Browse All Categories
            </Button>
          </Link>
        </div>

        <AgentsGrid agents={agents} />
      </div>

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-bold">Related Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCategories.map((relatedCategory) => {
              const relatedTitle = relatedCategory.title.split(/\d+/)[0].trim() || relatedCategory.name.replace('-', ' ');
              
              return (
                <Link key={relatedCategory.name} href={`/categories/${relatedCategory.name}`}>
                  <div className="p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Folder className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{relatedTitle}</div>
                        <div className="text-sm text-muted-foreground">{relatedCategory.count} agents</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
