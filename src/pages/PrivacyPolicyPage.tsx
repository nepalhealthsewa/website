import React from 'react';
import { Lock, Eye, Database } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/common/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      <SEO
        title="Privacy Policy & Donor Data Protection"
        description="Learn how Nepal Health Sewa safeguards blood donor contact details, medical emergency records, and volunteer information with strict confidentiality."
        keywords="Nepal Health Sewa privacy policy, blood donor data protection Nepal, medical confidentiality Birgunj"
      />
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 block mb-1">
          Confidentiality & Data Protection
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Last updated: January 2025 · Nepal Health Sewa (Birgunj, Parsa)
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <p>
          At Nepal Health Sewa, we are deeply committed to respecting the privacy and safeguarding the personal contact information of our voluntary donors, patients, and community volunteers.
        </p>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>1. What Information We Collect</span>
          </h2>
          <p>
            When registering as a voluntary blood donor or requesting emergency sewa, we collect essential operational fields:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full Name, Blood Group, Age, and Gender</li>
            <li>Mobile phone number for direct contact in medical emergencies</li>
            <li>Geographical location (City and District in Nepal)</li>
            <li>Hospital and clinical notes related specifically to emergency requests</li>
          </ul>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>2. How Your Information is Used</span>
          </h2>
          <p>
            We use your contact number and blood group solely to connect voluntary donors with hospital patients who have an urgent transfusion need. We will <strong>NEVER</strong> sell, lease, commercialize, or share your contact information with third-party advertisers, insurance marketers, or lead-generation agencies.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>3. In-Browser Privacy for Health Tools</span>
          </h2>
          <p>
            When utilizing our interactive health calculators (BMI Calculator, Blood Pressure Evaluator, Nepali Meal Planner, and Sleep Tracker), all physiological computations and personal inputs execute client-side inside your web browser. No medical metrics or personal biometric inputs are transmitted to external ad networks or commercial servers.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-600" />
            <span>4. Donor Rights, Pause Mode, and Record Removal</span>
          </h2>
          <p>
            Donors maintain complete autonomy over their information. You have the right to withdraw from the voluntary donor directory, switch your availability status to "Paused" (for example after a recent donation or while traveling), or request complete deletion of your record by emailing <strong>privacy@nepalhealthsewa.org</strong> or calling our Birgunj desk at <strong>+977 9845012345</strong>.
          </p>
        </Card>
      </div>
    </div>
  );
};
