import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Nepal Health Sewa is a dedicated healthcare and blood donation platform connecting voluntary donors, emergency medical services, oxygen supplies, and health utilities across Nepal.',
  keywords = 'Nepal Health Sewa, blood donation Nepal, blood bank Birgunj, donate blood save life, emergency oxygen Nepal, health calculators Nepal',
  image = '/img/logo.af0d533f.png',
  type = 'website',
  schema,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Dynamic document title
    const fullTitle = title
      ? `${title} | Nepal Health Sewa`
      : 'Nepal Health Sewa | Donate Blood, Save Life';
    document.title = fullTitle;

    // Helper to safely set meta tag content
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // 3. OpenGraph Social Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    const absoluteImage = image.startsWith('http')
      ? image
      : `${window.location.origin}${image}`;
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:url', window.location.href);

    // 4. Twitter Social Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@nepalhealthsewa');
    setMetaTag('name', 'twitter:creator', '@nepalhealthsewa');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteImage);

    // 5. Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('?')[0]);

    // 6. Optional Dynamic Page-Specific JSON-LD
    let scriptTag = document.getElementById('dynamic-page-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-page-schema';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, image, type, schema, location.pathname]);

  return null;
};
