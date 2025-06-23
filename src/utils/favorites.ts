import { AIAgent } from '@/types';

const FAVORITES_KEY = 'ai-agents-favorites';

export interface FavoritesManager {
  getFavorites: () => string[];
  isFavorite: (agentName: string) => boolean;
  addFavorite: (agentName: string) => void;
  removeFavorite: (agentName: string) => void;
  toggleFavorite: (agentName: string) => void;
  clearFavorites: () => void;
  getFavoriteAgents: (allAgents: AIAgent[]) => AIAgent[];
}

export const favoritesManager: FavoritesManager = {
  getFavorites: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },

  isFavorite: (agentName: string): boolean => {
    const favorites = favoritesManager.getFavorites();
    return favorites.includes(agentName);
  },

  addFavorite: (agentName: string): void => {
    if (typeof window === 'undefined') return;
    try {
      const favorites = favoritesManager.getFavorites();
      if (!favorites.includes(agentName)) {
        const newFavorites = [...favorites, agentName];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('favoritesChanged', {
          detail: { agentName, action: 'added' }
        }));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  removeFavorite: (agentName: string): void => {
    if (typeof window === 'undefined') return;
    try {
      const favorites = favoritesManager.getFavorites();
      const newFavorites = favorites.filter(name => name !== agentName);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('favoritesChanged', {
        detail: { agentName, action: 'removed' }
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  toggleFavorite: (agentName: string): void => {
    if (favoritesManager.isFavorite(agentName)) {
      favoritesManager.removeFavorite(agentName);
    } else {
      favoritesManager.addFavorite(agentName);
    }
  },

  clearFavorites: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(FAVORITES_KEY);
      window.dispatchEvent(new CustomEvent('favoritesChanged', {
        detail: { action: 'cleared' }
      }));
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  },

  getFavoriteAgents: (allAgents: AIAgent[]): AIAgent[] => {
    const favorites = favoritesManager.getFavorites();
    return allAgents.filter(agent => 
      favorites.includes(agent.name) || favorites.includes(agent.url)
    );
  }
};
