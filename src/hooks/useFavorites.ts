'use client';

import { useState, useEffect } from 'react';
import { favoritesManager } from '@/utils/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize favorites from localStorage
    const initializeFavorites = () => {
      const savedFavorites = favoritesManager.getFavorites();
      setFavorites(savedFavorites);
      setIsLoading(false);
    };

    // Handle custom favorites changed events
    const handleFavoritesChanged = () => {
      const updatedFavorites = favoritesManager.getFavorites();
      setFavorites(updatedFavorites);
    };

    initializeFavorites();

    // Listen for changes in favorites
    window.addEventListener('favoritesChanged', handleFavoritesChanged);
    
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChanged);
    };
  }, []);

  const isFavorite = (agentName: string): boolean => {
    return favorites.includes(agentName);
  };

  const addFavorite = (agentName: string): void => {
    favoritesManager.addFavorite(agentName);
  };

  const removeFavorite = (agentName: string): void => {
    favoritesManager.removeFavorite(agentName);
  };

  const toggleFavorite = (agentName: string): void => {
    favoritesManager.toggleFavorite(agentName);
  };

  const clearFavorites = (): void => {
    favoritesManager.clearFavorites();
  };

  return {
    favorites,
    isLoading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
}
