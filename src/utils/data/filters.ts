import { AIAgent, PricingFilter, SortOption } from '@/types';

export function filterAgentsByPricing(agents: AIAgent[], filter: PricingFilter): AIAgent[] {
  if (filter === 'all') return agents;
  
  return agents.filter(agent => {
    switch (filter) {
      case 'free':
        return agent.pricing === 'Free';
      case 'paid':
        return agent.pricing === 'Paid';
      case 'freemium':
        return agent.pricing === 'Free + Paid';
      default:
        return true;
    }
  });
}

export function filterAgentsByCategory(agents: AIAgent[], category: string): AIAgent[] {
  if (!category) return agents;
  return agents.filter(agent => 
    agent.categories.some(cat => 
      cat.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
    )
  );
}

export function searchAgents(agents: AIAgent[], query: string): AIAgent[] {
  if (!query.trim()) return agents;
  
  const searchTerm = query.toLowerCase();
  return agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm) ||
    agent.title.toLowerCase().includes(searchTerm) ||
    agent.description.toLowerCase().includes(searchTerm) ||
    agent.meta_description?.toLowerCase().includes(searchTerm) ||
    agent.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
    agent.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

export function sortAgents(agents: AIAgent[], sortBy: SortOption): AIAgent[] {
  const sorted = [...agents];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'category':
      return sorted.sort((a, b) => a.categories[0]?.localeCompare(b.categories[0] || '') || 0);
    case 'pricing':
      return sorted.sort((a, b) => {
        const pricingOrder = { 'Free': 0, 'Free + Paid': 1, 'Paid': 2, 'Ask for Pricing': 3 };
        return pricingOrder[a.pricing] - pricingOrder[b.pricing];
      });
    case 'newest':
      return sorted.reverse(); // Assuming the data is in chronological order
    default:
      return sorted;
  }
}
