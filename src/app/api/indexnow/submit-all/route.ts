import { NextResponse } from 'next/server';
import { getAllAgents, getAllCategories } from '@/utils/data';

const INDEXNOW_KEY = 'b786ce2423fa4a1182fa2c99ae947657';

export async function POST() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-agents.30tools.com';
    
    // Collect all URLs
    const urls: string[] = [];
    
    // Static pages
    urls.push(baseUrl);
    urls.push(`${baseUrl}/agents`);
    urls.push(`${baseUrl}/categories`);
    urls.push(`${baseUrl}/about`);
    urls.push(`${baseUrl}/favorites`);
    
    // All agent pages
    const agents = getAllAgents();
    agents.forEach((agent) => {
      urls.push(`${baseUrl}/agents/${agent.name}`);
    });
    
    // All category pages
    const categories = getAllCategories();
    categories.forEach((category) => {
      urls.push(`${baseUrl}/categories/${category.name}`);
    });

    // Submit to IndexNow (batch submission)
    const indexNowUrl = 'https://api.indexnow.org/indexnow';
    
    const response = await fetch(indexNowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: new URL(baseUrl).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URLs to IndexNow`,
        urls,
        count: urls.length,
      });
    }

    const errorText = await response.text();
    return NextResponse.json(
      {
        success: false,
        error: `IndexNow API returned status ${response.status}: ${errorText}`,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('IndexNow batch submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}