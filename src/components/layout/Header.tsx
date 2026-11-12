import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCall, Menu, X, ChevronDown, HeartHandshake } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleMobileMenu } from '../../store/slices/uiSlice';

export const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  const primaryNavLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Blood Bank', path: '/blood-bank' },
    { label: 'Emergency 24*7', path: '/emergency' },
    { label: 'Campaigns', path: '/campaign' },
    { label: 'Services', path: '/services' },
    { label: 'Health Tools', path: '/health-tools' },
  ];

  const secondaryNavLinks = [
    { label: 'COVID-19 Guidelines', path: '/covid-guidelines' },
    { label: 'Diseases Guide', path: '/diseases' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/team' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isSecondaryActive = secondaryNavLinks.some((l) => isActive(l.path));

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Authentic Brand Logo from reference */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 text-slate-900 group whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 rounded-md"
        >
          <img
            src="/img/logo.af0d533f.png"
            alt="Nepal Health Sewa Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
            }}
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
              Nepal Health Sewa
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-red-600 tracking-normal hidden xs:block sm:block">
              Donate Blood, Save Life
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links (All reference menus accessible) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                isActive(link.path)
                  ? 'text-red-600 font-semibold border-b-2 border-red-600'
                  : 'hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* More Menu Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`inline-flex items-center gap-1 py-1 hover:text-slate-900 transition-colors cursor-pointer ${
                isSecondaryActive ? 'text-red-600 font-semibold border-b-2 border-red-600' : ''
              }`}
            >
              <span>More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreDropdownOpen ? 'transform rotate-180 text-red-600' : ''
                }`}
              />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {secondaryNavLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`block px-4 py-2 text-xs font-semibold transition-colors ${
                      isActive(item.path)
                        ? 'bg-red-50 text-red-700'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/blood-bank?tab=register"
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-red-600" />
            <span>Become a Donor</span>
          </Link>

          <Link
            to="/emergency"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-[0.98] transition-all shadow-xs whitespace-nowrap shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 24/7</span>
          </Link>

          <button
            type="button"
            onClick={() => dispatch(toggleMobileMenu())}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
