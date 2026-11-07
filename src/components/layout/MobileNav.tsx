import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, HeartPulse, MapPin, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMobileMenuOpen } from '../../store/slices/uiSlice';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.mobileMenuOpen);

  if (!isOpen) return null;

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Operations Dashboard', path: '/dashboard' },
    { label: 'Blood Bank Directory', path: '/blood-bank' },
    { label: 'Emergency Sewa 24*7', path: '/emergency' },
    { label: 'Health Tools Suite', path: '/health-tools' },
    { label: 'Healthcare Services', path: '/services' },
    { label: 'Blood Donation Campaigns', path: '/campaign' },
    { label: 'COVID-19 Guidelines', path: '/covid-guidlines' },
    { label: 'Diseases Care Guide', path: '/diseases' },
    { label: 'Our Team & Volunteers', path: '/team' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const handleNavigate = () => {
    dispatch(setMobileMenuOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setMobileMenuOpen(false))}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col z-10 overflow-y-auto">
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
              <span className="font-bold text-slate-900 leading-tight">Nepal Health Sewa</span>
              <span className="text-[10px] text-red-600 font-semibold">Donate Blood, Save Life</span>
            </div>
          </div>
          <button
            onClick={() => dispatch(setMobileMenuOpen(false))}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-red-50 border-b border-red-100 flex flex-col gap-2">
          <span className="text-xs font-semibold text-red-900 uppercase tracking-wider">Emergency Hotline</span>
          <a
            href="tel:102"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-600 text-white font-semibold text-sm shadow-xs hover:bg-red-700"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Ambulance (102)</span>
          </a>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleNavigate}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-red-50 text-red-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Ghantaghar, Birgunj, Parsa, Nepal</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-red-500 shrink-0" />
            <span>Dedicated to public healthcare since inception</span>
          </div>
        </div>
      </div>
    </div>
  );
};
