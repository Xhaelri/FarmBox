// "use client";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// // Updated Interface:
// // - Added `fill?: boolean`
// // - Made `width` and `height` optional, as they aren't used when `fill` is true.
// // - Added `sizes?: string` for responsiveness, especially important with `fill`.
// interface ImageWithPlaceholderProps {
//   src: string;
//   alt: string;
//   width?: number; // Optional now
//   height?: number; // Optional now
//   className?: string;
//   priority?: boolean;
//   loading?: "lazy" | "eager";
//   quality?: number;
//   fill?: boolean; // New prop
//   sizes?: string; // New prop
// }

// const DEFAULT_PLACEHOLDER =
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// // Default sizes - adjust as needed for your common layouts
// const DEFAULT_SIZES =
//   "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

// export default function ImageWithPlaceholder({
//   src,
//   alt,
//   width,
//   height,
//   className,
//   priority = false,
//   loading,
//   quality,
//   fill = false, // Default to false
//   sizes = DEFAULT_SIZES, // Provide default sizes
// }: ImageWithPlaceholderProps) {
//   const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     if (!src) {
//       setIsLoading(false);
//       setPlaceholder(DEFAULT_PLACEHOLDER); // Ensure placeholder resets if src becomes invalid
//       return;
//     }

//     // Reset loading state when src changes
//     setIsLoading(true);

//     // --- Placeholder generation logic (mostly unchanged) ---
//     if (src.startsWith("/") && !src.startsWith("http")) {
//       // Local image without API placeholder (e.g., color placeholder)
//       const color = generateColorPlaceholder(src);
//       setPlaceholder(color);
//       setIsLoading(false); // Assume local is fast, or adjust if needed
//       return;
//     }

//     // Fetch dynamic placeholder (e.g., base64 blur) from API
//     const controller = new AbortController();
//     const loadPlaceholder = async () => {
//       try {
//         const response = await fetch(
//           `/api/placeholder?src=${encodeURIComponent(src)}`,
//           {
//             signal: controller.signal,
//             cache: "force-cache", // Keep aggressive caching for placeholders
//           }
//         );

//         if (!response.ok) throw new Error("Placeholder fetch failed");

//         const data = await response.json();
//         setPlaceholder(data.placeholder || DEFAULT_PLACEHOLDER);
//       } catch (error) {
//         if (!(error instanceof Error) || error.name !== "AbortError") {
//           console.error("Placeholder error:", error);
//           setPlaceholder(DEFAULT_PLACEHOLDER); // Fallback on error
//         }
//       } finally {
//         // Only set loading false if this fetch completes *after* the Image onLoad might have fired
//         // This helps prevent flashes if the placeholder loads slower than the image
//         // However, Image's onLoad should typically handle the final loading state.
//         // Let's rely on Image's onLoad/onError primarily.
//         // setIsLoading(false); // Removed from here
//       }
//     };

//     loadPlaceholder();

//     return () => controller.abort();
//   }, [src]); // Depend only on src for placeholder fetching
//   // Validate props: If not using fill, width and height are required.
//   if (!fill && (typeof width !== 'number' || typeof height !== 'number')) {
//     console.error(
//       "ImageWithPlaceholder: width and height props are required when fill is false."
//     );
//     // Return null or a fallback element to prevent runtime errors
//     return null;
//   }


//   const handleLoad = () => {
//     setIsLoading(false);
//   };

//   const handleError = () => {
//     setIsLoading(false);
//     // Optionally, you could set a specific error placeholder or hide the image
//     console.error(`Failed to load image: ${src}`);
//   };

//   return (
//     // Parent must be relative (or absolute/fixed) for fill to work correctly.
//     <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
//       <Image
//         // --- Core Props ---
//         src={src}
//         alt={alt}
//         className={className} // Apply user classes
//         priority={priority}
//         loading={loading}
//         quality={quality}

//         // --- Placeholder Props ---
//         placeholder="blur"
//         blurDataURL={placeholder}

//         // --- Loading/Error Handlers ---
//         onLoad={handleLoad}
//         onError={handleError}

//         // --- Conditional Layout Props ---
//         {...(fill
//           ? { fill: true, sizes: sizes } // Use fill and sizes
//           : { width: width as number, height: height as number } // Use width/height (cast needed due to optional)
//         )}
//       />

//       {/* Loading Indicator - absolutely positioned to cover the area */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
//       )}
//     </div>
//   );
// }

// // --- generateColorPlaceholder function remains the same ---
// function generateColorPlaceholder(src: string): string {
//   let hash = 0;
//   for (let i = 0; i < src.length; i++) {
//     hash = src.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   const h = Math.abs(hash % 360);
//   const s = 70 + Math.abs(hash % 30);
//   const l = 85 + Math.abs(hash % 10); // Lighter placeholder

//   return `data:image/svg+xml;base64,${btoa(
//     `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">` +
//       `<rect width="1" height="1" fill="hsl(${h},${s}%,${l}%)" />` +
//       `</svg>`
//   )}`;
// }