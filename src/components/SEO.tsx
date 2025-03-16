import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

const defaultDescription = 'Your default site description here';
const defaultKeywords = ['react', 'typescript', 'web development'];
const defaultOgImage = '/og-image.jpg';
const defaultTwitterCard = 'summary_large_image';

export function SEO({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  ogImage = defaultOgImage,
  ogUrl,
  twitterCard = defaultTwitterCard,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description,
      keywords: keywords.join(', '),
      'og:title': title,
      'og:description': description,
      'og:image': ogImage,
      'og:url': ogUrl,
      'twitter:card': twitterCard,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      // Try to find existing meta tag
      let meta = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`);

      if (meta) {
        // Update existing tag
        meta.setAttribute('content', content);
      } else {
        // Create new tag
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Cleanup function to remove meta tags on unmount
    return () => {
      Object.keys(metaTags).forEach((name) => {
        const meta = document.querySelector(`meta[name="${name}"]`) ||
                    document.querySelector(`meta[property="${name}"]`);
        if (meta && meta.parentNode) {
          meta.parentNode.removeChild(meta);
        }
      });
    };
  }, [title, description, keywords, ogImage, ogUrl, twitterCard]);

  return null;
} 