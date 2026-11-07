import React from 'react';
import { TEAM_MEMBERS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/common/SEO';

export const TeamPage: React.FC = () => {
  const coreMembers = TEAM_MEMBERS.filter((m) => m.isCore);
  const volunteers = TEAM_MEMBERS.filter((m) => !m.isCore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      <SEO
        title="Our Leadership & Volunteers"
        description="Meet the dedicated executive leadership, blood coordinators, and field volunteers behind Nepal Health Sewa in Birgunj, Parsa."
        keywords="Nepal Health Sewa team, Sangam Kumar Pandit, Ayub Alam, Megha Karn, Bikash Singh Rajput, blood volunteers Birgunj"
      />
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          The People Behind the Sewa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Meet Our Team & Volunteers
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Dedicated youth leaders, emergency logistics coordinators, and community volunteers working relentlessly to serve patients in Parsa and across Nepal.
        </p>
      </div>

      {/* Core Team */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Executive Leadership & Core Coordinators
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Founders and operations directors guiding daily community interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreMembers.map((member) => (
            <Card key={member.id} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto shadow-xs">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/logo.af0d533f.png';
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                  <span className="text-xs font-semibold text-red-600 block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 text-center leading-relaxed italic">
                  "{member.bio}"
                </p>
              </div>

              {/* Social channels */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-xs">
                {member.socials.facebook && (
                  <a
                    href={member.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {member.socials.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-pink-600 transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Field Volunteers Network */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Our Active Field Volunteers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Volunteers managing on-ground hospital calls, donor inquiries, and blood transport.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map((vol) => (
            <Card key={vol.id} className="p-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <img
                  src={vol.image}
                  alt={vol.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/logo.af0d533f.png';
                  }}
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">{vol.name}</h3>
                <span className="text-xs text-emerald-700 font-semibold block">
                  {vol.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {vol.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Volunteer With Us Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block mb-1">
            Civic Participation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Join the Nepal Health Sewa Volunteer Corps
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            We are always seeking passionate individuals across Madhesh Province and throughout Nepal who want to contribute their time and skills to emergency healthcare coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-white">Medical & Nursing Cadets</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Medical interns, nursing students, and lab technicians assisting in community donor screening, vitals check, and first-aid response during blood camps.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-white">Emergency Hotline Coordinators</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated volunteers handling patient calls, verifying hospital requisition slips, and calling registered blood donors in critical emergencies.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-white">Campus & Youth Ambassadors</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              College students advocating blood donation awareness in high schools, youth clubs, and local social media networks across Parsa and beyond.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Formal civic service certificates awarded after 6 months of active engagement.
          </div>
          <a
            href="/contact"
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors"
          >
            Apply to Volunteer
          </a>
        </div>
      </div>
    </div>
  );
};
