import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  HeartPulse,
  Utensils,
  Moon,
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { SEO } from '../../components/common/SEO';
import { HealthTipsSection } from '../../components/common/HealthTipsSection';

export const HealthToolsIndexPage: React.FC = () => {
  const tools = [
    {
      title: 'Body Mass Index (BMI) Calculator',
      slug: 'bmi',
      desc: 'Calculate adult BMI with Metric and Imperial units, standard WHO categories, and Asian specific health cutoffs.',
      icon: Calculator,
      color: 'text-red-600 bg-red-50 border-red-200',
      badge: 'Anthropometric Tool',
    },
    {
      title: 'Blood Pressure Stage Evaluator',
      slug: 'blood-pressure',
      desc: 'Evaluate systolic and diastolic readings according to AHA/ACC and Nepal MoHP guidelines with urgency triage warnings.',
      icon: HeartPulse,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      badge: 'Cardiovascular Awareness',
    },
    {
      title: 'Nepali Dietary Meal Planner',
      slug: 'meal-planner',
      desc: 'Plan healthy, balanced traditional Nepali meals (Dal, Bhat, Tarkari, Dhido, Gundruk) tailored to calorie and macro goals.',
      icon: Utensils,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badge: 'Nutrition & Diet',
    },
    {
      title: 'Sleep Duration & Debt Tracker',
      slug: 'sleep-tracker',
      desc: 'Track bedtime and wake times across midnight, measure sleep debt vs the 7–9 hour standard, and view weekly logs.',
      icon: Moon,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      badge: 'Rest & Recovery',
    },
    {
      title: 'Physical Activity & Exercise Benchmarks',
      slug: 'exercise',
      desc: 'Evidence-based WHO physical activity recommendations by age with accessible routines for Nepali lifestyles.',
      icon: Dumbbell,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      badge: 'Fitness Guidance',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Clinical & Preventive Health Calculators"
        description="Explore evidence-based health calculators and planners: BMI calculator with Asian WHO cutoffs, blood pressure evaluator, Nepali meal planner, and sleep tracker."
        keywords="health calculators Nepal, BMI calculator Birgunj, Nepali meal planner, blood pressure evaluator, sleep debt tracker Nepal"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Clinical & Preventive Health Calculators',
          description: 'Interactive evidence-based health utilities tailored for Nepali nutrition, anthropometrics, and cardiovascular health.',
          hasPart: tools.map((t) => ({
            '@type': 'WebApplication',
            name: t.title,
            description: t.desc,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'All',
          })),
        }}
      />
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1.5">
          <Activity className="w-4 h-4" />
          <span>Evidence-Based Health Calculators</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Nepal Health Sewa Utility Suite
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
          Empowering families with instant, medically-referenced calculators and lifestyle planning tools. Designed with local Nepali nutritional and clinical contexts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.slug}
              to={`/health-tools/${t.slug}`}
              className="group block"
            >
              <Card hoverEffect className="p-6 h-full flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${t.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-red-600">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Why Tailored Tools for Nepal Matter */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
            Clinical Grounding
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why South Asian Health Metrics Require Local Calibration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Standard global health algorithms frequently underestimate cardiovascular and metabolic risks in Nepali and South Asian populations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Lower BMI Cutoffs (Asian WHO)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Due to higher body fat percentages and visceral adiposity at comparable weights, the WHO Asian classification sets overweight at BMI ≥ 23.0 kg/m² and obesity at ≥ 27.5 kg/m².
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Nepali Dietary Rebalancing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional Nepali meals often skew 75%+ in refined carbohydrates (white bhat). Our planner helps shift plate proportion toward rich lentils (daal), fiber (saag, gundruk), and lean proteins.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Early Hypertension Surveillance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              High dietary sodium (achar, papad, processed noodles) accelerates hypertension in young adults. Regular home tracking enables early lifestyle modifications before organ damage.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Clinical Health & Lifestyle Tips Section */}
      <HealthTipsSection />

      {/* Safety Notice */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900">Clinical Purpose Notice:</strong> All calculators and health tips in this suite are provided solely for personal health awareness and lifestyle guidance. Algorithmic outputs should not be used as clinical diagnostic criteria or as an alternative to consulting a registered medical practitioner.
        </div>
      </div>
    </div>
  );
};

