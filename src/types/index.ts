export interface AIAgent {
  name: string;
  url: string;
  source: string;
  title: string;
  description: string;
  pricing: 'Free' | 'Paid' | 'Free + Paid' | 'Ask for Pricing';
  categories: string[];
  detailed_title?: string;
  meta_description?: string;
  pricing_info?: string;
  external_links?: string[];
  tags?: string[];
}

export interface Category {
  name: string;
  title: string;
  url: string;
  count: number;
}

export interface AIAgentsDatabase {
  metadata: {
    scraped_at: string;
    total_agents: number;
    total_categories: number;
    source_url: string;
    scraper_version: string;
  };
  categories: Category[];
  agents: AIAgent[];
}

export type PricingFilter = 'all' | 'free' | 'paid' | 'freemium';
export type SortOption = 'name' | 'category' | 'pricing' | 'newest';
