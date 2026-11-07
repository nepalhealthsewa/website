import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Building2,
  ArrowRight,
  Wind,
  ShieldCheck,
  HeartPulse,
  Activity,
} from 'lucide-react';
import { HEALTHCARE_SERVICES } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';

export const ServicesPage: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Droplet,
    PhoneCall,
    Calendar,
    CheckCircle2,
    Building2,
    Wind,
    ShieldCheck,
    HeartPulse,
    Activity,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SEO
        title="Healthcare & Emergency Services | Nepal Health Sewa"
        description="Explore Nepal Health Sewa comprehensive services: voluntary blood bank, emergency oxygen logistics, 24/7 ambulance dispatch, COVID-19 advisory, and clinical health tools."
        keywords="healthcare services Nepal, blood bank Birgunj, emergency oxygen supply, ambulance dispatch Nepal, health calculators, covid guidelines Nepal"
      />
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          Community Health & Emergency Network
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Our Healthcare Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Delivering voluntary blood donor coordination, emergency oxygen logistics, 24/7 ambulance assistance, preventative health tools, and public health guidelines across Nepal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HEALTHCARE_SERVICES.map((srv) => {
          const Icon = iconMap[srv.icon] || Droplet;
          return (
            <Card key={srv.id} className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200/60 px-3 py-1 rounded-md">
                    {srv.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{srv.title}</h3>
                  <div className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{srv.availability}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {srv.fullDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link to={srv.actionLink}>
                  <Button variant="primary" size="sm">
                    <span>{srv.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <Link to="/contact" className="text-xs text-slate-500 hover:text-slate-800 font-semibold">
                  Inquire Directly
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Service Standards & Operating Principles */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
            Quality & Clinical Safety
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Our 4 Core Service Commitments
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How Nepal Health Sewa ensures reliable, dignified, and safe community healthcare delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">100% Free Altruism</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hidden broker fees or commission charges. We strictly uphold national blood policies against commercialization.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Vetted Donor Pool</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every donor in our directory is verified for phone authenticity, donation frequency intervals, and basic medical suitability.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Rapid Response Hotline</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Volunteer dispatch coordinators in Birgunj, Parsa, and Kathmandu remain reachable 24 hours a day for emergency inquiries.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">Local Hospital Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Active coordination with Narayani Hospital Blood Bank, Nepal Red Cross Society, and regional emergency ambulances.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Assistance Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold">Have an immediate medical emergency in Birgunj or Parsa?</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our volunteer response desk is available 24 hours a day to connect you with available blood units, ambulances, or oxygen refilling plants.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/emergency">
            <Button variant="destructive" size="lg">
              <PhoneCall className="w-4 h-4 mr-2" />
              <span>Emergency Sewa 24*7</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
