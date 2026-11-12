import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  MapPin,
  Mail,
  Phone,
  PhoneCall,
  Heart,
  ShieldCheck,
  ArrowUp,
  Clock,
  HeartPulse,
  Activity,
  ChevronRight,
  Stethoscope,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Info,
} from 'lucide-react';
import { OFFICIAL_SOCIAL_MEDIAS, OFFICIAL_WEBSITES, OFFICIAL_EMAIL } from '../../data/socialMedia';

export { OFFICIAL_SOCIAL_MEDIAS, OFFICIAL_WEBSITES, OFFICIAL_EMAIL };

const SOCIAL_ICON_MAP = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
};

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const EMERGENCY_HOTLINES = [
  {
    name: 'Ambulance (MoHP Nepal)',
    number: '102',
    tel: 'tel:102',
    desc: 'Toll-free emergency triage',
    accent: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    iconColor: 'text-rose-600',
  },
  {
    name: 'Blood Emergency Desk',
    number: '+977 9845012345',
    tel: 'tel:+9779845012345',
    desc: '24/7 volunteer donor bridge',
    accent: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    iconColor: 'text-rose-600',
  },
  {
    name: 'Nepal Police Control',
    number: '100',
    tel: 'tel:100',
    desc: 'Emergency security dispatch',
    accent: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    name: 'Narayani Hospital Birgunj',
    number: '051-521993',
    tel: 'tel:051521993',
    desc: 'Central Emergency & Blood Bank',
    accent: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    name: 'Oxygen Logistics Helpdesk',
    number: '+977 9804812345',
    tel: 'tel:+9779804812345',
    desc: 'Cylinder supply & flowmeter',
    accent: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

export const TRUST_PILLARS = [
  {
    title: '100% Free & Voluntary',
    description: 'Zero brokerage, fee, or middleman charges for connecting blood donors with patients.',
    icon: Heart,
  },
  {
    title: 'Community Verified',
    description: 'Voluntary donors and blood camps validated by dedicated coordinators in Parsa and Madhesh.',
    icon: ShieldCheck,
  },
  {
    title: 'Clinical Standards Grounded',
    description: 'Health tools and guidelines aligned with Nepal MoHP, WHO, and AHA benchmarks.',
    icon: Stethoscope,
  },
  {
    title: 'Private & In-Browser',
    description: 'Calculators and health logs compute entirely on your device with zero data harvesting.',
    icon: Activity,
  },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-slate-50 text-slate-600 border-t border-slate-200 relative transition-colors"
      role="contentinfo"
      aria-label="Site Footer"
    >
      {/* 1. Streamlined Top Utility Bar: Emergency Contacts & Quick Blood Lookup */}
      <section
        className="bg-white border-b border-slate-200/80 py-3 sm:py-3.5"
        aria-label="Emergency Hotlines and Quick Blood Search"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6">
            {/* Quick Emergency Hotlines */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
                </span>
                Emergency:
              </span>

              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                <a
                  href="tel:102"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold border border-rose-200 transition-colors"
                  title="Call Ambulance (MoHP Nepal) 102"
                >
                  <PhoneCall className="w-3 h-3 text-rose-600" />
                  <span>Ambulance 102</span>
                </a>

                <a
                  href="tel:051521993"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 hover:bg-amber-100 font-semibold border border-amber-200 transition-colors"
                  title="Call Narayani Hospital Birgunj 051-521993"
                >
                  <Phone className="w-3 h-3 text-amber-600" />
                  <span>Narayani Hospital 051-521993</span>
                </a>

                <a
                  href="tel:+9779845012345"
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold border border-slate-200 transition-colors"
                  title="Call Blood Emergency Desk +977 9845012345"
                >
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>Blood Desk 9845012345</span>
                </a>
              </div>
            </div>

            {/* Quick Blood Group Filter */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1 shrink-0">
                <Droplet className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span className="hidden sm:inline">Blood Bank:</span>
              </span>

              <div className="flex items-center flex-wrap gap-1">
                {BLOOD_GROUPS.map((group) => (
                  <Link
                    key={group}
                    to={`/blood-bank?group=${encodeURIComponent(group)}`}
                    className="px-2 py-0.5 text-xs font-bold rounded bg-slate-100 text-slate-700 hover:bg-rose-600 hover:text-white border border-slate-200 hover:border-rose-600 transition-colors"
                    title={`Find voluntary ${group} blood donors`}
                  >
                    {group}
                  </Link>
                ))}

                <Link
                  to="/blood-bank?tab=register"
                  className="ml-1 px-2.5 py-0.5 text-xs font-semibold rounded bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <Heart className="w-3 h-3 fill-white" />
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Navigation & Organization Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Identity & Contact Details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/img/logo.af0d533f.png"
                alt="Nepal Health Sewa Logo"
                className="w-10 h-10 object-contain p-0.5"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
                }}
              />
              <div>
                <span className="text-base font-extrabold tracking-tight text-slate-900 leading-tight block">
                  Nepal Health Sewa
                </span>
                <span className="text-xs text-rose-600 font-semibold block">
                  रक्तदान जीवनदान · Donate Blood, Save Life
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              Grassroots non-profit health initiative rooted in Ghantaghar, Birgunj, Nepal. Connecting patients with verified voluntary blood donors, coordinating emergency logistics, and offering free in-browser clinical tools.
            </p>

            {/* Quiet Contact Metadata */}
            <div className="text-xs text-slate-600 space-y-2 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Ghantaghar, Main Road, Birgunj-10, Parsa, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="hover:text-rose-600 transition-colors font-medium text-slate-700"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <a
                  href="tel:+9779845012345"
                  className="hover:text-rose-600 transition-colors font-semibold text-slate-800"
                >
                  +977 9845012345 / 051-521993
                </a>
                <span className="text-[11px] text-slate-400 font-normal">· 24/7 Dispatch</span>
              </div>
            </div>

            {/* Official Social Links */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {OFFICIAL_SOCIAL_MEDIAS.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.id];
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Nepal Health Sewa on ${social.name} (${social.handle})`}
                      title={`${social.name}: @${social.username}`}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Blood & Emergency (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Blood & Triage
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blood-bank" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Donor Directory
                </Link>
              </li>
              <li>
                <Link to="/blood-bank?tab=register" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1">
                  <span>Emergency Sewa</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                </Link>
              </li>
              <li>
                <Link to="/campaign" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Donation Camps
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors flex items-center gap-1 pt-1">
                  <span>Operations Desk</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Health Calculators & Diseases (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Clinical Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/health-tools/bmi" className="text-slate-600 hover:text-rose-600 transition-colors">
                  BMI Calculator (Asian Cutoff)
                </Link>
              </li>
              <li>
                <Link to="/health-tools/blood-pressure" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Blood Pressure Staging
                </Link>
              </li>
              <li>
                <Link to="/health-tools/meal-planner" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Macro Meal Planner (Dal-Bhat)
                </Link>
              </li>
              <li>
                <Link to="/health-tools/sleep-tracker" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Sleep Duration & Hygiene
                </Link>
              </li>
              <li>
                <Link to="/health-tools/exercise" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Exercise & Calorie Burn
                </Link>
              </li>
              <li>
                <Link to="/diseases" className="text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1">
                  <span>Clinical Disease Library</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Organization (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Organization
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-rose-600 transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Volunteers & Team
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Field Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Contact Birgunj Desk
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-rose-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Refined Trust Indicators (Airy & Lightweight) */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {TRUST_PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div key={pillar.title} className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-rose-50 text-rose-600 shrink-0 mt-0.5 border border-rose-100">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 leading-tight">
                      {pillar.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Quiet Medical Disclaimer Note */}
        <div className="mt-6 p-3 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-500 flex items-start gap-2.5 shadow-2xs">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-slate-600">
            <strong className="text-slate-700">Clinical Notice:</strong> Nepal Health Sewa is an independent non-profit volunteer initiative in Birgunj, Nepal. Tools and donor directories are provided for community literacy and voluntary coordination. In acute life-threatening emergencies, dial <strong>102 (Ambulance)</strong> or proceed directly to Narayani Hospital or your nearest medical center.
          </p>
        </div>

        {/* 5. Bottom Bar: Copyright & Actions */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pb-16 sm:pb-6 lg:pb-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-center sm:text-left">
            <span>© {currentYear} Nepal Health Sewa. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="text-slate-600">Ghantaghar, Birgunj, Parsa, Nepal</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="text-rose-600 font-medium">रक्तदान जीवनदान</span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/privacy-policy" className="hover:text-slate-800 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-800 transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-slate-800 transition-colors">
              Helpdesk
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors text-xs font-medium cursor-pointer shadow-2xs"
              title="Scroll back to top of page"
              aria-label="Scroll back to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
