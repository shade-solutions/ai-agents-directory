'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/utils/cn';

interface FavoriteButtonProps {
  agentName: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showText?: boolean;
}

export function FavoriteButton({ 
  agentName, 
  variant = 'outline', 
  size = 'default',
  className,
  showText = false
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoading } = useFavorites();
  
  const isAgentFavorited = isFavorite(agentName);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(agentName);
  };

  if (isLoading) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={cn("opacity-50 cursor-not-allowed", className)}
        disabled
      >
        <Heart className="h-4 w-4" />
        {showText && <span className="ml-2">Loading...</span>}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        "transition-colors duration-200",
        isAgentFavorited && "text-red-500 hover:text-red-600",
        className
      )}
      title={isAgentFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isAgentFavorited && "fill-current"
        )} 
      />
      {showText && (
        <span className="ml-2">
          {isAgentFavorited ? "Favorited" : "Add to Favorites"}
        </span>
      )}
    </Button>
  );
}
