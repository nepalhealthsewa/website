import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

export const SeoHead: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage = '/img/logo.339ea3d3.jpg',
  schema,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('Nepal Health Sewa')
      ? title
      : `${title} | Nepal Health Sewa`;
    document.title = formattedTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 3. Set standard SEO and OpenGraph tags
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    setMeta('og:title', formattedTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', window.location.origin + location.pathname, true);
    setMeta('og:image', window.location.origin + ogImage, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', formattedTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', window.location.origin + ogImage);

    // 4. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + location.pathname);

    // 5. Inject Structured JSON-LD if provided
    let scriptElement = document.getElementById('route-schema-jsonld') as HTMLScriptElement | null;
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = 'route-schema-jsonld';
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [title, description, keywords, ogType, ogImage, schema, location.pathname]);

  return null;
};
