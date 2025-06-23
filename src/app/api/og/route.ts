import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'AI Agents Directory';
    const description = searchParams.get('description') || 'Discover the perfect AI agent for your needs';
    const category = searchParams.get('category') || '';

    // Simple SVG-based OpenGraph image
    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f0f9ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#dbeafe;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg)"/>
        
        <!-- Main container -->
        <rect x="60" y="80" width="1080" height="470" rx="12" fill="white" stroke="#e5e7eb" stroke-width="1" opacity="0.95"/>
        
        <!-- Title -->
        <text x="600" y="220" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#111827">${title}</text>
        
        <!-- Category badge -->
        ${category ? `<rect x="500" y="250" width="${category.length * 12 + 20}" height="30" rx="15" fill="#eef2ff"/>
        <text x="${500 + (category.length * 6 + 10)}" y="270" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#6366f1">${category}</text>` : ''}
        
        <!-- Description -->
        <text x="600" y="320" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" fill="#6b7280">${description}</text>
        
        <!-- Footer -->
        <text x="600" y="480" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#9ca3af">🤖 AI Agents Directory</text>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
