import { NextRequest } from 'next/server';
import { getAllAgents, getAllCategories } from '@/utils/data';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';

    let structuredData = {};

    switch (type) {
        case 'website':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'AI Agents Directory',
                description: 'Discover the perfect AI agent for your needs. Browse our curated directory of AI tools and agents.',
                url: baseUrl,
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${baseUrl}/agents?search={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'AI Agents Directory',
                    url: baseUrl,
                },
            };
            break;

        case 'organization':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'AI Agents Directory',
                description: 'A comprehensive directory of AI agents and tools',
                url: baseUrl,
                logo: `${baseUrl}/icon-512.png`,
                sameAs: [
                    // Add social media links here when available
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    availableLanguage: 'English',
                },
            };
            break;

        case 'catalog':
            const agents = getAllAgents();
            const categories = getAllCategories();

            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'AI Agents Directory',
                description: 'Complete catalog of AI agents and tools',
                url: `${baseUrl}/agents`,
                numberOfItems: agents.length,
                itemListElement: agents.slice(0, 100).map((agent, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@type': 'SoftwareApplication',
                        name: agent.detailed_title || agent.name,
                        description: agent.meta_description || agent.description,
                        url: `${baseUrl}/agents/${agent.name}`,
                        applicationCategory: agent.categories?.[0] || 'AI Tool',
                        offers: {
                            '@type': 'Offer',
                            price: agent.pricing === 'Free' ? '0' : undefined,
                            priceCurrency: 'USD',
                            availability: 'https://schema.org/InStock',
                        },
                        creator: {
                            '@type': 'Organization',
                            name: 'AI Agents Directory',
                        },
                    },
                })),
            };
            break;

        case 'breadcrumb':
            const agentName = searchParams.get('agent');
            const categoryName = searchParams.get('category');

            if (agentName) {
                structuredData = {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Home',
                            item: baseUrl,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Agents',
                            item: `${baseUrl}/agents`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: agentName,
                            item: `${baseUrl}/agents/${agentName}`,
                        },
                    ],
                };
            } else if (categoryName) {
                structuredData = {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        {
                            '@type': 'ListItem',
                            position: 1,
                            name: 'Home',
                            item: baseUrl,
                        },
                        {
                            '@type': 'ListItem',
                            position: 2,
                            name: 'Categories',
                            item: `${baseUrl}/categories`,
                        },
                        {
                            '@type': 'ListItem',
                            position: 3,
                            name: categoryName,
                            item: `${baseUrl}/categories/${categoryName}`,
                        },
                    ],
                };
            }
            break;

        default:
            return new Response('Invalid type parameter', { status: 400 });
    }

    return new Response(JSON.stringify(structuredData, null, 2), {
        headers: {
            'Content-Type': 'application/ld+json',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
    });
}
