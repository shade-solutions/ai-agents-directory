import { MetadataRoute } from 'next';
import { getAllAgents, getAllCategories } from '@/utils/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/agents`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/favorites`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.3,
        },
    ];

    // Blog pages
    const blogPosts = [
        'best-ai-agents-2025',
        'ai-productivity-guide', 
        'chatbot-vs-ai-agent',
        'ai-content-creation-tools',
        'implementing-ai-workplace',
        'ai-coding-assistants-2025'
    ];
    
    const blogPages = blogPosts.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Dynamic agent pages
    const agents = getAllAgents();
    const agentPages = agents.map((agent) => ({
        url: `${baseUrl}/agents/${agent.name}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic category pages
    const categories = getAllCategories();
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/categories/${category.name}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogPages, ...agentPages, ...categoryPages];
}
