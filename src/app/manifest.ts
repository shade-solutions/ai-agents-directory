import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Agents Directory',
    short_name: 'AI Agents',
    description: 'Discover the perfect AI agent for your needs. Browse our curated directory of AI tools and agents.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['productivity', 'business', 'utilities'],
    shortcuts: [
      {
        name: 'Browse Agents',
        short_name: 'Agents',
        description: 'Browse all AI agents',
        url: '/agents',
        icons: [{ src: '/icon-192.svg', sizes: '192x192' }],
      },
      {
        name: 'Categories',
        short_name: 'Categories',
        description: 'Browse by category',
        url: '/categories',
        icons: [{ src: '/icon-192.svg', sizes: '192x192' }],
      },
      {
        name: 'Favorites',
        short_name: 'Favorites',
        description: 'View your favorites',
        url: '/favorites',
        icons: [{ src: '/icon-192.svg', sizes: '192x192' }],
      },
    ],
  };
}
