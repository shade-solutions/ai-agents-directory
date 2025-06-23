'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { getFaviconUrl, getFallbackFaviconUrl } from '@/utils/favicon';

interface FaviconProps {
  url: string;
  name: string;
  size?: number;
  className?: string;
}

export function Favicon({ url, name, size = 32, className = '' }: FaviconProps) {
  const [hasError, setHasError] = useState(false);
  const [hasFallbackError, setHasFallbackError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If both primary and fallback failed, show icon
  if (hasError && hasFallbackError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted rounded border ${className}`}
        style={{ width: size, height: size }}
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  // If primary failed but fallback hasn't been tried
  if (hasError && !hasFallbackError) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        {isLoading && (
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-muted rounded border animate-pulse ${className}`}
          >
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <Image
          src={getFallbackFaviconUrl(url)}
          alt={`${name} favicon`}
          width={size}
          height={size}
          className={`rounded border ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={() => setHasFallbackError(true)}
          onLoad={() => setIsLoading(false)}
          unoptimized
        />
      </div>
    );
  }

  // Primary favicon attempt
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {isLoading && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-muted rounded border animate-pulse ${className}`}
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <Image
        src={getFaviconUrl(url, size)}
        alt={`${name} favicon`}
        width={size}
        height={size}
        className={`rounded border ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        unoptimized
      />
    </div>
  );
}
