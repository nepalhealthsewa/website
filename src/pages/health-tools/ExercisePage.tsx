import React, { useState } from 'react';
import {
  Dumbbell,
  Heart,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { SEO } from '../../components/common/SEO';

type AgeGroup = 'adults' | 'older-adults' | 'youth';

export const ExercisePage: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('adults');

  const ageData = {
    adults: {
      title: 'Adults Aged 18–64 Years',
      aerobic: 'At least 150–300 minutes of moderate-intensity aerobic activity per week (or 75–150 minutes of vigorous-intensity).',
      strength: 'Muscle-strengthening activities involving major muscle groups on 2 or more days a week.',
      sedentary: 'Limit the amount of time spent sitting. Replacing sedentary time with any physical activity provides health benefits.',
      nepaliExamples: [
        'Brisk walking for 30 minutes 5 days a week (around local chowks, parks, or open fields).',
        'Traditional yoga asanas (Surya Namaskar 5–10 rounds) combined with pranayama.',
        'Bodyweight resistance: Squats, push-ups, lunges, and plank holds at home.',
        'Cycling or commuting actively instead of motorbikes for short distances under 2 km.',
      ],
    },
    'older-adults': {
      title: 'Older Adults Aged 65+ Years',
      aerobic: 'Same 150 minutes moderate aerobic activity weekly as adult guidelines, adapted to physical capacity.',
      strength: 'Multicomponent physical activity emphasizing functional balance and strength training on 3 or more days a week.',
      sedentary: 'Reduces risk of falls and fall-related injuries, helping maintain functional independence.',
      nepaliExamples: [
        'Morning gentle walking on flat surfaces in comfortable supportive footwear.',
        'Chair sits-to-stands to maintain quadriceps and hip strength.',
        'Gentle joint mobility exercises (neck rolls, ankle rotations, shoulder circles).',
        'Balance training: Heel-to-toe walking, standing on one leg near a wall or chair support.',
      ],
    },
    youth: {
      title: 'Children & Adolescents (Aged 5–17 Years)',
      aerobic: 'At least 60 minutes per day of moderate-to-vigorous intensity physical activity across the week.',
      strength: 'Vigorous-intensity aerobic activities and bone/muscle strengthening on at least 3 days a week.',
      sedentary: 'Limit recreational screen time (TV, mobile gaming) to under 2 hours daily.',
      nepaliExamples: [
        'Active outdoor playground games (football, cricket, skipping, tag).',
        'Brisk walking or cycling to school safely.',
        'Running, climbing, and structured sports teams.',
      ],
    },
  };

  const current = ageData[selectedAge];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Physical Activity & Exercise Benchmarks (WHO Guidelines)"
        description="WHO physical activity recommendations across age groups (youth, adults, seniors) with practical community routines tailored for Nepal."
        keywords="exercise guidelines Nepal, physical activity benchmarks WHO, daily exercise recommendations, walking routine Nepal"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Physical Activity & Exercise Benchmarks",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "description": "Evidence-based physical activity targets by age category with practical local routines."
        }}
      />
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
          <Dumbbell className="w-4 h-4" />
          <span>Physical Activity Benchmarks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Physical Activity & Exercise Guidance
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
          Based on the World Health Organization (WHO) Global Recommendations on Physical Activity for Health, tailored to daily Nepali community lifestyle habits.
        </p>
      </div>

      {/* Age Group Selector Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 max-w-lg">
        {[
          { id: 'adults', label: 'Adults (18–64)' },
          { id: 'older-adults', label: 'Older Adults (65+)' },
          { id: 'youth', label: 'Youth (5–17)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedAge(tab.id as AgeGroup)}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedAge === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Cardiovascular / Aerobic Target
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {current.aerobic}
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Strength & Functional Training
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {current.strength}
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Sedentary Time Reduction
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {current.sedentary}
          </p>
        </Card>
      </div>

      {/* Practical Routine for Nepali Communities */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">
            Practical Daily Routines for {current.title}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {current.nepaliExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-700 leading-relaxed">{ex}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Clinical Safety Precautions */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Exercise Safety Precautions</span>
        </div>
        <p className="leading-relaxed">
          Individuals with established cardiovascular disease, uncontrolled hypertension, diabetes, or severe joint osteoarthritis should consult their treating physician prior to starting an unaccustomed vigorous exercise routine. Stop exercising immediately and seek medical attention if you experience chest pain, dizziness, severe palpitations, or unusual breathlessness.
        </p>
      </div>
    </div>
  );
};
