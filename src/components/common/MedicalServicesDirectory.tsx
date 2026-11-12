import React, { useState, useMemo } from 'react';
import {
  Building2,
  Droplet,
  ShieldAlert,
  Ambulance,
  Wind,
  Phone,
  PhoneCall,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  Copy,
  Check,
  Info,
  Compass,
} from 'lucide-react';
import { toast } from 'sonner';
import { MEDICAL_SERVICES_CONTACTS } from '../../data/medicalContactsData';
import { MedicalServiceCategory } from '../../types';

const CATEGORY_CONFIG: Record<
  MedicalServiceCategory,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
  }
> = {
  Hospital: {
    label: 'Hospitals & Medical Centers',
    icon: Building2,
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-200/80',
  },
  'Blood Bank': {
    label: 'Blood Banks & Transfusion',
    icon: Droplet,
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    badgeText: 'text-red-700',
    borderColor: 'border-red-200/80',
  },
  'Emergency Sewa': {
    label: 'Emergency Sewa & Helplines',
    icon: ShieldAlert,
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    badgeText: 'text-amber-800',
    borderColor: 'border-amber-200/80',
  },
  Ambulance: {
    label: 'Ambulance Services',
    icon: Ambulance,
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-700',
    borderColor: 'border-emerald-200/80',
  },
  'Oxygen & Critical Care': {
    label: 'Oxygen & Critical Care',
    icon: Wind,
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'text-purple-700',
    borderColor: 'border-purple-200/80',
  },
};

const RAPID_HOTLINES = [
  { label: 'Ambulance', number: '102', tel: 'tel:102', tag: 'Toll-Free', color: 'from-red-600 to-rose-600 text-white' },
  { label: 'Police', number: '100', tel: 'tel:100', tag: 'Security', color: 'from-blue-600 to-indigo-600 text-white' },
  { label: 'Fire Service', number: '101', tel: 'tel:101', tag: 'Rescue', color: 'from-amber-600 to-orange-600 text-white' },
  { label: 'Narayani Hosp.', number: '051-521993', tel: 'tel:051521993', tag: 'Birgunj', color: 'from-slate-800 to-slate-900 text-white' },
  { label: 'Parsa Blood Bank', number: '051-522137', tel: 'tel:051522137', tag: 'Red Cross', color: 'from-rose-700 to-red-800 text-white' },
  { label: 'Health Sewa Desk', number: '+977 9845012345', tel: 'tel:+9779845012345', tag: '24/7 Volunteer', color: 'from-red-600 to-red-700 text-white' },
];

