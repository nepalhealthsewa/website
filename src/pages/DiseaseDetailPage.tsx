import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Info,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useGetDiseaseBySlugQuery } from '../services/healthApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';

export const DiseaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: disease, isLoading } = useGetDiseaseBySlugQuery(slug || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading condition guide...
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Condition Not Found</h2>
        <p className="text-xs text-slate-500">The requested medical guide could not be located.</p>
        <Link to="/diseases">
          <Button variant="outline" size="sm">
            Back to Disease Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title={`${disease.name} (${disease.nepaliName || ''}) | Symptoms & Care Guide`}
        description={disease.overview}
        keywords={`${disease.name}, ${disease.nepaliName || ''}, symptoms ${disease.name}, treatment Nepal, Nepal MoHP guidelines ${disease.name}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          "name": disease.name,
          "alternateName": disease.nepaliName,
          "description": disease.overview,
          "possibleTreatment": disease.homeCare.map((h) => ({
            "@type": "MedicalTherapy",
            "name": h
          })),
          "signOrSymptom": disease.symptoms.common.map((s) => ({
            "@type": "MedicalSignOrSymptom",
            "name": s
          }))
        }}
      />
      <div>
        <Link
          to="/diseases"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Conditions</span>
        </Link>
      </div>

      <div className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            {disease.category}
          </span>
          <span className="text-xs text-slate-400">
            Reviewed: {disease.lastReviewed}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {disease.name}
        </h1>
        {disease.nepaliName && (
          <h2 className="text-lg text-slate-500 font-medium">
            {disease.nepaliName}
          </h2>
        )}
        <p className="text-sm sm:text-base text-slate-600 pt-2 leading-relaxed max-w-3xl">
          {disease.overview}
        </p>
      </div>

      {/* Symptoms Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Symptoms & Clinical Presentation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3 bg-slate-50/60">
            <h4 className="text-sm font-bold text-slate-900">Common Symptoms</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {disease.symptoms.common.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 space-y-3 bg-rose-50/60 border-rose-200">
            <h4 className="text-sm font-bold text-rose-950 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Serious / Emergency Warning Signs</span>
            </h4>
            <ul className="space-y-2 text-xs text-rose-900">
              {disease.symptoms.serious.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Prevention & Home Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            Prevention Strategies
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {disease.prevention.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            Home Care & Recovery
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {disease.homeCare.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Nepal Specific Context & MoHP Guidelines */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 text-emerald-950 space-y-2">
        <h3 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>Nepal Ministry of Health & Population (MoHP) Context</span>
        </h3>
        <p className="text-xs leading-relaxed">
          {disease.nepalGuidance}
        </p>
      </div>

      {/* Emergency Red Flags Notice */}
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>Immediate Hospital Care Criteria</span>
        </div>
        <h4 className="text-sm font-bold text-slate-900">
          When to Seek Urgent Attention at Narayani Hospital or Local Emergency Room
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          Do not delay if the patient exhibits any of the following clinical red flags: persistent high fever unresponsive to paracetamol, difficulty breathing or rapid respiratory rate (&gt; 25 bpm), blood in vomit or dark tarry stools, sudden chest tightness radiating to the arm or jaw, or extreme lethargy and confusion.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link to="/emergency">
            <Button variant="destructive" size="sm">
              <span>Open 24/7 Emergency Sewa</span>
            </Button>
          </Link>
          <a
            href="tel:102"
            className="text-xs font-bold text-red-700 hover:text-red-800 underline underline-offset-4"
          >
            Direct Ambulance Hotline: 102
          </a>
        </div>
      </div>

      {/* Relevant Health Tools Shortcut */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Monitor Your Health With Our Tools Suite
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Use our interactive clinical evaluators for blood pressure staging, traditional Nepali meal planning, and BMI calculation.
          </p>
        </div>
        <Link to="/health-tools">
          <Button variant="outline" size="sm" className="shrink-0">
            <span>Explore Health Tools</span>
          </Button>
        </Link>
      </div>

      {/* Medical Sources */}
      <div className="text-xs text-slate-500 space-y-1.5 pt-4 border-t border-slate-200">
        <span className="font-bold text-slate-700">Clinical References:</span>
        <ul className="list-disc list-inside space-y-0.5">
          {disease.sources.map((src, idx) => (
            <li key={idx}>{src}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
