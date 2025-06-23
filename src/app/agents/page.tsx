'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button, Input, Badge, Card, CardContent } from '@/components/ui';
import { AgentsGrid } from '@/components/agents';
import { getAllAgents, getAllCategories, filterAgentsByPricing, filterAgentsByCategory, searchAgents, sortAgents } from '@/utils/data';
import { PRICING_OPTIONS, SORT_OPTIONS } from '@/constants';
import { PricingFilter, SortOption } from '@/types';

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showFilters, setShowFilters] = useState(false);

  const allAgents = getAllAgents();
  const allCategories = getAllCategories();

  const filteredAndSortedAgents = useMemo(() => {
    let filtered = allAgents;

    // Apply search
    if (searchQuery.trim()) {
      filtered = searchAgents(filtered, searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filterAgentsByCategory(filtered, selectedCategory);
    }

    // Apply pricing filter
    filtered = filterAgentsByPricing(filtered, pricingFilter);

    // Apply sorting
    filtered = sortAgents(filtered, sortBy);

    return filtered;
  }, [allAgents, searchQuery, selectedCategory, pricingFilter, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPricingFilter('all');
    setSortBy('name');
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">All AI Agents</h1>
        <p className="text-lg text-muted-foreground">
          Discover {allAgents.length} AI agents across {allCategories.length} categories
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agents by name, description, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedAgents.length} agents found
              </span>
              {(searchQuery || selectedCategory || pricingFilter !== 'all') && (
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  Reset Filters
                </Button>
              )}
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.title.split(/\d+/)[0].trim() || category.name.replace('-', ' ')} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Pricing</label>
                <select
                  value={pricingFilter}
                  onChange={(e) => setPricingFilter(e.target.value as PricingFilter)}
                  className="input"
                >
                  {PRICING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="input"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Active Filters */}
      {(searchQuery || selectedCategory || pricingFilter !== 'all') && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchQuery}
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {selectedCategory.replace('-', ' ')}
              <button
                onClick={() => setSelectedCategory('')}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {pricingFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Pricing: {PRICING_OPTIONS.find(p => p.value === pricingFilter)?.label}
              <button
                onClick={() => setPricingFilter('all')}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results */}
      <AgentsGrid agents={filteredAndSortedAgents} />
    </div>
  );
}
