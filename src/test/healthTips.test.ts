import { describe, it, expect } from 'vitest';
import { HEALTH_TIPS_DATA } from '../data/healthTipsData';

describe('Health Tips Knowledge Base Integrity', () => {
  it('contains comprehensive clinical tips across key domains in Nepal', () => {
    expect(HEALTH_TIPS_DATA.length).toBeGreaterThanOrEqual(15);

    const categories = new Set(HEALTH_TIPS_DATA.map((t) => t.category));
    expect(categories.has('Blood Donation')).toBe(true);
    expect(categories.has('Heart & BP')).toBe(true);
    expect(categories.has('Nutrition & Diet')).toBe(true);
    expect(categories.has('Seasonal & Vector')).toBe(true);
    expect(categories.has('Diabetes Care')).toBe(true);
    expect(categories.has('Respiratory & Air')).toBe(true);
    expect(categories.has('First Aid & Emergency')).toBe(true);
    expect(categories.has('Mental Health & Sleep')).toBe(true);
  });

  it('provides actionable Do lists and clinical medical basis for every tip', () => {
    HEALTH_TIPS_DATA.forEach((tip) => {
      expect(tip.id).toBeTruthy();
      expect(tip.title).toBeTruthy();
      expect(tip.summary).toBeTruthy();
      expect(tip.keyAction).toBeTruthy();
      expect(tip.doList.length).toBeGreaterThanOrEqual(2);
      expect(tip.medicalBasis).toBeTruthy();
      expect(tip.verifiedBy).toBeTruthy();
      expect(tip.tags.length).toBeGreaterThan(0);
      expect(tip.readTime).toMatch(/min read/);
    });
  });

  it('includes critical life-saving emergency first aid tips', () => {
    const snakebite = HEALTH_TIPS_DATA.find((t) =>
      t.title.toLowerCase().includes('snakebite')
    );
    expect(snakebite).toBeDefined();
    expect(snakebite?.keyAction.toLowerCase()).toContain('immobilize');

    const bleeding = HEALTH_TIPS_DATA.find((t) =>
      t.title.toLowerCase().includes('bleeding')
    );
    expect(bleeding).toBeDefined();
    expect(bleeding?.keyAction.toLowerCase()).toContain('direct pressure');

    const jeevanJal = HEALTH_TIPS_DATA.find((t) =>
      t.title.toLowerCase().includes('jeevan jal') || t.title.toLowerCase().includes('ors')
    );
    expect(jeevanJal).toBeDefined();
    expect(jeevanJal?.keyAction).toContain('ONE liter');
  });

  it('features blood donor pre-donation and post-donation care tips', () => {
    const preDonation = HEALTH_TIPS_DATA.find((t) =>
      t.category === 'Blood Donation' && t.title.toLowerCase().includes('hydration')
    );
    expect(preDonation).toBeDefined();
    expect(preDonation?.featured).toBe(true);
  });
});
