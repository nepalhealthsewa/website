import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  Heart,
  Utensils,
  ShieldAlert,
  Activity,
  Wind,
  PhoneCall,
  Moon,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronDown,
  ThumbsUp,
  Bookmark,
  Share2,
  Clock,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { HEALTH_TIPS_DATA } from '../../data/healthTipsData';
import { HealthTip, HealthTipCategory } from '../../types';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Blood Donation': Droplet,
  'Heart & BP': Heart,
  'Nutrition & Diet': Utensils,
  'Seasonal & Vector': ShieldAlert,
  'Diabetes Care': Activity,
  'Respiratory & Air': Wind,
  'First Aid & Emergency': PhoneCall,
  'Mental Health & Sleep': Moon,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Blood Donation': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'Heart & BP': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  'Nutrition & Diet': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Seasonal & Vector': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  'Diabetes Care': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Respiratory & Air': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'First Aid & Emergency': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Mental Health & Sleep': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
};

interface HealthTipsSectionProps {
  initialCategory?: HealthTipCategory;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  limit?: number;
}

export const HealthTipsSection: React.FC<HealthTipsSectionProps> = ({
  initialCategory = 'All',
  title = 'Verified Clinical & Lifestyle Health Tips',
  subtitle = 'Evidence-based preventive guidance, nutrition principles, and emergency first-aid protocols grounded in Nepal Ministry of Health (MoHP) and WHO clinical benchmarks.',
  compact = false,
  limit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<HealthTipCategory>(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);
  const [likedTips, setLikedTips] = useState<Record<string, boolean>>({});
  const [bookmarkedTips, setBookmarkedTips] = useState<Record<string, boolean>>({});

  const categories: HealthTipCategory[] = [
    'All',
    'Blood Donation',
    'Heart & BP',
    'Nutrition & Diet',
    'Seasonal & Vector',
    'Diabetes Care',
    'Respiratory & Air',
    'First Aid & Emergency',
    'Mental Health & Sleep',
  ];

  const handleToggleLike = (id: string, tipTitle: string) => {
    setLikedTips((prev) => {
      const isLiked = !prev[id];
      if (isLiked) {
        toast.success(`Marked as helpful: "${tipTitle}"`);
      }
      return { ...prev, [id]: isLiked };
    });
  };

  const handleToggleBookmark = (id: string, tipTitle: string) => {
    setBookmarkedTips((prev) => {
      const isSaved = !prev[id];
      if (isSaved) {
        toast.success(`Saved to reading list: "${tipTitle}"`);
      } else {
        toast.info(`Removed from reading list: "${tipTitle}"`);
      }
      return { ...prev, [id]: isSaved };
    });
  };

  const handleShare = (tip: HealthTip) => {
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: `${tip.title}: ${tip.keyAction}`,
        url: window.location.href,
      }).catch(() => {
        // User cancelled share
      });
    } else {
      navigator.clipboard.writeText(`${tip.title} - ${tip.keyAction} (Nepal Health Sewa)`);
      toast.success('Tip summary copied to clipboard!');
    }
  };

  const filteredTips = useMemo(() => {
    let result = HEALTH_TIPS_DATA.filter((tip) => {
      if (selectedCategory !== 'All' && tip.category !== selectedCategory) {
        return false;
      }

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchTitle = tip.title.toLowerCase().includes(query);
        const matchNepali = tip.nepaliTitle?.toLowerCase().includes(query) ?? false;
        const matchSummary = tip.summary.toLowerCase().includes(query);
        const matchAction = tip.keyAction.toLowerCase().includes(query);
        const matchBasis = tip.medicalBasis.toLowerCase().includes(query);
        const matchTags = tip.tags.some((t) => t.toLowerCase().includes(query));

        return matchTitle || matchNepali || matchSummary || matchAction || matchBasis || matchTags;
      }

      return true;
    });

    if (limit && limit > 0) {
      result = result.slice(0, limit);
    }

    return result;
  }, [selectedCategory, searchTerm, limit]);

  return (
    <section
      id="health-tips"
      className="space-y-8 scroll-mt-24"
      aria-label="Clinical Health & Lifestyle Tips"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preventative Health & Clinical Literacy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-800">
            {HEALTH_TIPS_DATA.length} Verified Topics
          </span>
          <span>•</span>
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MoHP & WHO Referenced</span>
          </span>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      {!compact && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tips (e.g. blood donation, salt, achar, chiya, dengue, snakebite, breathing, dal-bhat)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
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

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const Icon = cat !== 'All' ? CATEGORY_ICONS[cat] : BookOpen;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips Grid */}
      {filteredTips.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No health tips found matching your search
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try searching for terms like "blood", "salt", "tea", "dengue", "first aid", or click below to view all topics.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Show All Health Tips
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const Icon = CATEGORY_ICONS[tip.category] || Activity;
            const colors = CATEGORY_COLORS[tip.category] || {
              bg: 'bg-slate-50',
              text: 'text-slate-700',
              border: 'border-slate-200',
            };
            const isExpanded = expandedTipId === tip.id;
            const isLiked = likedTips[tip.id];
            const isBookmarked = bookmarkedTips[tip.id];

            return (
              <div
                key={tip.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Category and Read Time */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tip.category}</span>
                    </span>

                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{tip.readTime}</span>
                      </span>
                      {tip.featured && (
                        <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Nepali Subtitle */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {tip.title}
                    </h3>
                    {tip.nepaliTitle && (
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {tip.nepaliTitle}
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tip.summary}
                  </p>

                  {/* Key Action Callout Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Key Clinical Action:
                    </span>
                    <p className="font-semibold text-slate-800 text-xs leading-snug">
                      {tip.keyAction}
                    </p>
                  </div>

                  {/* Expandable Dos & Don'ts Drawer */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 text-xs border-t border-slate-100 animate-in fade-in duration-150">
                      {/* Recommended Dos */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-emerald-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Recommended Practice (Do's)</span>
                        </span>
                        <ul className="space-y-1 pl-4 list-disc text-slate-600 text-[11px]">
                          {tip.doList.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Don'ts */}
                      {tip.dontList && tip.dontList.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="font-bold text-rose-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Mistakes to Avoid (Don'ts)</span>
                          </span>
                          <ul className="space-y-1 pl-4 list-disc text-slate-600 text-[11px]">
                            {tip.dontList.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Medical Basis & Reference */}
                      <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-[10px] space-y-0.5">
                        <strong className="block font-bold">Medical Basis:</strong>
                        <p className="leading-relaxed">{tip.medicalBasis}</p>
                        <span className="block text-[9px] text-emerald-800 font-semibold pt-0.5">
                          Verified: {tip.verifiedBy}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Action Bar */}
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setExpandedTipId(isExpanded ? null : tip.id)}
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'Read Full Guide'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isExpanded ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(tip.id, tip.title)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isLiked
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                      title={isLiked ? 'Helpful!' : 'Mark as helpful'}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-emerald-600' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(tip.id, tip.title)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                      title={isBookmarked ? 'Saved to reading list' : 'Bookmark tip'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(tip)}
                      className="p-1.5 rounded-lg border bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Share tip"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Linked Utility Tools Strip */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Put Tips Into Practice With Interactive Health Tools</span>
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Test your vitals with our BMI Calculator (WHO Asian benchmark), Blood Pressure Stage Evaluator, and Traditional Nepali Meal Planner.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            to="/health-tools"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Launch Health Tools Suite
          </Link>
          <Link
            to="/diseases"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            Browse Clinical Diseases
          </Link>
        </div>
      </div>
    </section>
  );
};
