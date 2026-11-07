import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Building,
  ArrowLeft,
  CheckCircle2,
  Droplet,
  HeartHandshake,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useGetCampaignBySlugQuery } from '../services/healthApi';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { SEO } from '../components/common/SEO';

export const CampaignDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: campaign, isLoading } = useGetCampaignBySlugQuery(slug || '');

  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeMobile, setPledgeMobile] = useState('');
  const [pledgeGroup, setPledgeGroup] = useState('O+');
  const [isPledged, setIsPledged] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading campaign details...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Campaign Not Found</h2>
        <p className="text-xs text-slate-500">The requested blood drive could not be located.</p>
        <Link to="/campaign">
          <Button variant="outline" size="sm">
            Back to Campaigns
          </Button>
        </Link>
      </div>
    );
  }

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim() || pledgeMobile.length !== 10) {
      toast.error('Please enter your full name and 10-digit mobile number.');
      return;
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    toast.success(`Thank you, ${pledgeName}! Your pledge to attend this blood drive has been confirmed.`);
    setIsPledged(true);
    setIsPledgeModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <SEO
        title={`${campaign.title} | Blood Donation Campaign`}
        description={`${campaign.title} on ${campaign.date} at ${campaign.venue}. Organized by ${campaign.organizerName}. Join the voluntary donor drive.`}
        image={campaign.bannerImage}
        keywords={`blood donation camp ${campaign.district}, ${campaign.name}, blood drive Nepal, donate blood ${campaign.venue}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": campaign.title,
          "description": campaign.description,
          "location": {
            "@type": "Place",
            "name": campaign.venue,
            "address": campaign.organizerAddress
          },
          "organizer": {
            "@type": "Organization",
            "name": campaign.organizerName,
            "telephone": campaign.organizerPhone,
            "email": campaign.organizerEmail
          }
        }}
      />
      {/* Back button */}
      <div>
        <Link
          to="/campaign"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Campaigns</span>
        </Link>
      </div>

      {/* Banner Image */}
      <div className="h-64 sm:h-96 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative">
        <img
          src={campaign.bannerImage}
          alt={campaign.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-md text-xs font-bold text-red-700 shadow-xs">
          {campaign.status}
        </div>
      </div>

      {/* Content Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-600">
          <Droplet className="w-4 h-4 fill-current" />
          <span>{campaign.district} Blood Transfusion Initiative</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {campaign.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {campaign.description}
        </p>
      </div>

      {/* Campaign Facts Strips (Chunk 1dfb2258: Date, Attendance, Venue) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-red-600" />
            <span>Date & Schedule</span>
          </div>
          <div className="text-sm font-bold text-slate-900 pt-1">
            {campaign.date}
          </div>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>Venue / Location</span>
          </div>
          <div className="text-sm font-bold text-slate-900 pt-1">
            {campaign.venue}
          </div>
        </Card>

        <Card className="p-5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Users className="w-4 h-4 text-red-600" />
            <span>Attendance & Units</span>
          </div>
          <div className="text-sm font-bold text-slate-900 pt-1">
            {campaign.attendance} {campaign.unitsCollected ? `(${campaign.unitsCollected} Units)` : ''}
          </div>
        </Card>
      </div>

      {/* Organizer Information (Chunk 1dfb2258) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900">
            Organizing Committee & Contacts
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                <strong>Organized By:</strong> {campaign.organizerName}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                <strong>Address:</strong> {campaign.organizerAddress}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                <strong>Inquiry Hotline:</strong> {campaign.organizerPhone}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                <strong>Email:</strong> {campaign.organizerEmail}
              </span>
            </div>
          </div>

          <div className="pt-2">
            {isPledged ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You have pledged to attend this blood drive! See you there.</span>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsPledgeModalOpen(true)}
              >
                <HeartHandshake className="w-4 h-4 mr-2" />
                <span>Pledge to Donate at This Camp</span>
              </Button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm">
              Pre-Donation Checklist
            </h3>
            <ul className="space-y-2 list-disc list-inside leading-relaxed">
              <li>Drink 2 to 3 glasses of clean water or juice prior to arriving.</li>
              <li>Eat a nutritious, balanced meal within 2 hours; do not arrive on an empty stomach.</li>
              <li>Carry a government-issued photo ID (Citizenship, Driver’s License, or Student ID).</li>
              <li>Ensure at least 6–8 hours of restful sleep the preceding night.</li>
            </ul>
          </div>

          <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-3 text-xs text-slate-700">
            <h3 className="font-bold text-emerald-950 text-sm">
              Post-Donation Care
            </h3>
            <ul className="space-y-2 list-disc list-inside leading-relaxed text-emerald-900">
              <li>Relax in the refreshment recovery area for 10–15 minutes after phlebotomy.</li>
              <li>Keep the adhesive bandage dry and intact on the arm for at least 4 hours.</li>
              <li>Avoid vigorous physical exercise or heavy weight-lifting for the next 24 hours.</li>
              <li>Increase fluid intake throughout the day (water, herbal tea, juice, or coconut water).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pledge Modal */}
      <Modal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        title="Pledge to Donate Blood"
        description={`Confirm your intent to participate at ${campaign.title}`}
      >
        <form onSubmit={handlePledgeSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={pledgeName}
              onChange={(e) => setPledgeName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Blood Group
              </label>
              <select
                value={pledgeGroup}
                onChange={(e) => setPledgeGroup(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (10 digits) *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="e.g. 9845012345"
                value={pledgeMobile}
                onChange={(e) => setPledgeMobile(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPledgeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm Pledge
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
