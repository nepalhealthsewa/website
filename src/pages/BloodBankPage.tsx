import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Droplet,
  Search,
  Phone,
  MapPin,
  CheckCircle,
  Calendar,
  AlertCircle,
  HeartHandshake,
  UserCheck,
  Sparkles,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useGetDonorsQuery, useAddDonorMutation } from '../services/healthApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { BloodGroup, Gender } from '../types';
import { SEO } from '../components/common/SEO';

export const BloodBankPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'directory';
  const initialGroup = searchParams.get('group') || 'ALL';

  const [activeTab, setActiveTab] = useState<'directory' | 'register'>(initialTab);
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);

  // Sync tab and blood group with query params
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'register') {
      setActiveTab('register');
    } else if (tabParam === 'directory') {
      setActiveTab('directory');
    }

    const groupParam = searchParams.get('group');
    if (groupParam) {
      setSelectedGroup(groupParam);
      if (tabParam !== 'register') {
        setActiveTab('directory');
      }
    }
  }, [searchParams]);

  const { data, isLoading } = useGetDonorsQuery({
    bloodGroup: selectedGroup,
    district: selectedDistrict,
    search: searchQuery,
    availableOnly,
  });

  const [addDonor, { isLoading: isRegistering }] = useAddDonorMutation();

  // Registration Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bloodGroup: 'O+' as BloodGroup,
    gender: 'Male' as Gender,
    dob: '',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '',
    email: '',
    agreed: false,
  });

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  const districts = [
    'Parsa',
    'Kathmandu',
    'Lalitpur',
    'Bhaktapur',
    'Dhanusha',
    'Chitwan',
    'Kaski',
    'Morang',
    'Rupandehi',
    'Jhapa',
  ];

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!formData.mobile.trim() || formData.mobile.length !== 10 || isNaN(Number(formData.mobile))) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.dob) {
      toast.error('Please select your date of birth.');
      return;
    }

    // Age validation (18-60)
    const birthDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18 || age > 65) {
      toast.error(`Donors must be between 18 and 65 years old. Your calculated age is ${age}.`);
      return;
    }

    if (!formData.agreed) {
      toast.error('Please confirm your consent to voluntary donation calls.');
      return;
    }

    try {
      await addDonor({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        age,
        dob: formData.dob,
        district: formData.district,
        city: formData.city.trim() || formData.district,
        mobile: formData.mobile.trim(),
        email: formData.email.trim() || undefined,
      }).unwrap();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      toast.success(
        'Thank you! You have been registered as a voluntary blood donor in Nepal Health Sewa.'
      );

      // Reset form and switch to directory
      setFormData({
        firstName: '',
        lastName: '',
        bloodGroup: 'O+',
        gender: 'Male',
        dob: '',
        district: 'Parsa',
        city: 'Birgunj',
        mobile: '',
        email: '',
        agreed: false,
      });

      setActiveTab('directory');
    } catch {
      toast.error('Failed to register. Please check your connection.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Voluntary Blood Donor Directory & Registration"
        description="Search active blood donors by blood group (A+, A-, B+, B-, AB+, AB-, O+, O-) and districts across Nepal, or register to donate blood and save lives."
        keywords="blood donor directory Nepal, blood group search, find blood donors Birgunj, Parsa blood bank, donate blood Nepal"
      />
      {/* Header and Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-600 mb-1.5">
            <Droplet className="w-4 h-4 fill-current" />
            <span>Voluntary Blood Transfusion Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Blood Bank & Donor Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Locate voluntary blood donors across Nepal or register as a hero to be called when life-saving blood is needed in emergency hospital wards.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => {
              setActiveTab('directory');
              setSearchParams({});
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'directory'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Donor Directory
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setSearchParams({ tab: 'register' });
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Become a Donor</span>
          </button>
        </div>
      </div>

      {activeTab === 'directory' ? (
        <div className="space-y-8">
          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search by name/city */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search donor name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              {/* District Filter */}
              <div>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                >
                  <option value="ALL">All Districts in Nepal</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d} District
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Group Quick Select */}
              <div>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white font-semibold"
                >
                  <option value="ALL">All Blood Groups</option>
                  {bloodGroups.map((g) => (
                    <option key={g} value={g}>
                      Blood Group {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Available Only Toggle */}
              <div className="flex items-center justify-between sm:justify-start gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                <label
                  htmlFor="available-toggle"
                  className="text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Available for immediate donation only
                </label>
                <input
                  id="available-toggle"
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Blood Group Segmented Quick Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-semibold uppercase shrink-0 mr-1">
                Quick Filter:
              </span>
              <button
                onClick={() => setSelectedGroup('ALL')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer shrink-0 ${
                  selectedGroup === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer shrink-0 ${
                    selectedGroup === group
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-900 font-mono">{data?.donors.length || 0}</strong> verified voluntary donors
            </span>
            {selectedGroup !== 'ALL' || selectedDistrict !== 'ALL' || searchQuery ? (
              <button
                onClick={() => {
                  setSelectedGroup('ALL');
                  setSelectedDistrict('ALL');
                  setSearchQuery('');
                  setAvailableOnly(false);
                }}
                className="text-red-600 font-semibold hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            ) : null}
          </div>

          {/* Donor Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-48 bg-slate-100 rounded-xl animate-pulse border border-slate-200"
                />
              ))}
            </div>
          ) : data?.donors && data.donors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.donors.map((donor) => (
                <Card key={donor.id} hoverEffect className="p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900">
                            {donor.firstName} {donor.lastName}
                          </h3>
                          {donor.verified && (
                            <span title="Verified voluntary donor">
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            {donor.city}, {donor.district}
                          </span>
                        </div>
                      </div>

                      {/* Blood Group Badge */}
                      <div className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200/60 font-mono font-extrabold text-base shrink-0 shadow-2xs">
                        {donor.bloodGroup}
                      </div>
                    </div>

                    {/* Unboxed Metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <span>Age: {donor.age} yrs</span>
                      <span aria-hidden="true">·</span>
                      <span>{donor.gender}</span>
                      <span aria-hidden="true">·</span>
                      <span className={donor.isAvailable ? 'text-emerald-700 font-semibold' : 'text-slate-500'}>
                        {donor.isAvailable ? 'Available Now' : 'Donated Recently'}
                      </span>
                    </div>

                    {donor.lastDonated && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Last donation: {donor.lastDonated}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Call button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="text-xs text-slate-500 font-mono">
                      {donor.mobile.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                    </div>
                    <a
                      href={`tel:${donor.mobile}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-lg transition-all shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Donor</span>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Droplet}
              title="No matching blood donors found"
              description="No voluntary donors currently match your filter criteria. Try adjusting your district, blood group, or contact our 24/7 emergency desk."
              actionText="Reset Search Filters"
              onAction={() => {
                setSelectedGroup('ALL');
                setSelectedDistrict('ALL');
                setSearchQuery('');
                setAvailableOnly(false);
              }}
            />
          )}
        </div>
      ) : (
        /* Become a Donor Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                Join the Network
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Volunteer Blood Donor Registration
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your personal details are used strictly to coordinate urgent transfusion needs for patients in Nepal.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sangam"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pandit"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white font-bold"
                  >
                    {bloodGroups.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Municipality *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Birgunj, Parsa"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
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
                    placeholder="e.g. donor@nepalhealthsewa.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I confirm that I meet the basic blood donation eligibility criteria (aged 18–65, weight ≥ 45 kg, no blood donation in past 90 days), and consent to being contacted for voluntary blood emergencies.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isRegistering}
              >
                Register as Voluntary Blood Donor
              </Button>
            </form>
          </div>

          {/* Eligibility Criteria Side Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-red-50 border border-red-200/80 rounded-2xl p-6 text-red-950">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-base text-red-900">
                  Donor Eligibility Criteria
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-red-900/90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span><strong>Age:</strong> Between 18 and 65 years old.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span><strong>Weight:</strong> At least 45 kg (100 lbs) for a 350ml or 450ml donation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span><strong>Donation Interval:</strong> At least 90 days (3 months) since your last blood donation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span><strong>Hemoglobin:</strong> Minimum 12.5 g/dL (tested prior to draw).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span><strong>Health Status:</strong> Free from active fever, cold, infection, or major dental extraction in the past 72 hours.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Why Register With Us?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                In Nepal, seasonal shortages often leave families running between blood banks. By joining Nepal Health Sewa, you belong to an active network that directly helps hospitals like Narayani Hospital, Bir Hospital, and regional health centers.
              </p>
              <div className="text-xs text-slate-500 font-medium">
                Need emergency blood right now? <br />
                <a href="tel:051522137" className="text-red-600 font-bold hover:underline">
                  Call Parsa Blood Bank (051-522137)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
