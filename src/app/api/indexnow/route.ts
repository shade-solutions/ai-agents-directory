import { NextRequest, NextResponse } from 'next/server';
import { submitUrlToIndexNow, submitUrlsToIndexNow, getAllIndexableUrls } from '@/utils/indexnow';
import { getAllAgents, getAllCategories } from '@/utils/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { url?: string; urls?: string[]; type?: string };
    const { url, urls, type } = body;

    // Single URL submission
    if (url) {
      const success = await submitUrlToIndexNow(url);
      return NextResponse.json({ 
        success, 
        message: success ? 'URL submitted to IndexNow' : 'Failed to submit URL' 
      });
    }

    // Multiple URLs submission
    if (urls && Array.isArray(urls)) {
      const success = await submitUrlsToIndexNow(urls);
      return NextResponse.json({ 
        success, 
        message: success ? `${urls.length} URLs submitted to IndexNow` : 'Failed to submit URLs' 
      });
    }

    // Submit all URLs based on type
    if (type === 'all') {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';
      const agents = getAllAgents();
      const categories = getAllCategories();

      const agentUrls = agents.map(agent => `${baseUrl}/agents/${agent.name}`);
      const categoryUrls = categories.map(cat => `${baseUrl}/categories/${cat.name}`);
      const staticUrls = getAllIndexableUrls(baseUrl);

      const allUrls = [...staticUrls, ...agentUrls, ...categoryUrls];

      // Submit in batches of 100 (IndexNow limit is 10,000 per request)
      const batchSize = 100;
      const results = [];
      
      for (let i = 0; i < allUrls.length; i += batchSize) {
        const batch = allUrls.slice(i, i + batchSize);
        const success = await submitUrlsToIndexNow(batch);
        results.push(success);
        
        // Small delay between batches to avoid rate limiting
        if (i + batchSize < allUrls.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      const totalSuccess = results.filter(r => r).length;
      const totalBatches = results.length;

      return NextResponse.json({ 
        success: totalSuccess > 0,
        message: `Submitted ${totalSuccess}/${totalBatches} batches (${allUrls.length} total URLs) to IndexNow`,
        stats: {
          total: allUrls.length,
          agents: agentUrls.length,
          categories: categoryUrls.length,
          static: staticUrls.length,
        }
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid request. Provide url, urls array, or type=all' 
    }, { status: 400 });

  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API - Use POST with { url } or { urls: [] } or { type: "all" }',
    endpoints: {
      single: 'POST with { url: "https://example.com" }',
      multiple: 'POST with { urls: ["url1", "url2"] }',
      all: 'POST with { type: "all" }',
    }
  });
}