import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Info,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSleepRecord, deleteSleepRecord } from '../../store/slices/toolsSlice';
import { SEO } from '../../components/common/SEO';

export const SleepTrackerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const sleepRecords = useAppSelector((state) => state.tools.sleepRecords);

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bedTime, setBedTime] = useState<string>('23:00');
  const [wakeTime, setWakeTime] = useState<string>('06:45');
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [notes, setNotes] = useState<string>('');

  // Calculate duration correctly across midnight
  const calculateDuration = (start: string, end: string): number => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    let startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    // Overnight crossover check
    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }

    const diffMinutes = endMinutes - startMinutes;
    return Math.round((diffMinutes / 60) * 10) / 10;
  };

  const currentDuration = calculateDuration(bedTime, wakeTime);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bedTime || !wakeTime) {
      toast.error('Please enter both bedtime and wake-up time.');
      return;
    }

    const duration = calculateDuration(bedTime, wakeTime);
    if (duration <= 0 || duration > 24) {
      toast.error('Invalid sleep duration. Please check your times.');
      return;
    }

    dispatch(
      addSleepRecord({
        date,
        bedTime,
        wakeTime,
        durationHours: duration,
        quality,
        notes: notes.trim() || undefined,
      })
    );

    toast.success(`Logged ${duration} hours of sleep for ${date}`);
    setNotes('');
  };

  // Prepare chart data (chronological order)
  const chartData = [...sleepRecords]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map((r) => ({
      date: r.date.slice(5),
      hours: r.durationHours,
      quality: r.quality,
    }));

  const averageHours =
    sleepRecords.length > 0
      ? Math.round(
          (sleepRecords.reduce((acc, r) => acc + r.durationHours, 0) /
            sleepRecords.length) *
            10
        ) / 10
      : 0;

  const sleepDebt = Math.round((averageHours - 8.0) * 10) / 10;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Sleep Duration & Debt Tracker | Weekly Recovery Trends"
        description="Track bedtime and wake-up times across midnight, calculate sleep debt compared to 8-hour clinical benchmarks, and visualize sleep trends."
        keywords="sleep tracker Nepal, sleep duration calculator, sleep debt tracker, calculate sleep hours across midnight, sleep hygiene tips"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Sleep Duration & Recovery Tracker",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "description": "Calculates overnight sleep intervals and visualizes weekly rest patterns."
        }}
      />
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          <Moon className="w-4 h-4" />
          <span>Rest & Recovery Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sleep Duration & Recovery Tracker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
          Accurately calculate sleep duration across midnight, evaluate sleep debt compared to clinical recommendations (7–9 hours for adults), and monitor sleep quality trends.
        </p>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Average Sleep Duration</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {averageHours} hrs
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Target: 7.0 – 9.0 hrs nightly</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Sleep Balance vs 8hr Baseline</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div
            className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
              sleepDebt >= 0 ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {sleepDebt >= 0 ? `+${sleepDebt}h surplus` : `${sleepDebt}h debt`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Average difference per night</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Logged Entries</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {sleepRecords.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Saved locally in browser</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-600" />
            <span>Log Night's Sleep</span>
          </h2>

          <form onSubmit={handleAddEntry} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sleep Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Bedtime *</span>
                </label>
                <input
                  type="time"
                  required
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Wake-Up Time *</span>
                </label>
                <input
                  type="time"
                  required
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Live Calculated Duration Preview */}
            <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg flex items-center justify-between text-xs text-indigo-950">
              <span className="font-medium">Calculated Duration:</span>
              <span className="font-mono font-bold text-sm text-indigo-700">
                {currentDuration} hours
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sleep Quality Rating (1–5 Stars)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setQuality(star as 1 | 2 | 3 | 4 | 5)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      quality === star
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Avoided caffeine after 2pm, woke up feeling fresh"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full bg-indigo-600 hover:bg-indigo-700">
              Save Sleep Entry
            </Button>
          </form>
        </div>

        {/* Visual Chart and Logs Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recharts Bar Chart */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Weekly Sleep Trends (Hours)</span>
              <span className="text-[11px] text-slate-400 font-normal">7–9 hr optimal range indicated</span>
            </h3>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 12]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(val) => [`${val} hrs`, 'Duration']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <ReferenceLine y={7} stroke="#059669" strokeDasharray="3 3" label={{ value: 'Min (7h)', position: 'insideBottomRight', fontSize: 10, fill: '#059669' }} />
                  <ReferenceLine y={9} stroke="#059669" strokeDasharray="3 3" label={{ value: 'Max (9h)', position: 'insideTopRight', fontSize: 10, fill: '#059669' }} />
                  <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent Entries List */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Sleep History Log
            </h3>
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {sleepRecords.map((rec) => (
                <div key={rec.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-800">
                      {rec.date} · <span className="font-mono text-indigo-700">{rec.durationHours} hrs</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {rec.bedTime} to {rec.wakeTime} · Quality: {rec.quality}/5 ★
                      {rec.notes ? ` · "${rec.notes}"` : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(deleteSleepRecord(rec.id))}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-sm transition-colors cursor-pointer"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Sleep Hygiene Tips */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <strong className="text-slate-900 block font-bold">
              Evidence-Based Sleep Hygiene Tips (National Sleep Foundation):
            </strong>
            <ul className="space-y-1 list-disc list-inside">
              <li>Maintain a consistent bedtime and wake-up time, including on weekends.</li>
              <li>Turn off smartphone and computer screens at least 60 minutes before bed.</li>
              <li>Keep your bedroom dark, quiet, and cool (around 18–20°C).</li>
              <li>Expose your eyes to natural morning sunlight within 30 minutes of waking.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
