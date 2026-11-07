import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('SEO & Schema.org JSON-LD Metadata Verification', () => {
  it('contains expected social profiles in metadata.json', () => {
    const metadataPath = path.resolve(__dirname, '../../metadata.json');
    const content = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);

    expect(metadata.name).toBe('Nepal Health Sewa | Donate Blood, Save Life');
    expect(metadata.socialMedia).toBeDefined();
    expect(metadata.socialMedia.facebook).toBe('https://www.facebook.com/nepalhealthsewa');
    expect(metadata.socialMedia.instagram).toBe('https://www.instagram.com/nepalhealthsewa');
    expect(metadata.socialMedia.youtube).toBe('https://www.youtube.com/@nepalhealthsewa');
    expect(metadata.socialMedia.twitter).toBe('https://twitter.com/nepalhealthsewa');
    expect(metadata.socialMedia.linkedin).toBe('https://www.linkedin.com/in/nepalhealthsewa');
    expect(metadata.socialMedia.github).toBe('https://github.com/nepalhealthsewa');

    expect(metadata.website).toBe('https://nepalhealthsewa.com');
    expect(metadata.websites).toEqual(
      expect.arrayContaining([
        'https://nepalhealthsewa.com',
        'https://nepalhealthsewa.netlify.app',
        'https://nepalhealthsewa.pages.dev',
      ])
    );
    expect(metadata.email).toBe('Nepalhealthsewa@gmail.com');

    expect(metadata.sameAs).toEqual(
      expect.arrayContaining([
        'https://nepalhealthsewa.com',
        'https://nepalhealthsewa.netlify.app',
        'https://nepalhealthsewa.pages.dev',
        'https://www.facebook.com/nepalhealthsewa',
        'https://www.instagram.com/nepalhealthsewa',
        'https://www.youtube.com/@nepalhealthsewa',
        'https://twitter.com/nepalhealthsewa',
        'https://www.linkedin.com/in/nepalhealthsewa',
        'https://github.com/nepalhealthsewa',
      ])
    );
  });

  it('contains valid Schema.org JSON-LD and updated head tags in index.html', () => {
    const indexPath = path.resolve(__dirname, '../../index.html');
    const html = fs.readFileSync(indexPath, 'utf-8');

    // Verify twitter tags
    expect(html).toContain('<meta name="twitter:site" content="@nepalhealthsewa" />');
    expect(html).toContain('<meta name="twitter:creator" content="@nepalhealthsewa" />');

    // Extract JSON-LD script
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).toBeTruthy();

    if (jsonLdMatch) {
      const parsed = JSON.parse(jsonLdMatch[1]);
      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@graph']).toBeDefined();

      const org = parsed['@graph'].find((item: { '@type': string }) => item['@type'] === 'MedicalOrganization');
      expect(org).toBeDefined();
      expect(org.url).toBe('https://nepalhealthsewa.com/');
      expect(org.email).toBe('Nepalhealthsewa@gmail.com');
      expect(org.sameAs).toEqual(
        expect.arrayContaining([
          'https://nepalhealthsewa.com',
          'https://nepalhealthsewa.netlify.app',
          'https://nepalhealthsewa.pages.dev',
          'https://www.facebook.com/nepalhealthsewa',
          'https://www.instagram.com/nepalhealthsewa',
          'https://www.youtube.com/@nepalhealthsewa',
          'https://twitter.com/nepalhealthsewa',
          'https://www.linkedin.com/in/nepalhealthsewa',
          'https://github.com/nepalhealthsewa',
        ])
      );
    }
  });
});
