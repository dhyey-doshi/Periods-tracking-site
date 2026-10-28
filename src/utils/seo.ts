import { useEffect } from 'react';

export interface DocumentMetadataOptions {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

const DEFAULT_TITLE = 'NASA | Calm Menstrual Health & Body Literacy';
const DEFAULT_DESCRIPTION = 'An evidence-grounded, privacy-first menstrual health platform with Rose & Berry design system and non-judgmental cycle education.';

/**
 * Updates document head metadata (title, meta description, Open Graph, canonical link)
 * for public discovery and accessibility without introducing SSR dependencies.
 */
export function updateDocumentMetadata({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
}: DocumentMetadataOptions): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const previousTitle = document.title;
  document.title = title ? `${title} | NASA` : DEFAULT_TITLE;

  // Helper to get or create a meta tag
  const setMetaTag = (attribute: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Set description
  setMetaTag('name', 'description', description || DEFAULT_DESCRIPTION);

  // Set Open Graph tags
  setMetaTag('property', 'og:title', title || DEFAULT_TITLE);
  setMetaTag('property', 'og:description', description || DEFAULT_DESCRIPTION);
  setMetaTag('property', 'og:type', ogType);

  if (canonicalUrl) {
    setMetaTag('property', 'og:url', canonicalUrl);

    // Canonical link tag
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }

  if (ogImage) {
    setMetaTag('property', 'og:image', ogImage);
  }

  // Cleanup function restores title
  return () => {
    document.title = previousTitle;
  };
}

/**
 * React hook to synchronize document title and SEO metadata with route/article state.
 */
export function useDocumentMetadata(options: DocumentMetadataOptions) {
  const { title, description, canonicalUrl, ogType, ogImage } = options;

  useEffect(() => {
    const cleanup = updateDocumentMetadata({ title, description, canonicalUrl, ogType, ogImage });
    return cleanup;
  }, [title, description, canonicalUrl, ogType, ogImage]);
}
