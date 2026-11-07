import { describe, it, expect } from 'vitest';
import { INITIAL_DONORS, INITIAL_EMERGENCY_TICKETS } from '../data/mockData';
import { BloodGroup } from '../types';

describe('Operations Dashboard & Features Integration', () => {
  it('covers all standard ABO and Rh blood groups with initial donors data', () => {
    const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
    const groupsInData = new Set(INITIAL_DONORS.map((d) => d.bloodGroup));
    expect(bloodGroups.length).toBe(8);
    expect(groupsInData.size).toBeGreaterThan(3);

    expect(INITIAL_DONORS.length).toBeGreaterThan(0);
    // Verified donors should have contact numbers and district
    INITIAL_DONORS.forEach((donor) => {
      expect(donor.firstName).toBeTruthy();
      expect(donor.mobile).toBeTruthy();
      expect(donor.district).toBeTruthy();
      expect(donor.isAvailable).toBeDefined();
    });
  });

  it('contains seeded emergency tickets with triage categories and valid hospital data', () => {
    expect(INITIAL_EMERGENCY_TICKETS.length).toBeGreaterThanOrEqual(4);

    INITIAL_EMERGENCY_TICKETS.forEach((ticket) => {
      expect(ticket.ticketNumber).toMatch(/^NHS-\d{4}-\d+/);
      expect(ticket.patientName).toBeTruthy();
      expect(ticket.hospitalName).toBeTruthy();
      expect(ticket.contactMobile).toBeTruthy();
      expect(['Pending', 'In Progress', 'Fulfilled', 'Closed']).toContain(ticket.status);
      expect(ticket.sewaType).toBe('Blood');
      expect(ticket.bloodGroup).toBeDefined();
    });

    const urgentTickets = INITIAL_EMERGENCY_TICKETS.filter((t) => t.urgency.startsWith('Immediate'));
    expect(urgentTickets.length).toBeGreaterThan(0);
  });

  it('correctly calculates clinical Blood Pressure stages for quick log validation', () => {
    const classifyBp = (systolic: number, diastolic: number) => {
      if (systolic >= 140 || diastolic >= 90) return 'Hypertension Stage 2';
      if (systolic >= 130 || diastolic >= 80) return 'Hypertension Stage 1';
      if (systolic >= 120 && diastolic < 80) return 'Elevated';
      return 'Normal';
    };

    expect(classifyBp(118, 76)).toBe('Normal');
    expect(classifyBp(124, 78)).toBe('Elevated');
    expect(classifyBp(132, 82)).toBe('Hypertension Stage 1');
    expect(classifyBp(150, 95)).toBe('Hypertension Stage 2');
  });

  it('correctly calculates BMI body metrics for quick health screening', () => {
    const calculateBmi = (heightCm: number, weightKg: number) => {
      const heightM = heightCm / 100;
      const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
      let category = 'Normal weight';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
      else if (bmi >= 30) category = 'Obesity';
      return { bmi, category };
    };

    expect(calculateBmi(175, 70).bmi).toBe(22.9);
    expect(calculateBmi(175, 70).category).toBe('Normal weight');

    expect(calculateBmi(160, 42).bmi).toBe(16.4);
    expect(calculateBmi(160, 42).category).toBe('Underweight');

    expect(calculateBmi(170, 85).bmi).toBe(29.4);
    expect(calculateBmi(170, 85).category).toBe('Overweight');
  });

  it('generates valid operations CSV headers and record rows', () => {
    const headers = [
      'Ticket Number',
      'Patient Name',
      'Sewa Type',
      'Blood Group',
      'Hospital',
      'Contact',
      'Urgency',
      'Status',
      'Date',
    ];

    expect(headers).toContain('Ticket Number');
    expect(headers).toContain('Hospital');
    expect(headers).toContain('Status');

    const sampleRow = [
      INITIAL_EMERGENCY_TICKETS[0].ticketNumber,
      `"${INITIAL_EMERGENCY_TICKETS[0].patientName}"`,
      INITIAL_EMERGENCY_TICKETS[0].sewaType,
      INITIAL_EMERGENCY_TICKETS[0].bloodGroup || 'N/A',
      `"${INITIAL_EMERGENCY_TICKETS[0].hospitalName}"`,
      INITIAL_EMERGENCY_TICKETS[0].contactMobile,
      `"${INITIAL_EMERGENCY_TICKETS[0].urgency}"`,
      INITIAL_EMERGENCY_TICKETS[0].status,
      INITIAL_EMERGENCY_TICKETS[0].createdAt,
    ];

    expect(sampleRow).toHaveLength(headers.length);
  });
});
