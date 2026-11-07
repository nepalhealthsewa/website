import { describe, it, expect } from 'vitest';
import { MEDICAL_SERVICES_CONTACTS } from '../data/medicalContactsData';

describe('Medical Services Directory Data Integrity', () => {
  it('contains comprehensive medical services across all 5 key categories', () => {
    expect(MEDICAL_SERVICES_CONTACTS.length).toBeGreaterThanOrEqual(35);

    const categories = new Set(MEDICAL_SERVICES_CONTACTS.map((c) => c.category));
    expect(categories.has('Hospital')).toBe(true);
    expect(categories.has('Blood Bank')).toBe(true);
    expect(categories.has('Emergency Sewa')).toBe(true);
    expect(categories.has('Ambulance')).toBe(true);
    expect(categories.has('Oxygen & Critical Care')).toBe(true);
  });

  it('covers major cities from all provinces across Nepal', () => {
    const cities = new Set(MEDICAL_SERVICES_CONTACTS.map((c) => c.city));
    expect(cities.has('Birgunj')).toBe(true);
    expect(cities.has('Kalaiya')).toBe(true);
    expect(cities.has('Janakpurdham')).toBe(true);
    expect(cities.has('Biratnagar')).toBe(true);
    expect(cities.has('Dharan')).toBe(true);
    expect(cities.has('Kathmandu')).toBe(true);
    expect(cities.has('Pokhara')).toBe(true);
    expect(cities.has('Butwal')).toBe(true);
    expect(cities.has('Nepalgunj')).toBe(true);
    expect(cities.has('Birendranagar')).toBe(true);
    expect(cities.has('Dhangadhi')).toBe(true);
  });

  it('includes key Birgunj & Parsa regional referral anchors', () => {
    const narayani = MEDICAL_SERVICES_CONTACTS.find((c) =>
      c.name.toLowerCase().includes('narayani')
    );
    expect(narayani).toBeDefined();
    expect(narayani?.primaryPhone).toBe('051-521993');
    expect(narayani?.is24x7).toBe(true);

    const parsaBlood = MEDICAL_SERVICES_CONTACTS.find((c) =>
      c.name.toLowerCase().includes('parsa district blood bank')
    );
    expect(parsaBlood).toBeDefined();
    expect(parsaBlood?.primaryPhone).toBe('051-522137');

    const healthSewa = MEDICAL_SERVICES_CONTACTS.find((c) =>
      c.name.toLowerCase().includes('nepal health sewa')
    );
    expect(healthSewa).toBeDefined();
    expect(healthSewa?.primaryPhone).toContain('9845012345');
  });

  it('includes national life-saving emergency hotlines with tel links', () => {
    const ambulance102 = MEDICAL_SERVICES_CONTACTS.find((c) => c.primaryPhone === '102');
    expect(ambulance102).toBeDefined();
    expect(ambulance102?.tel).toBe('tel:102');

    const police100 = MEDICAL_SERVICES_CONTACTS.find((c) => c.primaryPhone === '100');
    expect(police100).toBeDefined();
    expect(police100?.tel).toBe('tel:100');

    const fire101 = MEDICAL_SERVICES_CONTACTS.find((c) => c.primaryPhone === '101');
    expect(fire101).toBeDefined();
    expect(fire101?.tel).toBe('tel:101');
  });

  it('guarantees all entries have non-empty address, city, district and capabilities', () => {
    MEDICAL_SERVICES_CONTACTS.forEach((contact) => {
      expect(contact.id).toBeTruthy();
      expect(contact.name).toBeTruthy();
      expect(contact.primaryPhone).toBeTruthy();
      expect(contact.tel).toMatch(/^tel:/);
      expect(contact.address).toBeTruthy();
      expect(contact.district).toBeTruthy();
      expect(contact.city).toBeTruthy();
      expect(contact.capabilities.length).toBeGreaterThan(0);
    });
  });
});
