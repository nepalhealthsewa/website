import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { useGetCampaignsQuery } from '../services/healthApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';

export const CampaignsPage: React.FC = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Blood Donation Drives & Community Camps"
        description="Explore upcoming and past voluntary blood donation drives and public health awareness campaigns across Birgunj, Janakpur, Chitwan, and Kathmandu."
        keywords="blood donation drives Nepal, blood camps Birgunj, Parsa blood donation campaign, voluntary blood donor events"
      />
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
            Community Mobilization
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Blood Donation Drives & Campaigns
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Public blood donation camps and health awareness initiatives organized across Parsa, Dhanusha, Chitwan, and Kathmandu.
          </p>
        </div>

        <Link to="/contact" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full sm:w-auto">
            <span>Organize a Drive With Us</span>
          </Button>
        </Link>
      </div>

      {/* Impact Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
        <div className="text-center sm:text-left">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">28+</div>
          <div className="text-xs text-slate-500 font-medium">Community Drives Held</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 font-mono">2,450+</div>
          <div className="text-xs text-slate-500 font-medium">Safe Pints Collected</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">68%</div>
          <div className="text-xs text-slate-500 font-medium">Youth & First-Timers</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono">100%</div>
          <div className="text-xs text-slate-500 font-medium">Red Cross Certified</div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns?.map((camp) => (
            <Card key={camp.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={camp.bannerImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/overview.36cb952a.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-md text-xs font-bold text-red-700 shadow-xs">
                    {camp.status}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {camp.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-500">
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

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {camp.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
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
      )}

      {/* How to Organize a Blood Drive Guide */}
      <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 space-y-8 border border-slate-200/80 shadow-xs">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 block mb-1 font-mono">
            Community Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Want to Host a Blood Donation Camp?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Whether you represent a college campus, youth club, corporate office, or religious community in Nepal, we partner with you end-to-end at zero cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-600">Step 01</div>
            <h3 className="text-sm font-bold text-slate-900">Date & Venue Booking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identify a covered, well-ventilated hall or school compound accessible to the public with power supply.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-600">Step 02</div>
            <h3 className="text-sm font-bold text-slate-900">Red Cross Mobilization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nepal Health Sewa coordinates the official Nepal Red Cross blood bus, phlebotomists, sterile kits, and doctor supervision.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-600">Step 03</div>
            <h3 className="text-sm font-bold text-slate-900">Community Outreach</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We design digital flyers, manage local awareness banners, and register participants in advance via our website.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-600">Step 04</div>
            <h3 className="text-sm font-bold text-slate-900">Collection & Certificates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every voluntary donor receives clinical health screening, nutritious juice refreshers, and a certified donor card.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Reach our event coordinator desk directly: <strong className="text-slate-800 font-mono">+977 9845012345</strong>
          </span>
          <Link to="/contact">
            <Button variant="primary" size="md" className="min-h-[42px]">
              <span>Submit Camp Collaboration Request</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
