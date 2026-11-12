import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Github,
  PhoneCall,
  Clock,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitInquiryMutation } from '../services/healthApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';
import { OFFICIAL_SOCIAL_MEDIAS, OFFICIAL_WEBSITES, OFFICIAL_EMAIL } from '../data/socialMedia';
import { MedicalServicesDirectory } from '../components/common/MedicalServicesDirectory';

const SOCIAL_ICON_MAP = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
};

export const ContactPage: React.FC = () => {
  const [submitInquiry, { isLoading }] = useSubmitInquiryMutation();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!formData.mobile.trim() || formData.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please write your message or enquiry.');
      return;
    }

    try {
      await submitInquiry({
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim() || undefined,
        message: formData.message.trim(),
      }).unwrap();

      toast.success(
        'Thank you! Your message has been received. Our team in Birgunj will respond promptly.'
      );
      setSubmitted(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        message: '',
      });
    } catch {
      toast.error('Unable to send message. Please dial +977 9845012345 directly.');
    }
  };

  const faqs = [
    {
      q: 'How does Nepal Health Sewa connect patients with voluntary donors?',
      a: 'We maintain a verified, community-updated directory of voluntary donors categorized by blood type and district. When an emergency ticket is submitted, our volunteer coordinators verify hospital paperwork and directly call available donors in the vicinity.',
    },
    {
      q: 'Is blood donation through Nepal Health Sewa completely free?',
      a: 'Yes, 100%. Voluntary blood donation is purely altruistic. Neither Nepal Health Sewa nor our volunteer donors ever charge fees for whole blood or platelets. Official blood testing or component separation processing fees charged by hospital blood banks follow government Red Cross tariffs.',
    },
    {
      q: 'How often can an individual donate blood in Nepal?',
      a: 'Healthy male and female adults can safely donate whole blood once every 90 days (3 months), provided hemoglobin levels exceed 12.5 g/dL and minimum weight is 45 kg.',
    },
    {
      q: 'How can a local college, business, or club partner with you for a blood camp?',
      a: 'You can submit an enquiry through this form or call our team directly. We coordinate with the Nepal Red Cross mobile collection team, sterile kits, physician supervision, and refreshers for all donors.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      <SEO
        title="Contact & Medical Services Directory (Hospitals, Blood Banks, Ambulance)"
        description="Comprehensive contact directory for major hospitals, 24/7 blood banks, emergency ambulances, and oxygen logistics in Nepal, plus general inquiries for Nepal Health Sewa Birgunj."
        keywords="medical contacts Nepal, hospital phone numbers Birgunj, blood bank contacts Nepal, emergency ambulance hotline 102, Narayani Hospital Birgunj contact, Nepal Health Sewa helpline"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: 'Nepal Health Sewa Medical Services & Emergency Contacts Directory',
          description:
            'Directory of verified emergency hospitals, blood banks, ambulance fleets, and medical desks across Nepal.',
        }}
      />

      {/* Page Header and Quick Section Links */}
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
              Contacts & Emergency Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Medical Directory & Official Contacts
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Find immediate contact numbers for major hospitals, blood transfusion banks, 24/7 ambulance services, and emergency rescue helplines across Nepal, or reach out to our Birgunj coordination desk.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <a
              href="#medical-directory"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-xl shadow-xs transition-all min-h-[42px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Medical Services Directory</span>
            </a>
            <a
              href="#enquiry-form"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] border border-slate-200 rounded-xl transition-all min-h-[42px]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              <span>Send Message</span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: Major Medical Services & Emergency Contacts Directory */}
      <MedicalServicesDirectory />

      {/* SECTION 2: Direct Enquiry Form & Birgunj Headquarters */}
      <div id="enquiry-form" className="scroll-mt-24 pt-4 border-t border-slate-200">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
            General Inquiries & Community Outreach
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Send a Direct Message to Nepal Health Sewa
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            For blood camp organization, community partnerships, feedback, or volunteer registrations, write to us below or visit our Ghantaghar office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900">
              Submit Enquiry or Feedback
            </h3>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Your message has been received! Our duty officer in Birgunj will get back to you shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sangam Pandit"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9845012345"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Message or Enquiry *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with blood, campaigns, or healthcare utilities?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Submit Message</span>
              </Button>
            </form>
          </div>

          {/* Location & Team Contact Cards */}
          <div id="office-location" className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Birgunj Central Office
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Address:</strong> Ghantaghar Chowk, Birgunj-10, Parsa District, Madhesh Province, Nepal
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Landmark: 50 meters south of Ghantaghar Clock Tower, near Narayani Hospital road.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Official Email:</strong>{' '}
                    <a
                      href={`mailto:${OFFICIAL_EMAIL}`}
                      className="text-red-600 hover:text-red-700 underline font-medium"
                    >
                      {OFFICIAL_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Coordination Desks:</strong>
                    <ul className="space-y-1 mt-1 text-[11px] text-slate-500">
                      <li><strong className="text-slate-700">Blood Bank Desk:</strong> +977 9845012345 (Sangam Pandit)</li>
                      <li><strong className="text-slate-700">Oxygen & Logistics:</strong> +977 9804812345 (Ayub Alam)</li>
                      <li><strong className="text-slate-700">Camp Partnerships:</strong> +977 9812345678 (Bikash Rajput)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Office Hours:</strong>
                    <span className="block text-[11px] text-slate-500">
                      Administrative Desk: Sun–Fri 8:00 AM – 6:00 PM<br />
                      Emergency Blood & Ambulance Dispatch: <strong>24 Hours / 7 Days (365 Days)</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Websites & Mirror Portals */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Official Web Portals & Mirrors
                </span>
                <div className="space-y-2">
                  {OFFICIAL_WEBSITES.map((site) => (
                    <a
                      key={site.domain}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-red-50/50 border border-slate-200/80 hover:border-red-200 rounded-lg text-slate-700 transition-colors group text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Globe className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 group-hover:text-red-600 flex items-center gap-1.5">
                            <span>{site.label}</span>
                            {site.isPrimary && (
                              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                                Primary
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {site.description}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Official Social Channels
                  </span>
                  <span className="text-[11px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded font-semibold">
                    @nepalhealthsewa
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {OFFICIAL_SOCIAL_MEDIAS.map((social) => {
                    const Icon = SOCIAL_ICON_MAP[social.id];
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg text-slate-700 transition-colors group"
                      >
                        <span className={`w-7 h-7 rounded-md flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${social.badgeColor}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-800 leading-tight group-hover:text-red-600 transition-colors">
                            {social.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">
                            {social.handle}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Emergency Alert Note */}
            <div className="p-5 rounded-2xl bg-red-50 border border-red-200/80 text-red-950 text-xs space-y-2">
              <strong className="text-red-900 block font-bold text-sm">
                Acute Medical Emergency?
              </strong>
              <p className="leading-relaxed text-red-900/90">
                Do not wait for form replies in critical moments. Dial <strong>102</strong> for immediate ambulance dispatch or call our emergency hotline at <strong>+977 9845012345</strong> right away.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Frequently Asked Questions Accordion */}
      <div id="faqs" className="space-y-6 pt-4 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
            Answers & Clarity
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
