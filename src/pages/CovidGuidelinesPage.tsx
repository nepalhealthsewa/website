import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { COVID_GUIDELINES } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/common/SEO';

export const CovidGuidelinesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SEO
        title="COVID-19 Health Guidelines & Symptoms Advisory"
        description="Public health guidelines on COVID-19 symptoms, prevention checklist, proper mask fitting, and danger signs from Nepal Health Sewa."
        keywords="COVID-19 guidelines Nepal, corona symptoms Nepal, mask fitting guide, COVID prevention Birgunj, Nepal health advisory"
      />
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          Public Health Advisory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          {COVID_GUIDELINES.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          {COVID_GUIDELINES.subtitle}
        </p>
      </div>

      {/* Symptoms Grid (Most Common, Less Common, Serious) */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Recognize COVID-19 & Respiratory Symptoms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Most Common */}
          <Card className="p-6 border-amber-200/80 bg-amber-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Most Common Symptoms
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {COVID_GUIDELINES.symptoms.mostCommon.map((s, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-500 italic pt-2 border-t border-amber-100">
              On average, it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days.
            </p>
          </Card>

          {/* Less Common */}
          <Card className="p-6 border-blue-200/80 bg-blue-50/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Less Common Symptoms
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {COVID_GUIDELINES.symptoms.lessCommon.map((s, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-500 italic pt-2 border-t border-blue-100">
              People with mild symptoms who are otherwise healthy should manage their symptoms at home with hydration and rest.
            </p>
          </Card>

          {/* Serious Symptoms */}
          <Card className="p-6 border-rose-300 bg-rose-50/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                Serious Symptoms (Danger Signs)
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <ul className="space-y-2 text-xs text-rose-950 font-medium">
              {COVID_GUIDELINES.symptoms.serious.map((s, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-rose-600 text-white rounded-lg text-xs leading-relaxed">
              <strong>Emergency Action:</strong> Seek immediate medical attention if you have serious symptoms. Always call before visiting your doctor or health facility.
            </div>
          </Card>
        </div>
      </div>

      {/* Prevention Checklist */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-600" />
          <span>Community Infection Prevention Checklist</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COVID_GUIDELINES.prevention.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Original Reference Images: Overview and Proper Mask Wear */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4 space-y-3">
          <div className="h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100">
            <img
              src="/img/overview.36cb952a.jpg"
              alt="COVID-19 Health Overview & Protection"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
              }}
            />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Public Health & Safety Overview
          </h4>
          <p className="text-xs text-slate-500">
            Guidance from Nepal Ministry of Health & Population on viral transmission control.
          </p>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100">
            <img
              src="/img/wear.415a9039.jpg"
              alt="How to wear mask correctly"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
              }}
            />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Face Mask Fitting Best Practices
          </h4>
          <p className="text-xs text-slate-500">
            Ensuring proper seal, covering both nose and chin, avoiding touching front surface.
          </p>
        </Card>
      </div>

      {/* High-Risk Protection & Multi-Generational Household Protocol */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
            Family Protection in Nepal
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Protecting High-Risk Family Members in Shared Homes
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            In typical Nepali joint families where elders and young children reside under one roof, airborne respiratory viruses require extra diligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Separate Isolation Room</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Allocate a well-ventilated bedroom with open windows. Keep symptomatic members isolated and maintain a dedicated drinking cup and dining utensils.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Pulse Oximetry Cutoffs</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check blood oxygen (SpO₂) twice daily on index finger. Normal is 95–100%. If SpO₂ drops below 94% on room air, alert a medical doctor; below 90% is a hospital emergency.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Warm Convalescent Diet</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide warm fluids: vegetable and dal soups, turmeric water (haldi paani), ginger tea, and nutritious khichdi/jaulo to preserve strength.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
