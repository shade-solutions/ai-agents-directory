import { getAllAgents } from '@/utils/data';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';
    const agents = getAllAgents();

    // Get the most recent 50 agents for the feed
    const recentAgents = agents
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 50);

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Agents Directory</title>
    <description>Discover the latest AI agents and tools. Stay updated with our curated directory of AI solutions.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js AI Agents Directory</generator>
    <webMaster>contact@ai-agents-directory.com</webMaster>
    <managingEditor>contact@ai-agents-directory.com</managingEditor>
    <copyright>© ${new Date().getFullYear()} AI Agents Directory</copyright>
    <category>Technology</category>
    <category>Artificial Intelligence</category>
    <ttl>1440</ttl>
    
    ${recentAgents
            .map(
                (agent) => `
    <item>
      <title><![CDATA[${agent.detailed_title || agent.name}]]></title>
      <description><![CDATA[${agent.meta_description || agent.description || agent.title}]]></description>
      <link>${baseUrl}/agents/${agent.name}</link>
      <guid isPermaLink="true">${baseUrl}/agents/${agent.name}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category><![CDATA[${agent.categories?.[0] || 'AI Tools'}]]></category>
      <author>AI Agents Directory</author>
      ${agent.categories?.map(cat => `<category><![CDATA[${cat}]]></category>`).join('') || ''}
    </item>`
            )
            .join('')}
  </channel>
</rss>`;

    return new Response(rssXml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
    });
}
