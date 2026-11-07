import React, { useState } from 'react';
import {
  HeartPulse,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  Info,
  CheckCircle2,
  PhoneCall,
  Activity,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addBpEntry } from '../../store/slices/toolsSlice';
import { SEO } from '../../components/common/SEO';

export const BloodPressurePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const bpHistory = useAppSelector((state) => state.tools.bpHistory);

  const [systolic, setSystolic] = useState<string>('122');
  const [diastolic, setDiastolic] = useState<string>('78');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    systolic: number;
    diastolic: number;
    stage: string;
    description: string;
    color: string;
    isCrisis: boolean;
    recommendation: string;
  } | null>(null);

  const evaluateBp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const sys = parseInt(systolic, 10);
    const dia = parseInt(diastolic, 10);

    if (isNaN(sys) || sys < 60 || sys > 260) {
      setError('Please enter a realistic Systolic reading between 60 and 260 mmHg.');
      return;
    }

    if (isNaN(dia) || dia < 40 || dia > 150) {
      setError('Please enter a realistic Diastolic reading between 40 and 150 mmHg.');
      return;
    }

    if (sys <= dia) {
      setError('Systolic (top number) must be higher than Diastolic (bottom number).');
      return;
    }

    let stage = 'Normal';
    let desc = '';
    let color = 'emerald';
    let isCrisis = false;
    let rec = '';

    if (sys > 180 || dia > 120) {
      stage = 'Hypertensive Crisis (Emergency Evaluation Required)';
      desc = 'Extremely high blood pressure reading that poses acute risk of cardiovascular or neurological damage.';
      color = 'rose';
      isCrisis = true;
      rec = 'Wait 5 minutes and re-check. If still above 180 and/or 120 mmHg, seek immediate emergency medical care or call 102. If accompanied by chest pain, shortness of breath, blurry vision, or numbness, do not wait—go to the nearest emergency room immediately.';
    } else if (sys >= 140 || dia >= 90) {
      stage = 'Stage 2 Hypertension';
      desc = 'Blood pressure is consistently in the high range requiring clinical evaluation by a medical doctor.';
      color = 'red';
      rec = 'Consult a registered medical doctor or primary health care center. Evaluation may include 24-hour ambulatory monitoring, lifestyle adjustments (low sodium diet, exercise), and antihypertensive medication.';
    } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      stage = 'Stage 1 Hypertension';
      desc = 'Blood pressure is slightly elevated above optimal limits, indicating vascular resistance.';
      color = 'amber';
      rec = 'Schedule an appointment with a healthcare professional to confirm readings across multiple days. Implement dietary changes (< 5g salt daily), stress management, and physical activity.';
    } else if (sys >= 120 && sys <= 129 && dia < 80) {
      stage = 'Elevated Blood Pressure';
      desc = 'Blood pressure is slightly higher than normal and likely to turn into hypertension without lifestyle changes.';
      color = 'blue';
      rec = 'Adopt heart-healthy lifestyle habits: reduce processed sodium, avoid smoking, increase potassium-rich fresh fruits and vegetables, and re-check within 3 to 6 months.';
    } else {
      stage = 'Normal Blood Pressure';
      desc = 'Blood pressure is in the optimal clinical range (< 120/< 80 mmHg).';
      color = 'emerald';
      rec = 'Maintain your healthy balanced lifestyle, regular physical activity, and continue annual routine blood pressure screenings.';
    }

    const evalResult = {
      systolic: sys,
      diastolic: dia,
      stage,
      description: desc,
      color,
      isCrisis,
      recommendation: rec,
    };

    setResult(evalResult);
    dispatch(
      addBpEntry({
        systolic: sys,
        diastolic: dia,
        category: stage,
      })
    );
  };

  const handleReset = () => {
    setSystolic('120');
    setDiastolic('80');
    setError(null);
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Blood Pressure Stage Evaluator | AHA/ACC & Nepal MoHP"
        description="Evaluate resting systolic and diastolic blood pressure readings with clinical AHA/ACC & Nepal MoHP staging, lifestyle advice, and crisis warning alerts."
        keywords="blood pressure calculator Nepal, hypertension stage evaluator, high blood pressure checker, AHA blood pressure categories, Nepal MoHP PEN guidelines"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Blood Pressure Stage Evaluator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "description": "Clinical evaluator for resting systolic and diastolic blood pressure with emergency crisis alerts."
        }}
      />
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
          <HeartPulse className="w-4 h-4" />
          <span>Cardiovascular Awareness Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Blood Pressure Stage Evaluator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
          Based on the AHA/ACC and Nepal Ministry of Health & Population (PEN guidelines) for adult blood pressure classifications.
        </p>
      </div>

      {/* Prominent Safety Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Important Clinical Context:</strong> A single reading from a digital monitor does NOT constitute a diagnosis of hypertension. Blood pressure fluctuates with stress, caffeine, physical exertion, pain, and time of day. Clinical diagnosis requires multiple validated readings taken over several days in a resting state under physician guidance.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            Enter Your Resting Blood Pressure Reading
          </h2>

          <form onSubmit={evaluateBp} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Systolic (Top Number - mmHg) *
                </label>
                <input
                  type="number"
                  min="60"
                  max="260"
                  required
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-mono text-lg font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Normal: &lt; 120 mmHg</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diastolic (Bottom Number - mmHg) *
                </label>
                <input
                  type="number"
                  min="40"
                  max="150"
                  required
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-500 font-mono text-lg font-bold"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Normal: &lt; 80 mmHg</span>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" size="lg" className="flex-1">
                Evaluate Blood Pressure
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            </div>
          </form>

          {/* Evaluation Result */}
          {result && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div
                className={`p-6 rounded-xl border ${
                  result.isCrisis
                    ? 'bg-rose-50 border-rose-300 text-rose-950'
                    : result.color === 'red'
                    ? 'bg-red-50 border-red-200 text-red-950'
                    : result.color === 'amber'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : result.color === 'blue'
                    ? 'bg-blue-50 border-blue-200 text-blue-950'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                } space-y-4`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold opacity-75">
                      Reading Evaluation
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5 font-mono text-3xl font-extrabold">
                      <span>{result.systolic}</span>
                      <span className="text-slate-400 font-normal">/</span>
                      <span>{result.diastolic}</span>
                      <span className="text-xs font-normal opacity-75">mmHg</span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                      result.isCrisis
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-white text-slate-900 border-slate-200'
                    }`}
                  >
                    {result.stage}
                  </span>
                </div>

                <p className="text-xs leading-relaxed">{result.description}</p>

                <div className="p-3 bg-white/80 rounded-lg border border-slate-200/60 text-xs text-slate-800 space-y-1">
                  <strong>Recommended Next Steps:</strong>
                  <p className="leading-relaxed">{result.recommendation}</p>
                </div>

                {result.isCrisis && (
                  <div className="p-4 bg-rose-600 text-white rounded-lg flex items-center justify-between gap-4">
                    <div className="text-xs leading-relaxed">
                      <strong>Danger Warning:</strong> If you or the patient has chest tightness, breathlessness, blurred vision, or speech difficulty, dial emergency services immediately.
                    </div>
                    <a
                      href="tel:102"
                      className="px-4 py-2 bg-white text-rose-700 font-bold text-xs rounded-md shadow-xs hover:bg-rose-50 whitespace-nowrap shrink-0 flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call 102</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clinical Guidelines Reference Table */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              Blood Pressure Categories (AHA / ACC Guideline)
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Normal</div>
                  <div className="text-[11px] text-emerald-700">&lt; 120 and &lt; 80 mmHg</div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800">Optimal</span>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-900">Elevated</div>
                  <div className="text-[11px] text-blue-700">120–129 and &lt; 80 mmHg</div>
                </div>
                <span className="text-[11px] font-semibold text-blue-800">Pre-hypertension</span>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">Hypertension Stage 1</div>
                  <div className="text-[11px] text-amber-700">130–139 or 80–89 mmHg</div>
                </div>
                <span className="text-[11px] font-semibold text-amber-800">Doctor visit advised</span>
              </div>

              <div className="p-2.5 rounded-lg bg-red-50 border border-red-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-900">Hypertension Stage 2</div>
                  <div className="text-[11px] text-red-700">≥ 140 or ≥ 90 mmHg</div>
                </div>
                <span className="text-[11px] font-semibold text-red-800">Prompt medical care</span>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-950">Hypertensive Crisis</div>
                  <div className="text-[11px] text-rose-800">&gt; 180 and/or &gt; 120 mmHg</div>
                </div>
                <span className="text-[11px] font-bold text-rose-900">Urgent Emergency</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <span>How to Measure Accurately at Home</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
              <li>Rest quietly for at least 5 minutes in a seated position before measuring.</li>
              <li>Avoid tea, coffee, smoking, or exercise for 30 minutes prior.</li>
              <li>Sit with back straight, feet flat on the floor, arm supported at heart level.</li>
              <li>Take 2 readings 1 minute apart and record the average.</li>
            </ul>
          </Card>

          {bpHistory && bpHistory.length > 0 && (
            <Card className="p-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Recent Blood Pressure Entries
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                {bpHistory.slice(0, 4).map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                    <span>{h.date}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {h.systolic}/{h.diastolic} mmHg ({h.category.split(' ')[0]})
                    </span>
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
