import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './store';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HealthChatbot } from './components/chatbot/HealthChatbot';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BloodBankPage } from './pages/BloodBankPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';

import { CovidGuidelinesPage } from './pages/CovidGuidelinesPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Health Tools
import { HealthToolsIndexPage } from './pages/health-tools/HealthToolsIndexPage';
import { BmiCalculatorPage } from './pages/health-tools/BmiCalculatorPage';
import { BloodPressurePage } from './pages/health-tools/BloodPressurePage';
import { MealPlannerPage } from './pages/health-tools/MealPlannerPage';
import { SleepTrackerPage } from './pages/health-tools/SleepTrackerPage';
import { ExercisePage } from './pages/health-tools/ExercisePage';

// Diseases
import { DiseasesPage } from './pages/DiseasesPage';
import { DiseaseDetailPage } from './pages/DiseaseDetailPage';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Dedicated Administrative Layout - Completely separate from public website
  if (isDashboard) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-red-500 selection:text-white antialiased">
        <Routes>
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    );
  }

  // Public Community Website Layout
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      <Header />
      <MobileNav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Both /blood-bank and /donor route to BloodBankPage for fidelity with reference */}
          <Route path="/blood-bank" element={<BloodBankPage />} />
          <Route path="/donor" element={<Navigate to="/blood-bank?tab=register" replace />} />

          <Route path="/emergency" element={<EmergencyPage />} />

          <Route path="/campaign" element={<CampaignsPage />} />
          <Route path="/campaign/:slug" element={<CampaignDetailPage />} />

          <Route path="/covid-guidlines" element={<CovidGuidelinesPage />} />
          <Route path="/covid-guidelines" element={<Navigate to="/covid-guidlines" replace />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Health Tools Suite */}
          <Route path="/health-tools" element={<HealthToolsIndexPage />} />
          <Route path="/health-tools/bmi" element={<BmiCalculatorPage />} />
          <Route path="/health-tools/blood-pressure" element={<BloodPressurePage />} />
          <Route path="/health-tools/meal-planner" element={<MealPlannerPage />} />
          <Route path="/health-tools/sleep-tracker" element={<SleepTrackerPage />} />
          <Route path="/health-tools/exercise" element={<ExercisePage />} />

          {/* Diseases Library */}
          <Route path="/diseases" element={<DiseasesPage />} />
          <Route path="/diseases/:slug" element={<DiseaseDetailPage />} />

          {/* Legal & Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <HealthChatbot />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
