/**
 * Custom Head component for Luxima page
 * Preloads critical assets to improve initial load performance
 */
export default function Head() {
  return (
    <>
      {/* Preload critical assets */}
      {/* <link
        rel="preload"
        href="/luxima/images/hero-poster.jpg"
        as="image"
      /> */}
      {/* <link 
        rel="preload" 
        href="/luxima/images/luxima-logo.png" 
        as="image"
      /> */}
      {/* Add other meta tags as needed */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Luxima - Premium Property Development with high-quality warehouse units" />
    </>
  );
} 