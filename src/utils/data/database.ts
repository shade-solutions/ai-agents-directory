import { AIAgentsDatabase } from '@/types';
import databaseData from '@/data/ai_agents_database.json';

export function getDatabase(): AIAgentsDatabase {
  return databaseData as AIAgentsDatabase;
}

export function getAllAgents() {
  return getDatabase().agents;
}

export function getAllCategories() {
  return getDatabase().categories;
}

export function getAgentByName(name: string) {
  return getAllAgents().find(agent => agent.name === name);
}

export function getAgentsByCategory(categoryName: string) {
  return getAllAgents().filter(agent => 
    agent.categories.some(cat => 
      cat.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
    )
  );
}

export function getFeaturedAgents(limit: number = 6) {
  return getAllAgents()
    .filter(agent => agent.detailed_title && agent.tags?.length)
    .slice(0, limit);
}

export function getPopularCategories(limit: number = 8) {
  return getAllCategories()
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
