import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SleepRecord } from '../../types';

interface ToolsState {
  sleepRecords: SleepRecord[];
  bmiHistory: Array<{
    id: string;
    date: string;
    bmi: number;
    category: string;
    heightCm: number;
    weightKg: number;
  }>;
  bpHistory: Array<{
    id: string;
    date: string;
    systolic: number;
    diastolic: number;
    category: string;
  }>;
}

const DEFAULT_SLEEP_RECORDS: SleepRecord[] = [
  { id: 'sl-1', date: '2025-02-18', bedTime: '23:00', wakeTime: '06:30', durationHours: 7.5, quality: 4, notes: 'Restful sleep, avoided late screens.' },
  { id: 'sl-2', date: '2025-02-19', bedTime: '23:30', wakeTime: '06:45', durationHours: 7.25, quality: 4, notes: 'Good energy morning.' },
  { id: 'sl-3', date: '2025-02-20', bedTime: '00:15', wakeTime: '06:30', durationHours: 6.25, quality: 3, notes: 'Slight morning drowsiness.' },
  { id: 'sl-4', date: '2025-02-21', bedTime: '22:45', wakeTime: '07:00', durationHours: 8.25, quality: 5, notes: 'Deep restorative recovery.' },
  { id: 'sl-5', date: '2025-02-22', bedTime: '23:15', wakeTime: '07:15', durationHours: 8.0, quality: 4, notes: 'Relaxing weekend sleep.' },
  { id: 'sl-6', date: '2025-02-23', bedTime: '23:30', wakeTime: '06:30', durationHours: 7.0, quality: 3, notes: 'Woke up early for community run.' },
  { id: 'sl-7', date: '2025-02-24', bedTime: '22:50', wakeTime: '06:40', durationHours: 7.8, quality: 5, notes: 'Felt refreshed and focused.' },
];

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal(key: string, data: unknown) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}

const initialState: ToolsState = {
  sleepRecords: loadLocal('nhs_sleep_records', DEFAULT_SLEEP_RECORDS),
  bmiHistory: loadLocal('nhs_bmi_history', []),
  bpHistory: loadLocal('nhs_bp_history', []),
};

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    addSleepRecord: (state, action: PayloadAction<Omit<SleepRecord, 'id'>>) => {
      const record: SleepRecord = {
        ...action.payload,
        id: `sleep-${Date.now()}`,
      };
      state.sleepRecords.unshift(record);
      saveLocal('nhs_sleep_records', state.sleepRecords);
    },
    deleteSleepRecord: (state, action: PayloadAction<string>) => {
      state.sleepRecords = state.sleepRecords.filter((r) => r.id !== action.payload);
      saveLocal('nhs_sleep_records', state.sleepRecords);
    },
    addBmiEntry: (state, action: PayloadAction<{ bmi: number; category: string; heightCm: number; weightKg: number }>) => {
      const entry = {
        id: `bmi-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...action.payload,
      };
      state.bmiHistory.unshift(entry);
      saveLocal('nhs_bmi_history', state.bmiHistory.slice(0, 20));
    },
    addBpEntry: (state, action: PayloadAction<{ systolic: number; diastolic: number; category: string }>) => {
      const entry = {
        id: `bp-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...action.payload,
      };
      state.bpHistory.unshift(entry);
      saveLocal('nhs_bp_history', state.bpHistory.slice(0, 20));
    },
  },
});

export const { addSleepRecord, deleteSleepRecord, addBmiEntry, addBpEntry } = toolsSlice.actions;

export default toolsSlice.reducer;
