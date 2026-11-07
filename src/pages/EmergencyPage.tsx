import React, { useState } from 'react';
import {
  PhoneCall,
  AlertTriangle,
  Ambulance,
  Wind,
  Droplet,
  Building2,
  Clock,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useCreateEmergencyTicketMutation,
  useGetEmergencyTicketsQuery,
} from '../services/healthApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EMERGENCY_CONTACTS } from '../data/mockData';
import { BloodGroup, EmergencyServiceType, Gender } from '../types';
import { SEO } from '../components/common/SEO';

export const EmergencyPage: React.FC = () => {
  const [createTicket, { isLoading }] = useCreateEmergencyTicketMutation();
  const { data: tickets } = useGetEmergencyTicketsQuery();

  const [submittedTicketNumber, setSubmittedTicketNumber] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    gender: 'Male' as Gender,
    patientAddress: '',
    hospitalName: '',
    hospitalAddress: '',
    hospitalContact: '',
    contactName: '',
    contactAddress: '',
    contactMobile: '',
    contactEmail: '',
    sewaType: 'Blood' as EmergencyServiceType,
    bloodGroup: 'O+' as BloodGroup,
    unitsNeeded: 1,
    urgency: 'Immediate (Within 2 hrs)' as 'Immediate (Within 2 hrs)' | 'Today (Within 6 hrs)' | 'Scheduled',
    message: '',
  });

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  const sewaTypes: EmergencyServiceType[] = [
    'Blood',
    'Oxygen',
    'Ambulance',
    'Medicine',
    'Bed Availability',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.patientName.trim()) {
      toast.error('Please enter patient name.');
      return;
    }

    if (!formData.patientAge || isNaN(Number(formData.patientAge))) {
      toast.error('Please enter a valid patient age.');
      return;
    }

    if (!formData.hospitalName.trim()) {
      toast.error('Please specify the hospital or medical clinic name.');
      return;
    }

    if (!formData.contactMobile.trim() || formData.contactMobile.length !== 10) {
      toast.error('Please provide a valid 10-digit emergency contact phone number.');
      return;
    }

    try {
      const result = await createTicket({
        patientName: formData.patientName.trim(),
        patientAge: Number(formData.patientAge),
        gender: formData.gender,
        patientAddress: formData.patientAddress.trim(),
        hospitalName: formData.hospitalName.trim(),
        hospitalAddress: formData.hospitalAddress.trim(),
        hospitalContact: formData.hospitalContact.trim(),
        contactName: formData.contactName.trim() || formData.patientName.trim(),
        contactAddress: formData.contactAddress.trim(),
        contactMobile: formData.contactMobile.trim(),
        contactEmail: formData.contactEmail.trim() || undefined,
        sewaType: formData.sewaType,
        bloodGroup: formData.sewaType === 'Blood' ? formData.bloodGroup : undefined,
        unitsNeeded: formData.sewaType === 'Blood' ? Number(formData.unitsNeeded) : undefined,
        urgency: formData.urgency,
        message: formData.message.trim() || undefined,
      }).unwrap();

      setSubmittedTicketNumber(result.ticketNumber);
      toast.success(`Emergency ticket #${result.ticketNumber} created successfully! Our team is alerted.`);

      // Reset form
      setFormData({
        patientName: '',
        patientAge: '',
        gender: 'Male',
        patientAddress: '',
        hospitalName: '',
        hospitalAddress: '',
        hospitalContact: '',
        contactName: '',
        contactAddress: '',
        contactMobile: '',
        contactEmail: '',
        sewaType: 'Blood',
        bloodGroup: 'O+',
        unitsNeeded: 1,
        urgency: 'Immediate (Within 2 hrs)',
        message: '',
      });
    } catch {
      toast.error('Failed to dispatch emergency ticket. Please dial +977 9845012345 directly.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SEO
        title="Emergency Sewa 24*7 | Blood, Oxygen & Ambulance"
        description="24/7 emergency medical intake for blood units, oxygen cylinders, ambulance dispatch, and critical hospital transfers across Nepal."
        keywords="emergency blood Nepal, 24/7 ambulance Nepal, oxygen cylinder Birgunj, hospital emergency dispatch Nepal, dial 102 Nepal"
      />
      {/* Top Warning Banner */}
      <div className="bg-red-600 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 shrink-0 text-white mt-0.5" />
          <div>
            <h2 className="text-base font-bold">
              Immediate Life-Threatening Emergency?
            </h2>
            <p className="text-xs text-red-100 mt-0.5">
              For acute cardiac arrest, massive hemorrhage, or severe trauma, immediately dial national ambulance dispatch (102) or police (100).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <a
            href="tel:102"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-700 font-bold text-xs rounded-xl hover:bg-red-50 transition-colors shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 102 (Ambulance)</span>
          </a>
          <a
            href="tel:100"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-800 text-white font-bold text-xs rounded-xl hover:bg-red-900 transition-colors border border-red-500/40"
          >
            <span>Call 100</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Form and Emergency Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Emergency Intake Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
              24/7 Response Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Emergency Sewa Request
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Contact us in an emergency; our volunteer network will do our utmost to source blood, oxygen, and ambulance logistics.
            </p>
          </div>

          {submittedTicketNumber && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold text-sm text-emerald-900 block mb-0.5">
                  Request Dispatched: Ticket #{submittedTicketNumber}
                </span>
                Our field volunteer coordinator in Parsa/Kathmandu has been notified. Keep your phone line reachable. If you need immediate status confirmation, call <strong>+977 9845012345</strong>.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Emergency Service Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Select Emergency Service Required *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {sewaTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, sewaType: type })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.sewaType === type
                        ? 'border-red-600 bg-red-50 text-red-700 ring-2 ring-red-500/20 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {type === 'Blood' && <Droplet className="w-4 h-4 text-red-600 fill-current" />}
                    {type === 'Oxygen' && <Wind className="w-4 h-4 text-sky-600" />}
                    {type === 'Ambulance' && <Ambulance className="w-4 h-4 text-amber-600" />}
                    {type === 'Medicine' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {type === 'Bed Availability' && <Building2 className="w-4 h-4 text-indigo-600" />}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Blood Specific Requirement */}
            {formData.sewaType === 'Blood' && (
              <div className="space-y-4">
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Blood Group & Requisition Units
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-red-50/60 rounded-xl border border-red-200/60">
                  <div>
                    <label className="block text-xs font-semibold text-red-900 mb-1">
                      Blood Group Required *
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) =>
                        setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-red-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold text-slate-900"
                    >
                      {bloodGroups.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-red-900 mb-1">
                      Units / Pints Needed *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={formData.unitsNeeded}
                      onChange={(e) =>
                        setFormData({ ...formData, unitsNeeded: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-red-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Patient Information */}
            <div className="space-y-4">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Patient Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sah"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={formData.patientAge}
                    onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value as Gender })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Urgency Level *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        urgency: e.target.value as 'Immediate (Within 2 hrs)' | 'Today (Within 6 hrs)' | 'Scheduled',
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white font-semibold text-rose-700"
                  >
                    <option value="Immediate (Within 2 hrs)">Immediate (Within 2 hrs)</option>
                    <option value="Today (Within 6 hrs)">Today (Within 6 hrs)</option>
                    <option value="Scheduled">Scheduled Operation / Procedure</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hospital Information */}
            <div className="space-y-4">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Hospital / Treatment Location
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Narayani Hospital Birgunj"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Hospital Ward / Bed / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ICU Ward 3, Birgunj"
                    value={formData.hospitalAddress}
                    onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Attendant / Contact Details */}
            <div className="space-y-4">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                4. Attendant / Guardian Contact
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Attendant Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bikash Singh"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Emergency Phone Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9812345678"
                    value={formData.contactMobile}
                    onChange={(e) => setFormData({ ...formData, contactMobile: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Specific Clinical Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Doctor's requisition details, patient condition, or replacement donor notes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="destructive"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              <PhoneCall className="w-4 h-4 mr-1" />
              <span>Submit 24*7 Emergency Request</span>
            </Button>
          </form>
        </div>

        {/* Right Column: Verified Emergency Hotline Directory */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-600" />
              <span>Nepal Emergency Hotlines</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Verified phone numbers for immediate telephone dial across Nepal.
            </p>

            <div className="space-y-3">
              {EMERGENCY_CONTACTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                    <div className="text-xs font-bold text-red-600 font-mono pt-0.5">
                      {item.number}
                    </div>
                  </div>
                  <a
                    href={`tel:${item.number.replace(/\s+/g, '')}`}
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-2xs shrink-0"
                    title={`Dial ${item.number}`}
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <a
                href="/contact#medical-directory"
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Building2 className="w-4 h-4 text-rose-400" />
                <span>View Full Medical Directory (Hospitals & Ambulances)</span>
              </a>
            </div>
          </div>


          {/* Active Dispatched Tickets Feed */}
          {tickets && tickets.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Recent Emergency Tickets</span>
              </h3>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {tickets.slice(0, 5).map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-slate-800">
                      <span>{t.ticketNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-amber-100 text-amber-800 font-sans font-semibold">
                        {t.status}
                      </span>
                    </div>
                    <div className="text-slate-600 font-medium">
                      {t.sewaType} {t.bloodGroup ? `(${t.bloodGroup})` : ''} · {t.patientName} ({t.patientAge}y)
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{t.hospitalName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hospital Requisition Protocols & Preparation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
            <Droplet className="w-4 h-4 fill-current" />
            <span>Blood Bank Requisition Checklist</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            What You Must Bring to the Blood Transfusion Center
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When dispatching for emergency blood units at Narayani Hospital or Red Cross Blood Banks, ensure the attendant carries:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Doctor's Requisition Slip:</strong> Signed and stamped by the attending physician stating patient name, ward, diagnosis, blood group, component required (PRBC, Whole Blood, Platelets, FFP), and number of units.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Patient's Blood Sample:</strong> Properly labeled EDTA / plain vial containing 3–5 ml of patient blood for cross-matching and Rh antibody screening.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Hospital Inpatient Registration Card:</strong> Proving active admission at the treatment center.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Replacement Donor (If Available):</strong> If the blood bank stock is low, providing an exchange donor expedites release of required units.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider">
            <Wind className="w-4 h-4 text-sky-600" />
            <span>Oxygen & Transfusion Protocol</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Emergency Oxygen Cylinder & Transfusion Safety Rules
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard medical safety procedures for home and clinic oxygen cylinder operation and blood handling:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Upright Secured Handling:</strong> Always secure medical oxygen cylinders upright in a cart or trolley. Never drag, drop, or lubricate valves with grease or oil.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>SpO2 Titration:</strong> Maintain peripheral oxygen saturation (SpO2) at 92–96% (88–92% in COPD) using calibrated pulse oximeter monitoring.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cold-Chain Blood Transport:</strong> Whole blood and packed cells must be transferred in cold-chain cooler boxes (2°C–6°C) and administered within 30 minutes of delivery.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Bedside Verification:</strong> Verify patient name, hospital registration number, unit donor tag, and ABO/Rh cross-match label before initiating transfusion.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Major Referral Hospitals Directory */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400 block mb-1">
            Regional Emergency Infrastructure
          </span>
          <h3 className="text-xl font-bold">Major Referral Hospitals & Trauma Centers</h3>
          <p className="text-xs text-slate-300 mt-1">
            Primary emergency referral hubs across Madhesh Province, Chitwan, and Bagmati Province.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs font-bold text-white">Narayani Hospital (Birgunj)</div>
            <div className="text-[11px] text-slate-400">Government Zonal Referral · Parsa</div>
            <div className="text-xs font-mono font-bold text-red-400 pt-1">051-521993 / 051-522108</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs font-bold text-white">National Medical College (Birgunj)</div>
            <div className="text-[11px] text-slate-400">Tertiary Care & Trauma Center · Parsa</div>
            <div className="text-xs font-mono font-bold text-red-400 pt-1">051-532261 / 051-532262</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs font-bold text-white">Bharatpur Hospital (Chitwan)</div>
            <div className="text-[11px] text-slate-400">Central Referral & Trauma Hub · Chitwan</div>
            <div className="text-xs font-mono font-bold text-red-400 pt-1">056-524101 / 056-524102</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs font-bold text-white">Bir Hospital (Kathmandu)</div>
            <div className="text-[11px] text-slate-400">National Central Trauma Center · Kathmandu</div>
            <div className="text-xs font-mono font-bold text-red-400 pt-1">01-4221119 / 01-4221988</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs font-bold text-white">TU Teaching Hospital (TUTH)</div>
            <div className="text-[11px] text-slate-400">Maharajgunj Super-Specialty · Kathmandu</div>
            <div className="text-xs font-mono font-bold text-red-400 pt-1">01-4412303 / 01-4412505</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-xs font-bold text-white">Janakpur Provincial Hospital</div>
            <div className="text-[11px] text-slate-400">Provincial Referral Center · Dhanusha</div>
            <div className="text-xs font-mono font-bold text-red-400 pt-1">041-520133 / 041-520033</div>
          </div>
        </div>
      </div>
    </div>
  );
};
