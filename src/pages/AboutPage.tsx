import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'Supportive & Helpfull',
      desc: 'We want people to support each other to come over any difficulties. Our team works as a bridge that connects the people and health systems so that everyone can be healthy and happy.',
      icon: Users,
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Strengthen & Empowerment',
      desc: 'This platform is designed to encourage humanity and awareness among the people relating to health. Our work is to ensure that no one should be deprived of basic healthcare facilities and education as far as possible.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Sharing & Caring',
      desc: 'Our world is made better when people like you do what they can to help others. Giving blood is something that doesn’t take long, but can have a lifetime of impact. We are our strongest when we work together to support each other.',
      icon: Heart,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Bring Smile',
      desc: 'Relieving pain, answering emergency midnight calls, and standing beside vulnerable families in hospital waiting rooms. Spreading genuine happiness and bringing a smile to someone’s face is our core purpose.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      <SEO
        title="About Us | 4 Pillars & Mission"
        description="Learn about Nepal Health Sewa, founded in Birgunj, Parsa to bridge hospitals, blood donors, and patients across Nepal through community sewa."
        keywords="about Nepal Health Sewa, Birgunj blood initiative, Nepal health volunteers, 4 pillars Nepal Health Sewa"
      />
      {/* Intro Header */}
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          Our Story & Vision
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Nepal Health Sewa
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Founded in Birgunj, Parsa, Nepal Health Sewa began as a grassroots volunteer collective to solve acute blood shortages and coordinate emergency oxygen during respiratory crises. Today, we empower thousands of citizens with verified healthcare information, active blood donor registries, and public health campaigns.
        </p>
      </div>

      {/* Narrative & Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 leading-snug">
            A Lifeline Connecting Patients, Donors, and Emergency Care
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In Nepal, seasonal shortages of blood components and delays in locating emergency logistics often place immense burden on family members during critical hospital admissions. Recognizing this gap in Birgunj, our founding team established Nepal Health Sewa as a community-driven response to ensure that no patient suffers due to lack of blood or oxygen.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every pint of blood coordinated and every emergency inquiry answered represents a voluntary, compassionate act. We work hand-in-hand with Narayani Hospital Blood Bank, Nepal Red Cross Society, and regional healthcare institutions to maintain a transparent, zero-cost bridge for vulnerable families.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong>Headquarters:</strong> Ghantaghar, Birgunj-10, Parsa District, Madhesh Province, Nepal. Operating 24/7 volunteer desks across Parsa, Bara, Rautahat, Chitwan, and Kathmandu.
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/80 h-80 sm:h-96">
            <img
              src="/img/img1.936ee7e1.jpg"
              alt="Community healthcare blood donation in Nepal"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/img2.4dfe5a85.jpg';
              }}
            />
          </div>
        </div>
      </div>

      {/* Milestones & Journey */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            Our Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Key Milestones in Our Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            From emergency telephone hotlines in Birgunj to an integrated public health and donor platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 space-y-3">
            <div className="text-xs font-mono font-bold text-red-600">2020 – 2021</div>
            <h3 className="text-base font-bold text-slate-900">Grassroots Relief</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Launched emergency oxygen cylinder refills and nighttime donor coordination during the COVID-19 delta surge across Parsa and Bara.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="text-xs font-mono font-bold text-red-600">2022 – 2023</div>
            <h3 className="text-base font-bold text-slate-900">Hospital Alliances</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formalized referral coordination with Narayani Hospital Blood Transfusion Center and local youth clubs to organize monthly blood donation drives.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="text-xs font-mono font-bold text-red-600">2024</div>
            <h3 className="text-base font-bold text-slate-900">Verified Donor Registry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built a real-time voluntary blood donor matching directory with over 1,400 active donors cataloged across all 7 provinces of Nepal.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="text-xs font-mono font-bold text-red-600">2025 & Beyond</div>
            <h3 className="text-base font-bold text-slate-900">Integrated Digital Sewa</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deployed clinical disease guides, South Asian BMI/BP tools, traditional Nepali meal planning, and automated 24/7 emergency dispatch tickets.
            </p>
          </Card>
        </div>
      </div>

      {/* 4 Pillars Grid (Verbatim from reference site) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            Foundational Ethics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Our 4 Core Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The core tenets that guide every volunteer, campaign, and response in Nepal Health Sewa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Card key={idx} className="p-6 space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${p.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Ethical Charter & Commitments */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
            Transparency & Safety Standards
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Our Non-Profit Commitment to the Public
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Zero Commercialization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We operate strictly under the National Blood Transfusion policy of Nepal. Whole blood and blood components are never bought, sold, or brokered for financial gain.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Strict Clinical Cross-Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every voluntary donor mobilized undergoes formal clinical screening, hemoglobin checks, and five mandatory pathogen tests (HIV, Hep B, Hep C, VDRL, Malaria) at certified blood banks.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Universal Dignity & Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assistance is rendered unconditionally to all patients regardless of caste, religion, language, or socioeconomic standing. Donor contact data is never shared for advertising.
            </p>
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="bg-red-600 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold">Want to meet our leadership and youth volunteers?</h3>
          <p className="text-xs sm:text-sm text-red-100">
            Learn more about the dedicated individuals from Parsa and across Nepal who coordinate our daily health sewa.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/team">
            <Button variant="secondary" size="lg" className="bg-white text-red-700 hover:bg-red-50">
              <span>Meet Our Team</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
