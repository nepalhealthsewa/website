import React from 'react';
import { Link } from 'react-router-dom';
import { HeartCrack, Home, PhoneCall } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-xs">
          <HeartCrack className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The healthcare resource, donor record, or campaign you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              <span>Return Home</span>
            </Button>
          </Link>
          <Link to="/emergency" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              <PhoneCall className="w-4 h-4 mr-2 text-red-600" />
              <span>Emergency 24*7</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
