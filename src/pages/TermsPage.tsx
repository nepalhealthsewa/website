import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/common/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <SEO
        title="Terms of Service & Medical Disclaimer"
        description="Review the non-profit operational terms, voluntary non-commercial blood donation guidelines, and medical disclaimers of Nepal Health Sewa."
        keywords="Nepal Health Sewa terms of service, voluntary blood donation guidelines Nepal, medical disclaimer Birgunj"
      />
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          Legal & Operational Agreement
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Last updated: January 2025 · Nepal Health Sewa
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Essential Non-Medical Liability Notice:</strong> Nepal Health Sewa is a voluntary non-profit bridge coordinating community assistance. We are not a licensed hospital, ambulance operator, or blood manufacturing facility.
          </div>
        </div>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            1. Non-Commercial Voluntary Service & Legal Framework
          </h2>
          <p>
            All blood donor connections facilitated by Nepal Health Sewa are strictly voluntary, non-remunerated, and altruistic. Under the laws of Nepal and National Blood Transfusion Service (NBTS) regulations, human blood and blood components are non-commercial national assets. Donors, recipients, and intermediaries are strictly prohibited from soliciting, demanding, or accepting financial compensation or gifts for blood donation.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            2. Medical Testing and Transfusion Safety
          </h2>
          <p>
            Nepal Health Sewa does not perform laboratory cross-matching, infectious screening (HIV 1/2, Hepatitis B Surface Antigen, Hepatitis C Virus, Syphilis/VDRL, and Malaria), or phlebotomy collection. All clinical testing, blood separation, and transfusions must occur exclusively under the direct supervision of registered medical professionals at authorized blood transfusion centers (such as the Nepal Red Cross Society) and accredited hospitals.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            3. User Obligations and Emergency Ticket Accuracy
          </h2>
          <p>
            Users submitting 24/7 emergency tickets or registering as voluntary donors warrant that all submitted details (patient name, age, hospital admission, contact phone) are truthful and genuine. Submitting frivolous, malicious, or fraudulent emergency requests diverts critical volunteer resources away from dying patients and constitutes grounds for immediate platform barring and legal reporting.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            4. Limitation of Liability
          </h2>
          <p>
            While our volunteer network works tirelessly to alert donors and dispatch logistics, Nepal Health Sewa assumes no liability for donor travel delays, hospital bed shortages, cross-match rejections, or inpatient clinical outcomes. In severe medical trauma or acute respiratory failure, family members must rely primarily on official national emergency services by dialing 102 (Ambulance) or 100 (Police).
          </p>
        </Card>
      </div>
    </div>
  );
};
