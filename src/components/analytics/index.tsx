'use client';

import Script from 'next/script';
import React from 'react';

export function GoogleAnalytics(): React.ReactElement | null {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!GA_ID) return null;

  return (
    <React.Fragment>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </React.Fragment>
  );
}

export function PlausibleAnalytics(): React.ReactElement | null {
  const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  
  if (!PLAUSIBLE_DOMAIN) return null;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

// Simple custom event tracking
export function trackEvent(eventName: string, eventData?: Record<string, string | number | boolean>): void {
  // Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as { gtag?: (...args: unknown[]) => void }).gtag?.('event', eventName, eventData);
  }
  
  // Plausible Analytics
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as { plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void }).plausible?.(eventName, { props: eventData });
  }
  
  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Analytics Event:', eventName, eventData);
  }
}
