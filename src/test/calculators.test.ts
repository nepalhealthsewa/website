import { describe, it, expect } from 'vitest';
import uiReducer, { setSelectedBloodGroup, toggleMobileMenu } from '../store/slices/uiSlice';
import toolsReducer, { addSleepRecord, addBmiEntry } from '../store/slices/toolsSlice';

describe('Health Calculators Unit Tests', () => {
  describe('BMI Calculations', () => {
    it('calculates BMI correctly for standard metric inputs', () => {
      const heightCm = 175;
      const weightKg = 70;
      const heightM = heightCm / 100;
      const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
      expect(bmi).toBe(22.9);
    });

    it('classifies standard WHO adult BMI categories accurately', () => {
      const getCategory = (bmi: number) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25.0) return 'Normal Weight';
        if (bmi < 30.0) return 'Overweight';
        return 'Obese';
      };

      expect(getCategory(17.2)).toBe('Underweight');
      expect(getCategory(22.5)).toBe('Normal Weight');
      expect(getCategory(27.4)).toBe('Overweight');
      expect(getCategory(32.1)).toBe('Obese');
    });

    it('identifies WHO South Asian specific risk cutoff at 23.0', () => {
      const isAsianElevatedRisk = (bmi: number) => bmi >= 23.0;
      expect(isAsianElevatedRisk(22.5)).toBe(false);
      expect(isAsianElevatedRisk(23.2)).toBe(true);
    });
  });

  describe('Blood Pressure Staging', () => {
    const classifyBp = (sys: number, dia: number) => {
      if (sys > 180 || dia > 120) return 'Hypertensive Crisis';
      if (sys >= 140 || dia >= 90) return 'Stage 2 Hypertension';
      if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return 'Stage 1 Hypertension';
      if (sys >= 120 && sys <= 129 && dia < 80) return 'Elevated';
      return 'Normal';
    };

    it('classifies normal blood pressure', () => {
      expect(classifyBp(116, 76)).toBe('Normal');
    });

    it('classifies elevated blood pressure', () => {
      expect(classifyBp(124, 76)).toBe('Elevated');
    });

    it('classifies Stage 1 Hypertension', () => {
      expect(classifyBp(132, 82)).toBe('Stage 1 Hypertension');
      expect(classifyBp(126, 84)).toBe('Stage 1 Hypertension');
    });

    it('classifies Stage 2 Hypertension', () => {
      expect(classifyBp(144, 92)).toBe('Stage 2 Hypertension');
    });

    it('triggers crisis alert for readings exceeding 180/120', () => {
      expect(classifyBp(185, 110)).toBe('Hypertensive Crisis');
      expect(classifyBp(160, 124)).toBe('Hypertensive Crisis');
    });
  });

  describe('Sleep Duration Calculation', () => {
    const calculateSleepDuration = (start: string, end: string): number => {
      const [startH, startM] = start.split(':').map(Number);
      const [endH, endM] = end.split(':').map(Number);
      let startMinutes = startH * 60 + startM;
      let endMinutes = endH * 60 + endM;
      if (endMinutes <= startMinutes) {
        endMinutes += 24 * 60;
      }
      return Math.round(((endMinutes - startMinutes) / 60) * 10) / 10;
    };

    it('calculates duration correctly across midnight', () => {
      expect(calculateSleepDuration('23:00', '07:00')).toBe(8.0);
      expect(calculateSleepDuration('23:30', '06:45')).toBe(7.3);
      expect(calculateSleepDuration('00:15', '07:15')).toBe(7.0);
    });

    it('calculates same-day sleep correctly', () => {
      expect(calculateSleepDuration('13:00', '14:30')).toBe(1.5);
    });
  });

  describe('Redux Reducers', () => {
    it('handles uiSlice state updates', () => {
      const state1 = uiReducer(undefined, setSelectedBloodGroup('B+'));
      expect(state1.selectedBloodGroup).toBe('B+');

      const state2 = uiReducer(state1, toggleMobileMenu());
      expect(state2.mobileMenuOpen).toBe(true);
    });

    it('handles toolsSlice sleep recording', () => {
      const initialState = {
        sleepRecords: [],
        bmiHistory: [],
        bpHistory: [],
      };
      const state = toolsReducer(
        initialState,
        addSleepRecord({
          date: '2025-02-24',
          bedTime: '23:00',
          wakeTime: '07:00',
          durationHours: 8,
          quality: 5,
        })
      );
      expect(state.sleepRecords.length).toBe(1);
      expect(state.sleepRecords[0].durationHours).toBe(8);
    });
  });
});
