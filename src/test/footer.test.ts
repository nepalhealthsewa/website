import { describe, it, expect } from 'vitest';
import {
  BLOOD_GROUPS,
  EMERGENCY_HOTLINES,
  TRUST_PILLARS,
  OFFICIAL_SOCIAL_MEDIAS,
  OFFICIAL_WEBSITES,
  OFFICIAL_EMAIL,
} from '../components/layout/Footer';

describe('Footer Configuration & Safety Benchmarks', () => {
  it('defines all 8 standard ABO and Rh blood groups', () => {
    expect(BLOOD_GROUPS).toHaveLength(8);
    expect(BLOOD_GROUPS).toEqual(
      expect.arrayContaining(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    );
  });

  it('contains vital Nepal emergency hotlines with correct telephone schemes', () => {
    const ambulance = EMERGENCY_HOTLINES.find((h) => h.number === '102');
    expect(ambulance).toBeDefined();
    expect(ambulance?.tel).toBe('tel:102');
    expect(ambulance?.name).toContain('Ambulance');

    const police = EMERGENCY_HOTLINES.find((h) => h.number === '100');
    expect(police).toBeDefined();
    expect(police?.tel).toBe('tel:100');

    const bloodEmergency = EMERGENCY_HOTLINES.find((h) => h.number.includes('9845012345'));
    expect(bloodEmergency).toBeDefined();
    expect(bloodEmergency?.tel).toBe('tel:+9779845012345');

    const narayaniHospital = EMERGENCY_HOTLINES.find((h) => h.number === '051-521993');
    expect(narayaniHospital).toBeDefined();
    expect(narayaniHospital?.tel).toBe('tel:051521993');
  });

  it('guarantees essential trust pillars for non-profit integrity', () => {
    expect(TRUST_PILLARS.length).toBeGreaterThanOrEqual(4);
    const freePillar = TRUST_PILLARS.find((p) => p.title.includes('100% Free'));
    expect(freePillar).toBeDefined();

    const communityPillar = TRUST_PILLARS.find((p) => p.title.includes('Community Verified'));
    expect(communityPillar).toBeDefined();

    const clinicalPillar = TRUST_PILLARS.find((p) => p.title.includes('Clinical'));
    expect(clinicalPillar).toBeDefined();
  });

  it('includes all official social medias including GitHub configured with nepalhealthsewa username', () => {
    const platformIds = OFFICIAL_SOCIAL_MEDIAS.map((s) => s.id);
    expect(platformIds).toContain('youtube');
    expect(platformIds).toContain('instagram');
    expect(platformIds).toContain('facebook');
    expect(platformIds).toContain('twitter');
    expect(platformIds).toContain('linkedin');
    expect(platformIds).toContain('github');

    OFFICIAL_SOCIAL_MEDIAS.forEach((social) => {
      expect(social.username).toBe('nepalhealthsewa');
      expect(social.url).toContain('nepalhealthsewa');
      expect(social.url).toMatch(/^https:\/\//);
    });

    const yt = OFFICIAL_SOCIAL_MEDIAS.find((s) => s.id === 'youtube');
    expect(yt?.url).toBe('https://www.youtube.com/@nepalhealthsewa');

    const ig = OFFICIAL_SOCIAL_MEDIAS.find((s) => s.id === 'instagram');
    expect(ig?.url).toBe('https://www.instagram.com/nepalhealthsewa');

    const fb = OFFICIAL_SOCIAL_MEDIAS.find((s) => s.id === 'facebook');
    expect(fb?.url).toBe('https://www.facebook.com/nepalhealthsewa');

    const tw = OFFICIAL_SOCIAL_MEDIAS.find((s) => s.id === 'twitter');
    expect(tw?.url).toBe('https://twitter.com/nepalhealthsewa');

    const li = OFFICIAL_SOCIAL_MEDIAS.find((s) => s.id === 'linkedin');
    expect(li?.url).toBe('https://www.linkedin.com/in/nepalhealthsewa');

    const gh = OFFICIAL_SOCIAL_MEDIAS.find((s) => s.id === 'github');
    expect(gh?.url).toBe('https://github.com/nepalhealthsewa');
  });

  it('configures official website domains and official email', () => {
    expect(OFFICIAL_EMAIL).toBe('Nepalhealthsewa@gmail.com');
    expect(OFFICIAL_WEBSITES.length).toBe(3);

    const urls = OFFICIAL_WEBSITES.map((w) => w.url);
    expect(urls).toContain('https://nepalhealthsewa.com');
    expect(urls).toContain('https://nepalhealthsewa.netlify.app');
    expect(urls).toContain('https://nepalhealthsewa.pages.dev');

    const primary = OFFICIAL_WEBSITES.find((w) => w.isPrimary);
    expect(primary?.url).toBe('https://nepalhealthsewa.com');
  });
});