export const MedicalServicesDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [only24x7, setOnly24x7] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return ['All', 'Hospital', 'Blood Bank', 'Emergency Sewa', 'Ambulance', 'Oxygen & Critical Care'];
  }, []);

  const regions: string[] = useMemo(() => {
    return [
      'All',
      'Birgunj & Parsa',
      'Madhesh Province',
      'Kathmandu Valley',
      'Koshi Province',
      'Gandaki Province',
      'Lumbini Province',
      'Karnali & Sudurpashchim',
      'National / Toll-Free',
    ];
  }, []);

  // Dynamic list of cities based on current region
  const availableCities = useMemo(() => {
    const list = new Set<string>();
    MEDICAL_SERVICES_CONTACTS.forEach((contact) => {
      if (selectedRegion === 'All' || contact.region === selectedRegion) {
        if (contact.city && contact.city !== 'Nationwide' && contact.city !== 'All 77 Districts') {
          list.add(contact.city);
        }
      }
    });
    return ['All', ...Array.from(list).sort()];
  }, [selectedRegion]);

  const handleCopyPhone = (number: string, id: string, name: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(number);
      setCopiedId(id);
      toast.success(`Copied phone number for ${name}: ${number}`);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      toast.info(`Phone: ${number}`);
    }
  };

  const filteredContacts = useMemo(() => {
    return MEDICAL_SERVICES_CONTACTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Region filter
      if (selectedRegion !== 'All' && item.region !== selectedRegion) {
        return false;
      }

      // City filter
      if (selectedCity !== 'All' && item.city !== selectedCity) {
        return false;
      }

      // 24x7 filter
      if (only24x7 && !item.is24x7) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesNepali = item.nepaliName?.toLowerCase().includes(query) ?? false;
        const matchesPhone = item.primaryPhone.includes(query) || (item.alternatePhone?.includes(query) ?? false);
        const matchesCity = item.city.toLowerCase().includes(query) || item.district.toLowerCase().includes(query);
        const matchesProvince = item.province.toLowerCase().includes(query);
        const matchesAddress = item.address.toLowerCase().includes(query);
        const matchesCapabilities = item.capabilities.some((c) => c.toLowerCase().includes(query));
        const matchesDesc = item.description.toLowerCase().includes(query);

        return (
          matchesName ||
          matchesNepali ||
          matchesPhone ||
          matchesCity ||
          matchesProvince ||
          matchesAddress ||
          matchesCapabilities ||
          matchesDesc
        );
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedRegion, selectedCity, only24x7]);

  // Count by category
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: MEDICAL_SERVICES_CONTACTS.length };
    MEDICAL_SERVICES_CONTACTS.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section
      id="medical-directory"
      className="space-y-8 scroll-mt-24"
      aria-label="Medical Services and Emergency Contacts Directory"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-700/60 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span>Nepal Multi-City Emergency Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Major Medical Services & Emergency Contacts
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Direct contacts for referral hospitals, blood banks, 24/7 ambulances, and oxygen logistics covering <strong>Birgunj, Janakpur, Biratnagar, Dharan, Kathmandu, Pokhara, Butwal, Nepalgunj, Surkhet, Dhangadhi</strong> and nationwide emergency helplines.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end shrink-0 gap-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">
                {MEDICAL_SERVICES_CONTACTS.length} Verified Facilities Listed
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Across All 7 Provinces of Nepal</span>
              </span>
            </div>
          </div>

          {/* Quick-Dial Hotlines Strip */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>1-Tap Immediate Emergency Dispatch (Priority Hotlines):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
              {RAPID_HOTLINES.map((hotline) => (
                <a
                  key={hotline.label}
                  href={hotline.tel}
                  className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${hotline.color} shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white`}
                  title={`Dial ${hotline.label} at ${hotline.number}`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold opacity-90">
                    <span>{hotline.label}</span>
                    <span className="bg-black/20 px-1.5 py-0.2 rounded text-[9px] uppercase">
                      {hotline.tag}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-extrabold tracking-tight">
                      {hotline.number}
                    </span>
                    <Phone className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by facility name, city, number, or service (e.g. Pokhara, Butwal, Biratnagar, ICU, BPKIHS, 102)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Region & City Dropdowns & 24/7 Filter */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Region/Province Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Compass className="w-4 h-4 text-red-600 shrink-0" />
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedCity('All'); // reset city on region change
                }}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
                aria-label="Filter by Province or Region"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'All' ? 'All Regions (Nationwide)' : region}
                  </option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer max-w-[150px] truncate"
                aria-label="Filter by City"
              >
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city === 'All' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setOnly24x7(!only24x7)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 ${
                only24x7
                  ? 'bg-red-50 text-red-700 border-red-300 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-red-600" />
              <span>24/7 Only</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = countsByCategory[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{cat === 'All' ? 'All Services' : cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono tabular-nums ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredContacts.length}</strong> medical service{filteredContacts.length === 1 ? '' : 's'}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {selectedRegion !== 'All' ? ` • ${selectedRegion}` : ''}
          {selectedCity !== 'All' ? ` • City: ${selectedCity}` : ''}
          {only24x7 ? ' • 24/7 only' : ''}
        </span>

        {(searchTerm || selectedCategory !== 'All' || selectedRegion !== 'All' || selectedCity !== 'All' || only24x7) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedRegion('All');
              setSelectedCity('All');
              setOnly24x7(false);
            }}
            className="text-red-600 hover:text-red-700 font-semibold cursor-pointer underline text-xs"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Directory Cards Grid */}
      {filteredContacts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No medical services match your search or location filter
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your keyword, resetting the city filter, or dial our 24/7 Nepal Health Sewa volunteer desk directly at <strong>+977 9845012345</strong>.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedRegion('All');
              setSelectedCity('All');
              setOnly24x7(false);
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            View All Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredContacts.map((contact) => {
            const config = CATEGORY_CONFIG[contact.category];
            const CategoryIcon = config.icon;
            const isCopied = copiedId === contact.id;

            return (
              <div
                key={contact.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Top Category Badge + City & 24/7 Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.badgeBg}`}
                    >
                      <CategoryIcon className="w-3.5 h-3.5" />
                      <span>{contact.category}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {contact.city}
                      </span>
                      {contact.is24x7 && (
                        <span className="text-[11px] font-bold text-emerald-700">
                          24/7 Service
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name and Nepali Subtitle */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                      {contact.name}
                    </h3>
                    {contact.nepaliName && (
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {contact.nepaliName}
                      </p>
                    )}
                  </div>

                  {/* Location & Operating Hours */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">
                        {contact.address}
                        <span className="block text-[11px] text-slate-400 mt-0.5 font-medium">
                          {contact.city}, {contact.district} • {contact.province}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-[11px] truncate">
                        {contact.operatingHours}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {contact.description}
                  </p>

                  {/* Capabilities / Facilities Chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {contact.capabilities.slice(0, 3).map((cap, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {cap}
                      </span>
                    ))}
                    {contact.capabilities.length > 3 && (
                      <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5">
                        +{contact.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact and Direct Call Action Bar */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Primary Contact:
                    </span>
                    {contact.alternatePhone && (
                      <span className="text-[10px] text-slate-400 truncate">
                        Alt: {contact.alternatePhone}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    {/* Primary Tap to Call Button */}
                    <a
                      href={contact.tel}
                      className="col-span-9 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-xl shadow-xs transition-colors"
                      title={`Call ${contact.name} at ${contact.primaryPhone}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span className="truncate">Call: {contact.primaryPhone}</span>
                    </a>

                    {/* Copy Phone Button */}
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyPhone(contact.primaryPhone, contact.id, contact.name)
                      }
                      className={`col-span-3 inline-flex items-center justify-center rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Copy phone number"
                      aria-label={`Copy phone number for ${contact.name}`}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Emergency Advisory Note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900">
            Emergency Dispatch & Regional Inter-Facility Transfers:
          </p>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            In acute situations (road accidents, cardiac arrest, respiratory failure, or severe blood loss), contact the Unified Ambulance Dispatch directly at <strong>102</strong> first. For voluntary blood donors and emergency oxygen cylinder availability, the Nepal Health Sewa volunteer desk is on call 24/7 at <strong>+977 9845012345</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
