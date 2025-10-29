/**
 * IndexNow API Integration
 * Instantly notify search engines about URL changes
 */

const INDEXNOW_API_KEY = 'b786ce2423fa4a1182fa2c99ae947657';
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  // Add more endpoints if needed
];

export interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

/**
 * Submit a single URL to IndexNow
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname;
    
    const payload: IndexNowSubmission = {
      host,
      key: INDEXNOW_API_KEY,
      keyLocation: `https://${host}/${INDEXNOW_API_KEY}.txt`,
      urlList: [url],
    };

    // Submit to primary endpoint
    const response = await fetch(INDEXNOW_ENDPOINTS[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // 200 = Success, 202 = Accepted (both are good)
    return response.status === 200 || response.status === 202;
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return false;
  }
}

/**
 * Submit multiple URLs to IndexNow (batch submission)
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<boolean> {
  if (urls.length === 0) return false;
  
  try {
    const urlObj = new URL(urls[0]);
    const host = urlObj.hostname;
    
    const payload: IndexNowSubmission = {
      host,
      key: INDEXNOW_API_KEY,
      keyLocation: `https://${host}/${INDEXNOW_API_KEY}.txt`,
      urlList: urls,
    };

    const response = await fetch(INDEXNOW_ENDPOINTS[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return response.status === 200 || response.status === 202;
  } catch (error) {
    console.error('IndexNow batch submission error:', error);
    return false;
  }
}

/**
 * Get all URLs for submission (for initial indexing)
 */
export function getAllIndexableUrls(baseUrl: string): string[] {
  // This will be populated with actual URLs from your data
  return [
    baseUrl,
    `${baseUrl}/agents`,
    `${baseUrl}/categories`,
    `${baseUrl}/about`,
    `${baseUrl}/favorites`,
  ];
}

/**
 * Submit agent URL when it's viewed or updated
 */
export async function notifyAgentUpdate(agentName: string, baseUrl: string): Promise<boolean> {
  const url = `${baseUrl}/agents/${agentName}`;
  return submitUrlToIndexNow(url);
}

/**
 * Submit category URL when it's viewed or updated
 */
export async function notifyCategoryUpdate(categoryName: string, baseUrl: string): Promise<boolean> {
  const url = `${baseUrl}/categories/${categoryName}`;
  return submitUrlToIndexNow(url);
}

export { INDEXNOW_API_KEY };