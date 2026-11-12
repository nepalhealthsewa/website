import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, HeartPulse, MapPin, X, HeartHandshake } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMobileMenuOpen } from '../../store/slices/uiSlice';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.mobileMenuOpen);

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setMobileMenuOpen(false));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const coreLinks = [
    { label: 'Home', path: '/' },
    { label: 'Operations Dashboard', path: '/dashboard' },
    { label: 'Blood Bank & Donors', path: '/blood-bank' },
    { label: 'Emergency Sewa 24*7', path: '/emergency' },
    { label: 'Blood Donation Campaigns', path: '/campaign' },
    { label: 'Healthcare Services', path: '/services' },
  ];

  const toolLinks = [
    { label: 'Health Tools Suite', path: '/health-tools' },
    { label: 'COVID-19 Guidelines', path: '/covid-guidelines' },
    { label: 'Diseases Care Guide', path: '/diseases' },
  ];

  const communityLinks = [
    { label: 'Our Team & Volunteers', path: '/team' },
    { label: 'Field Photo Gallery', path: '/gallery' },
    { label: 'About Our Mission', path: '/about' },
    { label: 'Contact Birgunj Desk', path: '/contact' },
  ];

  const handleNavigate = () => {
    dispatch(setMobileMenuOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setMobileMenuOpen(false))}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/img/logo.af0d533f.png"
              alt="Nepal Health Sewa Logo"
              className="w-9 h-9 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
              }}
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 leading-tight font-display">
                Nepal Health Sewa
              </span>
              <span className="text-[10px] text-red-600 font-semibold">Donate Blood, Save Life</span>
            </div>
          </div>
          <button
            onClick={() => dispatch(setMobileMenuOpen(false))}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rapid Actions */}
        <div className="p-4 bg-red-50/80 border-b border-red-100 flex flex-col gap-2">
          <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider">
            24/7 Immediate Helpdesk
          </span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:102"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-red-600 text-white font-bold text-xs shadow-xs hover:bg-red-700 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ambulance (102)</span>
            </a>
            <Link
              to="/blood-bank?tab=register"
              onClick={handleNavigate}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white border border-red-200 text-red-700 font-bold text-xs shadow-xs hover:bg-red-50 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-red-600" />
              <span>Donate Blood</span>
            </Link>
          </div>
        </div>

        {/* Navigation sections */}
        <nav className="p-4 flex-1 space-y-5">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 mb-1">
              Core Services
            </span>
            <div className="space-y-0.5">
              {coreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavigate}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[42px] ${
                    location.pathname === link.path
                      ? 'bg-red-50 text-red-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 mb-1">
              Health & Clinical Guides
            </span>
            <div className="space-y-0.5">
              {toolLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavigate}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[42px] ${
                    location.pathname === link.path
                      ? 'bg-red-50 text-red-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 mb-1">
              Community & Organization
            </span>
            <div className="space-y-0.5">
              {communityLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavigate}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[42px] ${
                    location.pathname === link.path
                      ? 'bg-red-50 text-red-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-500 space-y-2 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px]">Ghantaghar, Birgunj, Parsa, Nepal</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-[11px]">Dedicated to voluntary healthcare since inception</span>
          </div>
        </div>
      </div>
    </div>
  );
};

