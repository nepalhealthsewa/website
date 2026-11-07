# Nepal Health Sewa (नेपाल हेल्थ सेवा)

> **"Donate Blood, Save Life"**
> Rebuilt and modernized full-stack healthcare web application inspired by the authentic [Nepal Health Sewa](https://nepalhealthsewa.netlify.app/) community initiative in Birgunj, Parsa, Nepal.

---

## 1. Project Overview & Architectural Vision
Nepal Health Sewa is a dedicated healthcare, voluntary blood donation, and emergency coordination platform. Originally founded by youth in Birgunj to bridge the gap between hospital blood banks and voluntary donors, this rebuilt version preserves 100% of the authentic brand identity, pillars, and community contacts while upgrading the application to a modern, robust, and accessible technology stack.

### Key Highlights
- **100% Authentic Reference Replication**: Preserves the founding values ("Supportive & Helpfull", "Strengthen & Empowerment", "Sharing & Caring", "Bring Smile"), verified contacts (Ghantaghar Birgunj headquarters), and leadership profiles (Sangam Kumar Pandit, Ayub Alam, Megha Karn, Bikash Singh Rajput).
- **Interactive Blood Bank Directory**: Real-time searchable and filterable database by blood group (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`) and districts across Nepal (Parsa, Kathmandu, Dhanusha, Chitwan, Morang, Kaski, etc.).
- **Donor Registration Workflow**: Form validation (age 18–65, weight ≥ 45 kg, donation intervals), automatic age calculation, local persistence, and celebratory confetti confirmation.
- **24/7 Emergency Sewa**: Emergency intake wizard for immediate blood, oxygen, and ambulance dispatch, generating tracking tickets (e.g. `NHS-2025-XXXX`) and direct 1-click dials for national hotlines (Ambulance `102`, Police `100`, Red Cross `01-4288485`, Narayani Hospital `051-521993`).
- **Comprehensive Health Calculators**:
  - **Adult BMI Calculator**: Metric & Imperial units, WHO international cutoffs, WHO South Asian cardiometabolic risk thresholds (Overweight ≥ 23.0, Obese ≥ 27.5), and visual gauge indicators.
  - **Blood Pressure Evaluator**: AHA/ACC & Nepal MoHP PEN guidelines with urgent hypertensive crisis alarms for dangerous readings.
  - **Nepali Dietary Meal Planner**: Nutrition recommendations featuring traditional foods (Dal, Bhat, Tarkari, Dhido, Gundruk, Kwati, rayo ko saag, sprouted chana).
  - **Sleep Duration & Debt Tracker**: Correct overnight interval calculation across midnight, weekly trend logs with interactive Recharts bar visualization, and sleep debt metrics.
  - **Physical Activity Guide**: WHO age-stratified activity targets with everyday community routines.
- **Disease & Infection Knowledge Base**: Clinical guide for Dengue Fever, Typhoid, Type 2 Diabetes, Hypertension, and COPD with Nepal MoHP testing context.
- **COVID-19 Health Advisory**: Original prevention guidelines, symptoms triage, and mask-fitting best practices.

---

## 2. Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Lucide React Icons
- **State Management**: Redux Toolkit (RTK)
- **Data Fetching & Cache**: RTK Query with `fetchBaseQuery` and simulated persistent client storage adapter
- **Visuals & Charts**: Recharts + Canvas Confetti
- **Notifications**: Sonner Toast Provider
- **Testing**: Vitest automated unit testing suite

---

## 3. Directory Structure

```
├── docs/
│   ├── reference-audit.md       # Full inventory of original chunks, texts, and routes
│   ├── architecture.md          # State architecture, routing, and design guidelines
│   └── api-contract.md          # Typed API specifications for endpoints
├── src/
│   ├── assets/
│   │   └── images/              # High-fidelity photos generated for Nepal health contexts
│   ├── components/
│   │   ├── layout/              # Header (Top Bar Contract), Footer, MobileNav
│   │   └── ui/                  # Button, Card, Modal, EmptyState
│   ├── data/
│   │   └── mockData.ts          # Authentic mock data (Donors, Campaigns, Diseases, Team)
│   ├── features/ & pages/
│   │   ├── HomePage.tsx         # Hero, quick tools, compatibility matrix, 4 pillars
│   │   ├── BloodBankPage.tsx    # Donor search, filters, registration form
│   │   ├── EmergencyPage.tsx    # Emergency ticket intake & hotline directory
│   │   ├── ServicesPage.tsx     # 6 healthcare services overview
│   │   ├── AboutPage.tsx        # Story, Birgunj headquarters, 4 guiding pillars
│   │   ├── CampaignsPage.tsx    # Active & past blood donation camps
│   │   ├── CampaignDetailPage.tsx # Camp details, attendance, venue, pledge modal
│   │   ├── CovidGuidelinesPage.tsx # Symptoms triage, mask guidelines, hygiene
│   │   ├── TeamPage.tsx         # Founders, core coordinators, and youth volunteers
│   │   ├── GalleryPage.tsx      # Community photos with lightbox modal
│   │   ├── ContactPage.tsx      # Ghantaghar office address, direct form, FAQ
│   │   ├── PrivacyPolicyPage.tsx # Medical data confidentiality guidelines
│   │   ├── TermsPage.tsx        # Non-commercial voluntary terms & medical disclaimer
│   │   ├── NotFoundPage.tsx     # Accessible 404 page
│   │   └── health-tools/        # BMI, BP, Meal Planner, Sleep Tracker, Exercise
│   ├── services/
│   │   ├── api.ts               # RTK Query root API slice
│   │   └── healthApi.ts         # Typed endpoints (donors, emergency, campaigns)
│   ├── store/
│   │   ├── index.ts             # Redux store configuration
│   │   ├── hooks.ts             # Typed useAppDispatch & useAppSelector
│   │   └── slices/              # uiSlice, toolsSlice
│   ├── test/
│   │   └── calculators.test.ts  # Automated unit tests for algorithms and Redux
│   └── types/
│       └── index.ts             # TypeScript domain entity contracts
├── index.html                   # SEO and open graph metadata
├── package.json
└── vite.config.ts
```

---

## 4. Getting Started

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or bun

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
```bash
npm test
```
Executes all 12 unit tests verifying BMI calculations, Blood Pressure classifications, sleep duration algorithms, and Redux reducers.

### Production Build
```bash
npm run build
```

---

## 5. Clinical Safety & Medical Disclaimers
Nepal Health Sewa is a non-profit volunteer health coordination initiative. Calculators and health education pages provided on the platform are designed for public health awareness and lifestyle planning. They do not constitute a clinical diagnosis, triage protocol, or emergency medical service. In life-threatening emergencies, dial **102** immediately.
