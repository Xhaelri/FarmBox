// components/ImageWithPlaceholder.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const DEFAULT_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export default function ImageWithPlaceholder({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: ImageWithPlaceholderProps) {
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    // For local public images, use a simple color hash placeholder
    if (src.startsWith('/') && !src.startsWith('http')) {
      const color = generateColorPlaceholder(src);
      setPlaceholder(color);
      setIsLoading(false);
      return;
    }

    // For remote images or when we want server-generated placeholders
    const controller = new AbortController();
    
    const loadPlaceholder = async () => {
      try {
        const response = await fetch(`/api/placeholder?src=${encodeURIComponent(src)}`, {
          signal: controller.signal,
          cache: 'force-cache'
        });
        
        if (!response.ok) throw new Error('Placeholder fetch failed');
        
        const data = await response.json();
        setPlaceholder(data.placeholder || DEFAULT_PLACEHOLDER);
      } catch (error) {
        if (!(error instanceof Error) || error.name !== 'AbortError') {
          console.error("Placeholder error:", error);
          setPlaceholder(DEFAULT_PLACEHOLDER);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaceholder();
    
    return () => controller.abort();
  }, [src]);

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        placeholder="blur"
        blurDataURL={placeholder}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
      )}
    </div>
  );
}

// Simple deterministic color placeholder generator
function generateColorPlaceholder(src: string): string {
  // Create a simple hash from the src string
  let hash = 0;
  for (let i = 0; i < src.length; i++) {
    hash = src.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to HSL color values
  const h = Math.abs(hash % 360);
  const s = 70 + Math.abs(hash % 30);
  const l = 85 + Math.abs(hash % 10);
  
  // Create a 1x1 pixel image with the generated color
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">` +
    `<rect width="1" height="1" fill="hsl(${h},${s}%,${l}%)" />` +
    `</svg>`
  )}`;
}