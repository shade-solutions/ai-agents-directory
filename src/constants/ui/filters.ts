export const PRICING_OPTIONS = [
  { value: 'all', label: 'All Pricing' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
  { value: 'freemium', label: 'Free + Paid' },
] as const;

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'category', label: 'Category' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'newest', label: 'Recently Added' },
] as const;

export const ITEMS_PER_PAGE = 12;

export const POPULAR_CATEGORIES = [
  'ai-agent-builders',
  'coding', 
  'productivity',
  'digital-workers',
  'customer-service'
] as const;
