'use client';

import { useEffect } from 'react';

interface IndexNowNotifierProps {
  url: string;
}

export function IndexNowNotifier({ url }: IndexNowNotifierProps) {
  useEffect(() => {
    // Only notify in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

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
    }, 3000); // Wait 3 seconds before notifying

    return () => clearTimeout(timer);
  }, [url]);

  return null; // This component doesn't render anything
}