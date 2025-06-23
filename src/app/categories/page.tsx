import Link from 'next/link';
import { ArrowRight, Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { getAllCategories } from '@/utils/data';

export default function CategoriesPage() {
  const categories = getAllCategories().sort((a, b) => b.count - a.count);
  const totalAgents = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Folder className="mr-2 h-4 w-4" />
            {categories.length} Categories
          </Badge>
        </div>
        <h1 className="text-4xl font-bold">AI Agent Categories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore AI agents organized by their primary use cases and industries. 
          Discover {totalAgents} agents across {categories.length} specialized categories.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const title = category.title.split(/\d+/)[0].trim() || category.name.replace('-', ' ');
          const description = category.title.includes('tools') 
            ? category.title.split('tools')[1]?.trim() || 'Explore tools in this category'
            : 'Discover amazing AI agents in this category';

          return (
            <Link key={category.name} href={`/categories/${category.name}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Folder className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {description}
                  </p>
                  <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                    View agents
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Popular Categories Section */}
      <div className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-bold text-center">Most Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((category, index) => {
            const title = category.title.split(/\d+/)[0].trim() || category.name.replace('-', ' ');
            
            return (
              <Link key={category.name} href={`/categories/${category.name}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-muted-foreground">{category.count} agents</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
