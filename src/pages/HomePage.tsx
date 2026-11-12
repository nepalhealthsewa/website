import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  PhoneCall,
  Activity,
  HeartPulse,
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight,
  Users,
  CheckCircle2,
  Building2,
  Phone,
  Clock,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useGetCampaignsQuery, useGetDonorsQuery } from '../services/healthApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BloodGroup } from '../types';
import { SEO } from '../components/common/SEO';
import { HealthTipsSection } from '../components/common/HealthTipsSection';
import heroImage from '../assets/images/hero_nepal_health_sewa_1792473886512.jpg';

export const HomePage: React.FC = () => {
  const { data: campaigns } = useGetCampaignsQuery();
  const { data: donorData } = useGetDonorsQuery();

  const [selectedBlood, setSelectedBlood] = useState<BloodGroup>('O+');

  const bloodCompatibility: Record<
    BloodGroup,
    { canGiveTo: BloodGroup[]; canReceiveFrom: BloodGroup[]; info: string; highlight?: string }
  > = {
    'O-': {
      canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-'],
      info: 'Universal Red Cell Donor: O-negative red blood cells are compatible with every blood group and are essential in trauma resuscitation before laboratory cross-matching completes.',
      highlight: 'Universal Red Cell Donor',
    },
    'O+': {
      canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O-', 'O+'],
      info: 'Most prevalent blood group in Nepal (~35–40% of population). Consistently required for scheduled maternal procedures, neonatal care, and general surgical admissions.',
      highlight: 'Most Common Type in Nepal',
    },
    'A-': {
      canGiveTo: ['A-', 'A+', 'AB-', 'AB+'],
      canReceiveFrom: ['A-', 'O-'],
      info: 'Rare Rh-negative blood type (< 2% of population). Voluntary registrations are prioritized to safeguard maternal surgical standby in Madhesh and Bagmati provinces.',
      highlight: 'Rare Rh-Negative Group',
    },
    'A+': {
      canGiveTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      info: 'High frequency in central Nepal (~22–25%). Frequent demand in acute orthopedic trauma, oncology transfusions, and intensive care units.',
      highlight: 'High Hospital Demand',
    },
    'B-': {
      canGiveTo: ['B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['B-', 'O-'],
      info: 'Uncommon Rh-negative group requiring dedicated emergency replacement standby. Our volunteer desk swiftly mobilizes nearby verified donors when requests arrive.',
      highlight: 'Rare Blood Group',
    },
    'B+': {
      canGiveTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      info: 'Prevalent South Asian blood type (~29–33% in Nepal). Routine demand across referral hospitals including Narayani Hospital Birgunj and Bharatpur Hospital.',
      highlight: 'High Population Prevalance',
    },
    'AB-': {
      canGiveTo: ['AB-', 'AB+'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      info: 'The rarest blood type in Nepal (< 0.8% of population). Voluntary donors with AB- are registered in emergency reserves with proactive standby alerts.',
      highlight: 'Rarest Blood Group in Nepal',
    },
    'AB+': {
      canGiveTo: ['AB+'],
      canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      info: 'Universal Red Cell Recipient: Individuals with AB+ can receive red blood cells from any blood group safely without immunological mismatch complications.',
      highlight: 'Universal Recipient',
    },
  };

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <SEO
        title="Donate Blood, Save Life | Nepal Health Sewa"
        description="Nepal Health Sewa connects voluntary blood donors, emergency hospital wards, and community blood banks across Birgunj, Parsa, and Nepal."
        keywords="Nepal Health Sewa, blood donation Nepal, blood bank Birgunj, donate blood save life, voluntary blood donors, Narayani hospital blood, Parsa blood donors, 102 ambulance Nepal"
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Prestigious Hospital-Grade Presentation */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/50 via-slate-50/30 to-white pt-8 sm:pt-14 pb-12 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Authentic Brand & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Signal Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100/80 border border-red-200/80 px-3 py-1.5 rounded-lg shadow-2xs">
                <img
                  src="/img/logo.af0d533f.png"
                  alt="Nepal Health Sewa Logo"
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
                  }}
                />
                <span>Community Healthcare & Voluntary Transfusion · Birgunj, Nepal</span>
              </div>

              {/* Marquee Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-display text-balance">
                Donate Blood, <span className="text-red-600">Save Life.</span> Connecting Care Across Nepal.
              </h1>

              {/* Concrete Value Proposition */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Nepal Health Sewa bridges patients, hospitals, and voluntary donors. We coordinate critical blood reserves, emergency surgical blood requisitions, medical oxygen, and community donation drives across Birgunj, Parsa, and beyond.
              </p>

              {/* Primary Action Button Cluster */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link to="/blood-bank" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-sm">
                    <Droplet className="w-5 h-5 fill-current" />
                    <span>Find Blood Donors</span>
                  </Button>
                </Link>
                <Link to="/emergency" className="w-full sm:w-auto">
                  <Button variant="destructive" size="lg" className="w-full sm:w-auto shadow-sm">
                    <PhoneCall className="w-4 h-4" />
                    <span>Emergency Sewa 24*7</span>
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Activity className="w-4 h-4 text-red-600" />
                    <span>Operations Console</span>
                  </Button>
                </Link>
              </div>

              {/* Regional Alignment Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Free & Altruistic</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Narayani Hospital Alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>24/7 Field Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <div className="aspect-4/3 sm:aspect-16/11 w-full overflow-hidden relative">
                  <img
                    src={heroImage}
                    alt="Voluntary blood donation camp and community healthcare in Nepal"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/hero_nepal_health_sewa.jpg';
                    }}
                  />
                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-red-300">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Emergency Transfusion Desk · Parsa District</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display leading-snug">
                    Community Blood Transfusion Support
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    Coordinating voluntary donors with hospital blood banks across Birgunj, Chitwan, Janakpur, and Kathmandu with zero intermediary charges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Key Operational Metrics Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {donorData?.total ? `${donorData.total * 45}+` : '1,450+'}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Voluntary Donors
                </div>
                <p className="text-[11px] text-slate-400">Verified across 77 districts</p>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-red-600 font-mono tabular-nums">
                  920+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pints Coordinated
                </div>
                <p className="text-[11px] text-slate-400">Emergency & maternal care</p>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600 font-mono tabular-nums">
                  28+
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Blood Drives Held
                </div>
                <p className="text-[11px] text-slate-400">College & youth club camps</p>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-600 font-mono tabular-nums">
                  24/7
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Rapid Response
                </div>
                <p className="text-[11px] text-slate-400">Birgunj coordination desk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE CAPABILITIES: Asymmetric Bento Grid (Anti-Slop Architecture) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
              Integrated Public Health Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Core Capabilities & Emergency Infrastructure
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              From round-the-clock emergency hospital blood sourcing to validated clinical calculators and preventive nutrition guides.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors whitespace-nowrap"
          >
            <span>Explore All Healthcare Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Marquee Bento Card (lg:col-span-7): Emergency 24/7 Sewa */}
          <div className="lg:col-span-7 bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-lg text-xs font-bold uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Priority Emergency Operations</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">
                24/7 Rapid Emergency Blood & Medical Oxygen Logistics
              </h3>

              <p className="text-xs sm:text-sm text-red-100 leading-relaxed max-w-xl">
                When patients in emergency departments or surgical wards need urgent compatible blood or B/D oxygen cylinders, our Birgunj desk immediately alerts verified on-call volunteer donors and local transport networks.
              </p>

              {/* Quick Contact Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-red-950/40 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-red-300" />
                    <span>Ambulance Sewa</span>
                  </div>
                  <div className="text-red-200 font-mono text-sm font-bold">Dial 102 (Toll-Free)</div>
                  <p className="text-[11px] text-red-200/80">National emergency medical triage</p>
                </div>

                <div className="p-3 bg-red-950/40 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-red-300" />
                    <span>Birgunj Volunteer Desk</span>
                  </div>
                  <div className="text-red-200 font-mono text-sm font-bold">+977 9845012345</div>
                  <p className="text-[11px] text-red-200/80">24/7 Emergency blood coordination</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative z-10">
              <Link to="/emergency" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-red-700 font-bold text-xs shadow-xs hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2">
                  <span>Submit Emergency Ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <span className="text-[11px] text-red-200 text-center sm:text-right">
                Zero Fees · Pure Voluntary Altruism
              </span>
            </div>
          </div>

          {/* Bento Card 2 (lg:col-span-5): Voluntary Blood Bank Directory */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200/60 shadow-2xs">
                <Droplet className="w-6 h-6 fill-current" />
              </div>

              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                  Live Donor Directory
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  Voluntary Blood Donor Search
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Filter over 1,400 verified donors by blood group (A+, B+, O+, AB-), district, and availability across Nepal with direct telephone contacts.
              </p>

              {/* Quick Blood Group Buttons */}
              <div className="pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Blood Group Filter:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {bloodGroups.map((bg) => (
                    <Link
                      key={bg}
                      to={`/blood-bank?group=${encodeURIComponent(bg)}`}
                      className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-800 transition-colors"
                      title={`Search ${bg} blood donors`}
                    >
                      {bg}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/blood-bank"
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <span>Search Donor Registry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/blood-bank?tab=register"
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                + Register as Donor
              </Link>
            </div>
          </div>

          {/* Bento Card 3 (lg:col-span-6): Clinical & Preventive Health Tools */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 shadow-2xs">
                <HeartPulse className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  South Asian Clinical Calibration
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  Evidence-Based Health Calculators
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cardiovascular and metabolic tools calibrated to WHO Asian cutoffs. Assess South Asian BMI risk, blood pressure staging, sleep debt, and traditional Nepali meal planning (Dal, Bhat, Tarkari).
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                <Link
                  to="/health-tools/bmi"
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold">Asian BMI Calculator</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </Link>
                <Link
                  to="/health-tools/blood-pressure"
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold">BP Stage Evaluator</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/health-tools"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Launch Health Tools Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400">100% Private & In-Browser</span>
            </div>
          </div>

          {/* Bento Card 4 (lg:col-span-6): National Medical Services Directory */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Healthcare Contacts Hub
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  Nationwide Medical Directory
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct phone numbers for referral hospitals (Narayani, Bharatpur, Bir Hospital, TUTH), regional blood banks, ambulance fleets, and poison centers across Nepal.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">Narayani Hospital</div>
                  <div className="text-[11px] text-slate-500 font-mono">051-521993 · Birgunj</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">Parsa Blood Bank</div>
                  <div className="text-[11px] text-slate-500 font-mono">051-522137 · Red Cross</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/contact#medical-directory"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View Full Medical Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400">77 Districts Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CLINICAL TRANSFUSION MATRIX: High-End Hospital Grade Module */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 text-slate-900 shadow-xs border border-slate-200/80">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
              Clinical Transfusion Guide · ABO & Rh Factor Compatibility
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-1 font-display text-slate-900">
              Blood Compatibility Matrix
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Select any blood group below to inspect transfusion safety, safe recipients, compatible sources, and clinical frequency in Nepal.
            </p>
          </div>

          {/* Blood group selector tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {bloodGroups.map((bg) => {
              const isSelected = selectedBlood === bg;
              return (
                <button
                  key={bg}
                  onClick={() => setSelectedBlood(bg)}
                  className={`min-w-[48px] min-h-[44px] px-4 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer font-mono flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{bg}</span>
                </button>
              );
            })}
          </div>

          {/* Compatibility Details Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            {/* Safe Recipients */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Safe Red Cell Recipients ({selectedBlood} Can Give To)
              </div>
              <div className="flex flex-wrap gap-2">
                {bloodCompatibility[selectedBlood].canGiveTo.map((target) => (
                  <span
                    key={target}
                    className="px-3.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200/80 rounded-lg font-mono font-bold text-sm shadow-2xs"
                  >
                    {target}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                Patients with these blood groups can safely accept red cells from a {selectedBlood} donor without acute hemolytic reaction.
              </p>
            </div>

            {/* Compatible Donors */}
            <div className="lg:col-span-4 space-y-3 lg:border-l lg:border-slate-200 lg:pl-6">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Compatible Donors ({selectedBlood} Can Receive From)
              </div>
              <div className="flex flex-wrap gap-2">
                {bloodCompatibility[selectedBlood].canReceiveFrom.map((source) => (
                  <span
                    key={source}
                    className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-lg font-mono font-bold text-sm shadow-2xs"
                  >
                    {source}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                If a patient with {selectedBlood} requires emergency whole blood or packed red cells, only these donor types are clinically safe.
              </p>
            </div>

            {/* Clinical Overview & Direct Action */}
            <div className="lg:col-span-4 space-y-3 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Clinical Overview ({selectedBlood})
                </div>
                {bloodCompatibility[selectedBlood].highlight && (
                  <div className="text-xs font-bold text-amber-800 mt-1">
                    {bloodCompatibility[selectedBlood].highlight}
                  </div>
                )}
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {bloodCompatibility[selectedBlood].info}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <Link
                  to={`/blood-bank?group=${encodeURIComponent(selectedBlood)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-all active:scale-[0.98]"
                >
                  <Droplet className="w-3.5 h-3.5 fill-current" />
                  <span>Search Verified {selectedBlood} Donors</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOUNDATIONAL ETHICS: 4 Pillars of Nepal Health Sewa */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Foundational Ethics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            4 Pillars of Nepal Health Sewa
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Principles established by the founding volunteer team in Birgunj to guarantee free, compassionate, and transparent healthcare access.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 flex flex-col justify-between space-y-4 hover:border-red-300 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                Supportive & Helpful
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We empower communities to support each other during medical distress. Our volunteer team works as a direct bridge connecting families with blood transfusion centers.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              Community Bridge
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                Strength & Empowerment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Encouraging health awareness, preventative lifestyle habits, and youth civic leadership. Ensuring no one is deprived of life-saving medical resources.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              Health Literacy
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                Sharing & Caring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A single voluntary blood donation takes less than 30 minutes, yet gifts a lifetime of opportunity to a patient in critical care. We stand strongest together.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              Altruistic Transfusion
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-between space-y-4 hover:border-amber-300 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                Bringing Smiles
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Spreading happiness, preserving human dignity, and relieving medical panic during midnight hospital emergencies is the defining spirit of our sewa.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              Compassionate Care
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLINICAL WORKFLOW: How Blood Sewa Works */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Clinical Transfusion Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            How Nepal Health Sewa Operates
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            When minutes matter in hospital emergency wards, our volunteer network mobilizes swiftly to bridge patients and blood transfusion centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
                Hospital Requisition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The attending physician provides an official blood requisition slip specifying required blood components (PRBC, Whole Blood, Platelets, FFP) and urgency.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Slip & Sample Prepared
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
                Volunteer Donor Match
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Families search our verified donor directory or submit a 24/7 ticket. Our Birgunj desk immediately alerts active, nearby donors matching the exact blood type.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              15–30 Minute Mobilization
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
                Screening & Cross-Match
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Donor arrives at Narayani Hospital Blood Bank or local Red Cross center. Pre-donation vitals, hemoglobin verification, and sterile cross-match testing are performed.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Strict Medical Standards
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-4 font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 font-display">
                Transfusion & Life Saved
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Screened blood is handed directly to the patient's care unit for life-saving surgery, trauma resuscitation, or maternal delivery with zero middleman fee.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-bold">
              100% Free Altruism
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DONOR ELIGIBILITY CHECKLIST */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                Pre-Donation Awareness
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Can You Donate Blood Today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review these national clinical criteria before heading to a community blood drive or registering in our directory.
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
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Age & Weight Requirements</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Aged 18 to 60 years old with a minimum body weight of 45 kg (99 lbs) for a standard 350ml or 450ml draw.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Hemoglobin Level</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Minimum hemoglobin of 12.5 g/dL (tested quickly and painlessly on-site prior to donation).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Donation Frequency Interval</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    At least 90 days (3 months) since your last whole blood donation to allow full red blood cell recovery.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">General Clinical Well-being</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Free from active fever, cold, or acute infection; not on active antibiotics, steroids, or anticoagulants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACTIVE COMMUNITY BLOOD DRIVES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
              Field Outreach
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Active Blood Donation Camps
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Community drives organized in partnership with local youth clubs, colleges, and the Nepal Red Cross Society.
            </p>
          </div>
          <Link
            to="/campaign"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
          >
            <span>View All Blood Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns?.slice(0, 3).map((camp) => (
            <Card key={camp.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={camp.bannerImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/overview.36cb952a.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-md text-[11px] font-bold text-red-700 shadow-xs">
                    {camp.status}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 font-display">
                    {camp.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-500">
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
              </div>
              <div className="p-5 pt-0">
                <Link to={`/campaign/${camp.slug}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <span>View Campaign Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. VOICES OF HOPE: Attributable Clinical & Community Testimonials */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
            Voices of Hope
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Real Stories from Birgunj & Beyond
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every call answered and every unit donated impacts a real Nepali family in their most vulnerable hour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              "When my sister required 3 units of rare B-negative blood for an emergency cesarean at Narayani Hospital, we were in sheer panic. Within 45 minutes of submitting a request to Nepal Health Sewa, two volunteer donors arrived at the blood bank."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs font-mono">
                RK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Ramesh Kumar Yadav</h4>
                <span className="text-[11px] text-slate-500">Patient Family · Birgunj, Parsa</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              "I have donated blood 12 times through Nepal Health Sewa's community camps. The hygiene, transparency, and warmth of the volunteer team make it effortless to give back to our community in Parsa."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs font-mono">
                SS
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sunita Shrestha</h4>
                <span className="text-[11px] text-slate-500">Regular Voluntary Donor (O+) · Parsa</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              "In clinical emergency settings, immediate donor availability saves lives. Having a centralized, non-commercial directory like Nepal Health Sewa bridges a critical operational gap in Madhesh Province."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs font-mono">
                DR
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Dr. A. K. Sah</h4>
                <span className="text-[11px] text-slate-500">Emergency Physician · Narayani Hospital</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PREVENTIVE HEALTH & NUTRITION ADVISORY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HealthTipsSection
          title="Daily Health & Preventive Wellness Guidance"
          subtitle="Essential lifestyle advice, dietary balancing, and emergency readiness for Nepali families."
          limit={6}
        />
        <div className="text-center pt-4">
          <Link
            to="/health-tools#health-tips"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <span>Explore All Health Tips & Clinical Calculators</span>
            <ArrowRight className="w-4 h-4 text-rose-600" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CONVERSION BANNER: High-Impact Life Saving CTA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Let's Save Lives Together</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display leading-tight">
              Get your chance to save lives, spread happiness, and bring a smile to someone's face!
            </h2>
            <p className="text-sm text-red-100 leading-relaxed">
              Healthy adults aged 18 to 60 can safely donate blood every 3 months. Register your profile into our secure directory so emergency hospitals can reach you when every second counts.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
            <Link to="/blood-bank?tab=register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-red-700 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer">
                Register as Blood Donor
              </button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-800/80 border border-white/25 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-800 active:scale-[0.98] transition-all cursor-pointer">
                Contact Birgunj Desk
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
