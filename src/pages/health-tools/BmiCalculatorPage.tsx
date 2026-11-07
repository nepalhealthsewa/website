import React, { useState } from 'react';
import { Calculator, RotateCcw, AlertCircle, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addBmiEntry } from '../../store/slices/toolsSlice';
import { SEO } from '../../components/common/SEO';

type UnitMode = 'metric' | 'imperial';

export const BmiCalculatorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.tools.bmiHistory);

  const [unit, setUnit] = useState<UnitMode>('metric');

  // Metric fields
  const [heightCm, setHeightCm] = useState<string>('170');
  const [weightKg, setWeightKg] = useState<string>('68');

  // Imperial fields
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('7');
  const [weightLbs, setWeightLbs] = useState<string>('150');

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    asianCategory: string;
    heightCm: number;
    weightKg: number;
  } | null>(null);

  const calculateBmi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    let hCm = 0;
    let wKg = 0;

    if (unit === 'metric') {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);

      if (isNaN(h) || h <= 50 || h > 260) {
        setError('Please enter a realistic height between 50 cm and 260 cm.');
        return;
      }
      if (isNaN(w) || w <= 10 || w > 350) {
        setError('Please enter a realistic weight between 10 kg and 350 kg.');
        return;
      }

      hCm = h;
      wKg = w;
    } else {
      const ft = parseFloat(heightFeet);
      const inches = parseFloat(heightInches || '0');
      const lbs = parseFloat(weightLbs);

      if (isNaN(ft) || ft < 2 || ft > 8) {
        setError('Please enter height feet between 2 and 8.');
        return;
      }
      if (isNaN(inches) || inches < 0 || inches >= 12) {
        setError('Inches must be between 0 and 11.9.');
        return;
      }
      if (isNaN(lbs) || lbs < 25 || lbs > 770) {
        setError('Please enter weight between 25 lbs and 770 lbs.');
        return;
      }

      const totalInches = ft * 12 + inches;
      hCm = totalInches * 2.54;
      wKg = lbs * 0.453592;
    }

    const heightM = hCm / 100;
    const rawBmi = wKg / (heightM * heightM);
    const bmiVal = Math.round(rawBmi * 10) / 10;

    // Standard WHO classifications
    let cat = 'Normal Weight';
    if (bmiVal < 18.5) cat = 'Underweight';
    else if (bmiVal < 25.0) cat = 'Normal Weight';
    else if (bmiVal < 30.0) cat = 'Overweight';
    else if (bmiVal < 35.0) cat = 'Obese (Class I)';
    else if (bmiVal < 40.0) cat = 'Obese (Class II)';
    else cat = 'Obese (Class III - Severe)';

    // WHO South Asian Specific Cutoff
    let asianCat = 'Healthy Weight';
    if (bmiVal < 18.5) asianCat = 'Underweight';
    else if (bmiVal < 23.0) asianCat = 'Healthy Weight (Asian Standards)';
    else if (bmiVal < 27.5) asianCat = 'Increased Cardiometabolic Risk (Asian Cutoff ≥ 23.0)';
    else asianCat = 'High Risk / Obese (Asian Cutoff ≥ 27.5)';

    const res = {
      bmi: bmiVal,
      category: cat,
      asianCategory: asianCat,
      heightCm: Math.round(hCm),
      weightKg: Math.round(wKg * 10) / 10,
    };

    setResult(res);
    dispatch(
      addBmiEntry({
        bmi: res.bmi,
        category: res.category,
        heightCm: res.heightCm,
        weightKg: res.weightKg,
      })
    );
  };

  const handleReset = () => {
    setHeightCm('170');
    setWeightKg('68');
    setHeightFeet('5');
    setHeightInches('7');
    setWeightLbs('150');
    setResult(null);
    setError(null);
  };

  // Helper for gauge percentage (range 12 to 42)
  const getGaugePercentage = (bmi: number) => {
    const clamped = Math.max(12, Math.min(42, bmi));
    return ((clamped - 12) / (42 - 12)) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Adult BMI Calculator with South Asian WHO Cutoffs"
        description="Calculate your Body Mass Index with Metric or Imperial units, WHO international standards, and South Asian ethnic risk cutoffs (≥23.0 overweight, ≥27.5 obese)."
        keywords="BMI calculator Nepal, body mass index calculator, Asian BMI cutoffs, healthy weight calculator Nepal, WHO BMI thresholds"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Adult Body Mass Index (BMI) Calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "description": "Calculates weight-to-height ratio with standard WHO international benchmarks and South Asian ethnic metabolic risk criteria."
        }}
      />
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-600 mb-1">
          <Calculator className="w-4 h-4" />
          <span>Anthropometric Screening</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Adult Body Mass Index (BMI) Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
          Calculates your weight-to-height ratio with standard WHO international benchmarks and South Asian ethnic metabolic risk criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Calculator Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Measurement System
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setUnit('metric')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  unit === 'metric'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Metric (cm / kg)
              </button>
              <button
                type="button"
                onClick={() => setUnit('imperial')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  unit === 'imperial'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Imperial (ft / lbs)
              </button>
            </div>
          </div>

          <form onSubmit={calculateBmi} className="space-y-5">
            {unit === 'metric' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Height (centimeters) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Typical range: 140 – 200 cm</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Weight (kilograms) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Typical range: 40 – 120 kg</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Height (Feet) *
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="8"
                      required
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inches (0–11)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Weight (Pounds / lbs) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-mono"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" size="lg" className="flex-1">
                Calculate Body Mass Index
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            </div>
          </form>

          {/* Result Card with Visual Gauge */}
          {result && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Your Calculated Result
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {result.bmi}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">kg/m²</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 block">Standard Category</span>
                    <span className="text-sm font-bold text-slate-900 px-3 py-1 bg-white rounded-md border border-slate-200 inline-block mt-0.5">
                      {result.category}
                    </span>
                  </div>
                </div>

                {/* Visual Gauge Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                    <div className="w-[21.6%] bg-blue-400" title="Underweight (<18.5)" />
                    <div className="w-[21.3%] bg-emerald-500" title="Normal (18.5-24.9)" />
                    <div className="w-[16.6%] bg-amber-400" title="Overweight (25-29.9)" />
                    <div className="flex-1 bg-rose-500" title="Obese (≥30)" />
                  </div>
                  {/* Gauge indicator marker */}
                  <div className="relative h-4">
                    <div
                      className="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${getGaugePercentage(result.bmi)}%` }}
                    >
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-900" />
                      <span className="text-[10px] font-mono font-bold text-slate-900">
                        ▲ {result.bmi}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Asian Population Threshold Context */}
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>WHO South Asian Risk Context:</span>
                  </div>
                  <p className="leading-relaxed">
                    Research on South Asian populations demonstrates higher percentage body fat and increased visceral fat at lower BMI values. The World Health Organization recommends considering <strong>BMI ≥ 23.0</strong> as overweight trigger and <strong>≥ 27.5</strong> as high risk for diabetes and hypertension in Asian adults.
                  </p>
                  <p className="font-semibold pt-1">
                    Your Asian classification: {result.asianCategory}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clinical Reference & Limitations Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              Standard Adult BMI Categories (WHO)
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/60 border border-blue-100">
                <span className="font-semibold text-blue-900">Underweight</span>
                <span className="font-mono text-blue-800">&lt; 18.5 kg/m²</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <span className="font-semibold text-emerald-900">Healthy Normal Weight</span>
                <span className="font-mono text-emerald-800">18.5 – 24.9 kg/m²</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                <span className="font-semibold text-amber-900">Overweight</span>
                <span className="font-mono text-amber-800">25.0 – 29.9 kg/m²</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                <span className="font-semibold text-rose-900">Obesity Class I</span>
                <span className="font-mono text-rose-800">30.0 – 34.9 kg/m²</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-rose-100/60 border border-rose-200">
                <span className="font-semibold text-rose-950">Obesity Class II & III</span>
                <span className="font-mono text-rose-900">≥ 35.0 kg/m²</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-slate-500" />
              <span>Limitations of Body Mass Index</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              While BMI is a useful population-level screening indicator, it has important individual limitations:
            </p>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
              <li><strong>Does not distinguish muscle from fat:</strong> Muscular athletes or manual laborers may register as overweight despite low body fat.</li>
              <li><strong>Ignores fat distribution:</strong> Abdominal (visceral) adiposity carries higher cardiac risk than subcutaneous fat on hips and limbs.</li>
              <li><strong>Age variations:</strong> Older adults naturally lose muscle mass and bone mineral density, which BMI alone does not capture.</li>
              <li><strong>Not applicable to children:</strong> Pediatric weight assessments require pediatric growth percentile charts, not adult BMI tables.</li>
            </ul>
          </Card>

          {history && history.length > 0 && (
            <Card className="p-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Recent Calculations
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                {history.slice(0, 4).map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                    <span>{h.date} ({h.weightKg} kg, {h.heightCm} cm)</span>
                    <span className="font-mono font-bold text-slate-900">{h.bmi} ({h.category})</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
