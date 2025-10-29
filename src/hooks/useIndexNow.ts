'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to automatically notify IndexNow when a page is viewed
 */
export function useIndexNowNotification(url: string, enabled: boolean = true) {
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!enabled || hasNotified.current || typeof window === 'undefined') {
      return;
    }

    // Only notify once per page load
    hasNotified.current = true;

    // Debounce to avoid spamming on rapid navigation
    const timer = setTimeout(async () => {
      try {
        await fetch('/api/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
      } catch (error) {
        // Silent fail - don't interrupt user experience
        console.debug('IndexNow notification failed:', error);
      }
    }, 2000); // Wait 2 seconds before notifying

    return () => clearTimeout(timer);
  }, [url, enabled]);
}

/**
 * Manually trigger IndexNow notification
 */
export async function notifyIndexNow(url: string): Promise<boolean> {
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json() as { success: boolean };
    return data.success;
  } catch (error) {
    console.error('IndexNow notification failed:', error);
    return false;
  }
}

/**
 * Submit all URLs to IndexNow
 */
export async function notifyAllUrls(): Promise<{ success: boolean; message: string; stats?: unknown }> {
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'all' }),
    });

    return await response.json();
  } catch (error) {
    console.error('IndexNow bulk notification failed:', error);
    return { 
      success: false, 
      message: 'Failed to notify IndexNow' 
    };
  }
}