import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  PhoneCall,
  Activity,
  HeartPulse,
  Wind,
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useGetCampaignsQuery, useGetDonorsQuery } from '../services/healthApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BloodGroup } from '../types';
import { SEO } from '../components/common/SEO';
import { HealthTipsSection } from '../components/common/HealthTipsSection';

export const HomePage: React.FC = () => {
  const { data: campaigns } = useGetCampaignsQuery();
  const { data: donorData } = useGetDonorsQuery();

  const [selectedBlood, setSelectedBlood] = useState<BloodGroup>('O+');

  const bloodCompatibility: Record<
    BloodGroup,
    { canGiveTo: BloodGroup[]; canReceiveFrom: BloodGroup[]; info: string }
  > = {
    'O-': {
      canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-'],
      info: 'Universal Red Cell Donor: O- red blood cells can be transfused to patients of all blood types in emergencies.',
    },
    'O+': {
      canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O-', 'O+'],
      info: 'Most common blood group in Nepal (~35-40% of population). Crucial for routine and trauma care.',
    },
    'A-': {
      canGiveTo: ['A-', 'A+', 'AB-', 'AB+'],
      canReceiveFrom: ['A-', 'O-'],
      info: 'Rare negative blood group. Donors are regularly placed on standby for scheduled maternal surgeries.',
    },
    'A+': {
      canGiveTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      info: 'Very common blood group. High demand across referral hospitals in Kathmandu and Birgunj.',
    },
    'B-': {
      canGiveTo: ['B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['B-', 'O-'],
      info: 'Rare type in high demand. Emergency replacement donors are frequently mobilized via our network.',
    },
    'B+': {
      canGiveTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      info: 'Common blood type in South Asia (~29-33%). Consistently needed in intensive care units.',
    },
    'AB-': {
      canGiveTo: ['AB-', 'AB+'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      info: 'Rarest blood group in Nepal (< 1% of population). Voluntary registrations are urgently preserved.',
    },
    'AB+': {
      canGiveTo: ['AB+'],
      canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      info: 'Universal Red Cell Recipient: Can receive red blood cells from any blood type safely.',
    },
  };

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEO
        title="Donate Blood, Save Life | Blood Bank Nepal"
        description="Nepal Health Sewa connects voluntary blood donors, hospital emergency wards, and community blood banks across Birgunj, Parsa, and Nepal."
        keywords="Nepal Health Sewa, blood donation Nepal, blood bank Birgunj, donate blood save life, voluntary blood donors, Narayani hospital blood, Parsa blood donors"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-50/60 via-slate-50/40 to-white pt-8 sm:pt-14 pb-12 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Mission & Headline */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-100/70 border border-red-200/60 px-3 py-1.5 rounded-lg w-fit">
                <img
                  src="/img/logo.af0d533f.png"
                  alt="Nepal Health Sewa Logo"
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
                  }}
                />
                <span>Nepal Health Sewa · Birgunj, Parsa</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                Donate Blood, <span className="text-red-600">Save Life.</span> Empowering Healthcare in Nepal.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Nepal Health Sewa bridges patients, hospitals, and voluntary donors. We coordinate critical blood reserves, emergency surgical blood requisitions, and community donation drives across Birgunj, Parsa, and beyond.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/blood-bank">
                  <Button variant="primary" size="lg">
                    <Droplet className="w-5 h-5 fill-current" />
                    <span>Find Blood Donors</span>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    <Activity className="w-5 h-5 text-red-600" />
                    <span>Operations Dashboard</span>
                  </Button>
                </Link>
                <Link to="/emergency">
                  <Button variant="destructive" size="lg">
                    <PhoneCall className="w-4 h-4" />
                    <span>Emergency Sewa 24*7</span>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {donorData?.total ? `${donorData.total * 45}+` : '1,450+'}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Voluntary Donors</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-red-600 font-mono tabular-nums">
                    920+
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Pints Coordinated</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
                    24/7
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Rapid Response</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Photo */}
            <div className="lg:col-span-5 relative flex items-center">
              <div className="w-full h-full min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 relative">
                <img
                  src="/src/assets/images/hero_nepal_health_sewa_1792473886512.jpg"
                  alt="Community healthcare clinic and voluntary blood donation in Nepal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-1.5 text-xs text-red-300 font-semibold mb-1">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    <span>Verified Voluntary Network</span>
                  </div>
                  <h3 className="text-lg font-bold">Community Blood Transfusion Sewa</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Serving patients at Narayani Hospital and regional healthcare centers with transparent volunteer support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Navigation Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            to="/blood-bank"
            className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Droplet className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
              Blood Donor Search
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Locate available donors by blood group (A+, B+, O+, AB-) and district across Nepal.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-red-600">
              <span>Search directory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/emergency"
            className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
              Emergency Oxygen Bank
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Emergency B & D cylinder logistics and medical oxygen supply for critical hospital transfers.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-600">
              <span>Request oxygen</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/health-tools"
            className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Health Calculators
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Evidence-based BMI body mass index, blood pressure staging, macro meal planner, and sleep metrics.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600">
              <span>Use clinical tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/covid-guidlines"
            className="group block p-6 bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              COVID-19 Guidelines
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Updated clinical protocols on isolation, booster vaccination centers, and home care in Nepal.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <span>View protocols</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Blood Group Compatibility Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-md">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Clinical Transfusion Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Blood Compatibility Matrix
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Select any blood group below to inspect transfusion safety, recipient compatibility, and donor eligibility.
            </p>
          </div>

          {/* Blood group selector tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBlood(bg)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  selectedBlood === bg
                    ? 'bg-red-600 text-white shadow-sm scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>

          {/* Compatibility Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-800/80 rounded-xl p-6 border border-slate-700">
            <div className="space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Can Give Red Cells To
              </div>
              <div className="flex flex-wrap gap-2">
                {bloodCompatibility[selectedBlood].canGiveTo.map((target) => (
                  <span
                    key={target}
                    className="px-3 py-1 bg-red-950/80 text-red-300 border border-red-800/60 rounded-md font-mono font-bold text-sm"
                  >
                    {target}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Can Receive Red Cells From
              </div>
              <div className="flex flex-wrap gap-2">
                {bloodCompatibility[selectedBlood].canReceiveFrom.map((source) => (
                  <span
                    key={source}
                    className="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded-md font-mono font-bold text-sm"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 lg:border-l lg:border-slate-700 lg:pl-6">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Clinical Overview ({selectedBlood})
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {bloodCompatibility[selectedBlood].info}
              </p>
              <div className="pt-2">
                <Link
                  to={`/blood-bank?group=${encodeURIComponent(selectedBlood)}`}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  <span>Search {selectedBlood} Donors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Nepal Health Sewa (From reference website chunk-40839bc3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            Our Guiding Values
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            4 Pillars of Nepal Health Sewa
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Verbatim principles established by the founding volunteer team in Birgunj to ensure reliable healthcare access for all.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-base mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Supportive & Helpfull
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We want people to support each other to come over any difficulties. Our team works as a bridge that connects the people and health systems so that everyone can be healthy and happy.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Strengthen & Empowerment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This platform is designed to encourage humanity and health awareness among the people. Our work is to ensure that no one should be deprived of basic healthcare facilities and education.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Sharing & Caring
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Giving blood is something that doesn’t take long, but can have a lifetime of impact. We are at our strongest when we work together to support vulnerable community members.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Bring Smile
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our world is made better when people like you do what they can to help others. Spreading happiness, dignity, and relieving medical distress is the hallmark of our sewa.
            </p>
          </Card>
        </div>
      </section>

      {/* How Blood Sewa Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            Clear, Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            How Nepal Health Sewa Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            When minutes matter in hospital wards, our streamlined volunteer network mobilizes swiftly to bridge patients and donors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm mb-4">
                Step 1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Hospital Requisition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patient's attending physician provides a blood requisition slip specifying blood group, components needed (PRBC, FFP, Platelets), and urgency.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Slip & Sample Prepared
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm mb-4">
                Step 2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Directory Match & Call
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Families search our verified donor directory or submit a 24/7 ticket. Our Birgunj desk instantly alerts active, nearby donors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Within 15–30 Minutes
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                Step 3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Screening & Cross-Match
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Donor arrives at Narayani Hospital Blood Bank or local Red Cross center. Pre-donation vitals and sterile cross-match testing are performed.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Strict Safety Standard
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4">
                Step 4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Transfusion & Life Saved
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Screened blood is handed directly to the patient's care unit for life-saving surgery, trauma resuscitation, or maternal delivery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold text-[11px]">
              100% Free & Altruistic
            </div>
          </div>
        </div>
      </section>

      {/* Donor Eligibility Quick Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                Pre-Donation Awareness
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Can You Donate Blood Today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review these national transfusion criteria before heading to a donation camp or registering on our platform.
              </p>
              <div className="pt-2">
                <Link to="/blood-bank?tab=register">
                  <Button variant="primary" size="md">
                    <span>Register as Voluntary Donor</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Age & Weight</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Age 18 to 60 years old with a minimum body weight of 45 kg (99 lbs).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Hemoglobin Level</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Minimum hemoglobin of 12.5 g/dL (tested free of charge on site).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Donation Interval</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    At least 90 days (3 months) since your last whole blood donation.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">General Well-being</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Free from fever, cold, or acute infections; not on active antibiotics or blood thinners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blood Drives & Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
              Community Outreach
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Active Blood Donation Drives
            </h2>
          </div>
          <Link
            to="/campaign"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            <span>View all campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns?.slice(0, 3).map((camp) => (
            <Card key={camp.id} hoverEffect className="flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={camp.bannerImage}
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-red-700 shadow-xs">
                  {camp.status}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                    {camp.title}
                  </h3>
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{camp.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{camp.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{camp.attendance}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/campaign/${camp.slug}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Campaign Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Voices / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            Voices of Hope
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Real Stories from Birgunj & Beyond
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every call answered and every pint donated impacts a real Nepali family in their most vulnerable hour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "When my sister required 3 units of rare B-negative blood for an emergency cesarean at Narayani Hospital, we were in sheer panic. Within 45 minutes of submitting a request to Nepal Health Sewa, two volunteer donors arrived at the blood bank."
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs">
                RK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Ramesh Kumar Yadav</h4>
                <span className="text-[11px] text-slate-400">Patient Family · Birgunj</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "I have donated blood 12 times through Nepal Health Sewa's community camps. The hygiene, transparency, and warmth of the volunteer team make it effortless to give back to our community in Parsa."
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                SS
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sunita Shrestha</h4>
                <span className="text-[11px] text-slate-400">Regular Voluntary Donor (O+) · Parsa</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "In clinical emergency settings, immediate donor availability saves lives. Having a centralized, non-commercial directory like Nepal Health Sewa bridges a critical operational gap in Madhesh Province."
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                DR
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Dr. A. K. Sah</h4>
                <span className="text-[11px] text-slate-400">Emergency Physician · Narayani Hospital</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clinical Health & Lifestyle Tips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HealthTipsSection
          title="Daily Health & Preventive Wellness Tips"
          subtitle="Essential lifestyle advice, dietary balancing, and emergency readiness for Nepali families."
          limit={6}
        />
        <div className="text-center pt-4">
          <Link
            to="/health-tools#health-tips"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>Explore All Health Tips & Clinical Calculators</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Callout Banner: Become a Donor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-8 sm:p-12 text-white shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/20 text-xs font-semibold uppercase tracking-wider">
              <Droplet className="w-3.5 h-3.5 fill-current" />
              <span>Let's Save Lives Together</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Get your chance to save lives, spread happiness, and bring a smile to someone's face!
            </h2>
            <p className="text-sm text-red-100 leading-relaxed">
              Healthy adults aged 18 to 60 can safely donate blood every 3 months. Register your profile into our secure directory so emergency hospitals can reach you when every second matters.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link to="/blood-bank?tab=register">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-red-700 font-bold text-sm shadow-md hover:bg-red-50 active:scale-98 transition-all cursor-pointer">
                Register as Blood Donor
              </button>
            </Link>
            <Link to="/contact">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-800/60 border border-white/20 text-white font-semibold text-sm hover:bg-red-800 transition-all cursor-pointer">
                Contact Our Birgunj Desk
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
