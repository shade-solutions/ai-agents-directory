import { AIAgent } from '@/types';

export function getAgentRealUrl(agent: AIAgent): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';
  let internalDomain = 'ai-agents.30tools.com';
  
  try {
    internalDomain = new URL(baseUrl).hostname;
  } catch (e) {
    // Fallback
  }
  
  // Check if the main URL is external
  try {
    const urlDomain = new URL(agent.url).hostname;
    if (!urlDomain.includes(internalDomain)) {
      return agent.url;
    }
  } catch (e) {
    // Invalid URL
  }

  // If main URL is internal, try to find a better one in external_links
  if (agent.external_links && agent.external_links.length > 0) {
    const blockedDomains = [
      'twitter.com', 'x.com', 'linkedin.com', 'facebook.com', 'instagram.com', 
      'youtube.com', 'github.com', 'tally.so', 'gumroad.com',
      internalDomain,
      'aistage.net', 'aitoolzdir.com', 'startupfa.me', 'aitooltrek.com',
      'producthunt.com'
    ];
    
    const candidate = agent.external_links.find(link => {
      try {
        const domain = new URL(link).hostname.replace('www.', '');
        return !blockedDomains.some(blocked => domain.includes(blocked));
      } catch {
        return false;
      }
    });

    if (candidate) return candidate;
  }

  return null;
}
