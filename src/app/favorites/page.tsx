'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, LoadingSpinner } from '@/components/ui';
import { AgentsGrid } from '@/components/agents';
import { useFavorites } from '@/hooks';
import { getAllAgents } from '@/utils/data';
import { AIAgent } from '@/types';

export default function FavoritesPage() {
  const { favorites, isLoading, clearFavorites } = useFavorites();
  const [favoriteAgents, setFavoriteAgents] = useState<AIAgent[]>([]);

  useEffect(() => {
    if (!isLoading && favorites.length > 0) {
      const allAgents = getAllAgents();
      const filteredFavorites = allAgents.filter(agent => 
        favorites.includes(agent.name) || favorites.includes(agent.url)
      );
      setFavoriteAgents(filteredFavorites);
    } else if (!isLoading) {
      setFavoriteAgents([]);
    }
  }, [favorites, isLoading]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              My Favorites
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {favoriteAgents.length > 0 
                ? `${favoriteAgents.length} AI agent${favoriteAgents.length === 1 ? '' : 's'} saved for later`
                : 'No favorites yet - start exploring to save your favorite AI agents'
              }
            </p>
          </div>
          
          {favoriteAgents.length > 0 && (
            <Button
              variant="outline"
              onClick={clearFavorites}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {favoriteAgents.length > 0 ? (
        <div className="space-y-6">
          <AgentsGrid 
            agents={favoriteAgents} 
            showLoadMore={false}
          />
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="text-2xl">No Favorites Yet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground max-w-md mx-auto">
              Start exploring our directory and click the heart icon on any agent to add it to your favorites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/agents">
                <Button size="lg" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Explore All Agents
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
