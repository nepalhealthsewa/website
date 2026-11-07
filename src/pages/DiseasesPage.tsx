import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { useGetDiseasesQuery } from '../services/healthApi';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/common/SEO';

export const DiseasesPage: React.FC = () => {
  const { data: diseases, isLoading } = useGetDiseasesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const categories = [
    'ALL',
    'Infectious & Vector-Borne',
    'Chronic & Metabolic',
    'Cardiovascular',
    'Respiratory',
  ];

  const filtered = diseases?.filter((d) => {
    const matchCategory = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchSearch =
      !search.trim() ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.overview.toLowerCase().includes(search.toLowerCase()) ||
      (d.nepaliName && d.nepaliName.includes(search));
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Diseases & Clinical Health Conditions Guide"
        description="Evidence-based medical guides on common conditions in Nepal: Dengue fever, Typhoid, Type 2 Diabetes, Hypertension, and COPD, with Nepal MoHP prevention tips."
        keywords="dengue fever Nepal, typhoid symptoms Nepal, diabetes diet Nepal, hypertension guide, diseases in Nepal, EDCD Nepal health"
      />
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 block mb-1">
            Evidence-Based Health Library
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Diseases & Health Conditions Guide
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Verified, clinical symptom breakdowns, prevention measures, and Nepal Ministry of Health (MoHP) guidance on prevalent conditions.
          </p>
        </div>
      </div>

      {/* Nepal Seasonal Disease Epidemiology & Prevention Calendar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 block">
              Epidemiological Surveillance
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Seasonal Disease Patterns Across Nepal
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-md self-start sm:self-auto">
            MoHP Epidemiology & Disease Control (EDCD) Citing
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-amber-700 flex items-center justify-between">
              <span>Monsoon (Ashadh – Ashwin)</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Vector & Water-Borne Surge</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Dengue (Aedes mosquito breeding in stagnant water) and Cholera/Typhoid (contaminated wells/tanks). Crucial: Boiled water and eliminating water stagnation.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-blue-700 flex items-center justify-between">
              <span>Winter (Mangsir – Magh)</span>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Respiratory & COPD Flare-ups</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Dense Terai fog (sheetlahar) and biomass smoke trigger severe COPD and pediatric asthma. Crucial: Indoor ventilation, warm hydration, and timely bronchodilator refills.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="text-xs font-bold text-rose-700 flex items-center justify-between">
              <span>Year-Round (Universal)</span>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Metabolic & Cardiovascular NCDs</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Over 28% of adults suffer from Hypertension; Type 2 Diabetes is rapidly climbing. Crucial: Routine BP checks, reducing refined white rice/sugar, and 30 mins daily walking.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search diseases (e.g. Dengue, Diabetes, Hypertension, Cholera)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Disease Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Disease Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-48 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered?.map((dis) => (
            <Card key={dis.id} hoverEffect className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                    {dis.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Reviewed: {dis.lastReviewed}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {dis.name}
                  </h3>
                  {dis.nepaliName && (
                    <span className="text-xs text-slate-500 font-medium block">
                      {dis.nepaliName}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {dis.overview}
                </p>

                <div className="pt-2 text-xs text-slate-500">
                  <strong className="text-slate-700">Common symptoms:</strong> {dis.symptoms.common.slice(0, 3).join(', ')}...
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={`/diseases/${dis.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Read Full Clinical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
