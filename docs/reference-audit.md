# Reference Audit: Nepal Health Sewa (https://nepalhealthsewa.netlify.app/)

## 1. Executive Summary
Nepal Health Sewa is a community-driven healthcare platform originating in Birgunj, Parsa, Nepal. Its core mission is encapsulated in its slogan: **"Donate Blood, Save Life"**. The platform coordinates voluntary blood donation, oxygen cylinder logistics during respiratory crises, 24/7 emergency services, COVID-19 health guidelines, community campaigns, and medical volunteer networks.

This audit documents every route, content element, data schema, UI pattern, and interaction mechanism extracted from the live reference application bundles, establishing a blueprint for a modern, high-performance React + TypeScript rebuild.

---

## 2. Page & Route Inventory

| Route | Original Component / Chunk | Purpose & Scope | Verified Status |
| :--- | :--- | :--- | :--- |
| `/` | `chunk-ef76b896` (Home) | Hero banner, quick action tiles, live blood stats, interactive tools quick access, featured campaigns, team highlights, feedback form. | Verified |
| `/about` | `chunk-40839bc3` (About Us) | Mission, 4 pillars: Supportive & Helpful, Strengthen & Empowerment, Sharing & Caring, Bring Smile. | Verified |
| `/services` | `chunk-7a86f90e` (Services) | Blood donation, Oxygen cylinder assistance, Ambulance dispatch, Medicine assistance, Doctor tele-support. | Verified |
| `/blood-bank` or `/donor` | `chunk-30c7d5fc` (Become a Donor) | Blood Donor Directory with filters (blood group, district) + Donor Registration Form with eligibility requirements. | Verified & Upgraded |
| `/emergency` | `chunk-2d2102d5` (Emergency Sewa 24*7) | Emergency request submission (Patient, Hospital, Contact, Sewa type, Blood type) + emergency hotline directory. | Verified |
| `/campaign` | `chunk-ac3750e4` (Campaigns) | Grid of blood donation drives, health awareness camps across Nepal (Birgunj, Janakpur, Chitwan, Kathmandu). | Verified |
| `/campaign/:title` | `chunk-1dfb2258` (Single Campaign) | Campaign details: Date, Venue, Expected/Actual Attendance, Organizer Contacts, Registration/Pledge. | Verified |
| `/covid-guidlines` | `chunk-96da60b6` (Covid Guidelines) | Most common, Less common, and Serious symptoms, preventive hygiene checklist, mask usage guide, home care. | Verified |
| `/team` | `chunk-ffcf5c42` (Our Team) | Executive leadership (Sangam Kumar Pandit, Ayub Alam, Megha Karn, Bikash Singh Rajput) and volunteer list. | Verified |
| `/gallery` | `chunk-9a31719c` (Gallery) | Image showcase of real community blood donation drives, relief distributions, and health camps. | Verified |
| `/contact` | `chunk-5d288233` (Contact Us) | Inquiry form, Ghantaghar Birgunj headquarters location, email, phone lines, social channels. | Verified |
| `/health-tools` | New / Suite | Unified directory for verified clinical and lifestyle health calculators. | Added per prompt |
| `/health-tools/bmi` | Clinical tool | Adult Body Mass Index calculator with metric/imperial toggle, WHO Asian cutoffs, health categories. | Added per prompt |
| `/health-tools/blood-pressure` | Clinical tool | Systolic/diastolic evaluator based on AHA/ACC & Nepal MoHP guidelines with urgency alerts. | Added per prompt |
| `/health-tools/meal-planner` | Lifestyle tool | Nepali nutrition planner (Dal, Bhat, Tarkari, Dhido, seasonal produce) tailored to goals & calorie targets. | Added per prompt |
| `/health-tools/sleep-tracker` | Lifestyle tool | Sleep duration & debt calculator across midnight with visual weekly sleep log and hygiene advice. | Added per prompt |
| `/health-tools/exercise` | Educational tool | Physical activity benchmarks across age groups (WHO recommendations) with safe routines. | Added per prompt |
| `/diseases` | Educational directory | Searchable health conditions directory (Dengue, Typhoid, Diabetes, Hypertension, COPD, Covid-19). | Added per prompt |
| `/diseases/:slug` | Disease detail | Comprehensive symptom breakdown, early warning signs, Nepali health guidelines, and clinical sources. | Added per prompt |
| `/privacy-policy` | Legal | Sensitive medical and donor data privacy guidelines, zero unconsented data sale. | Added per prompt |
| `/terms` | Legal | Platform terms of service, medical disclaimer, non-replacement of emergency 102/112 services. | Added per prompt |

---

## 3. Brand Identity & Design System

- **Brand Slogan**: *"Donate Blood, Save Life"*
- **Primary Colors**:
  - Medical Crimson Red: `#dc2626` / `#b91c1c` (Blood donation, critical alerts, urgency)
  - Health Emerald Green: `#059669` / `#047857` (Wellness, active donor availability, verified badges)
  - Medical Slate Canvas: `#f8fafc` / `#0f172a` (Clean clinic aesthetics, high readability)
- **Typography**:
  - Display / Headings: `Outfit` / `Plus Jakarta Sans`
  - Body: `Plus Jakarta Sans`, sans-serif
  - Tabular Numbers: `font-mono tabular-nums` for medical metrics, donor counts, blood pressure values
- **Spacing & Layout**:
  - Responsive container with 1200px / 1440px desktop baseline
  - Mobile-first adaptive touch targets ($\ge 44\text{px}$)

---

## 4. Key Interactive Workflows
1. **Donor Directory & Search**: Real-time filtering by blood group (A+, A-, B+, B-, AB+, AB-, O+, O-) and Nepal districts (Parsa, Chitwan, Kathmandu, Lalitpur, Morang, Kaski, Dhanusha, etc.).
2. **Donor Registration**: Validation for age (18-60), weight ($\ge 45\text{kg}$), 10-digit mobile number, email, blood type, and consent.
3. **Emergency Sewa 24*7**: Multi-step or structured emergency intake for blood requests, oxygen cylinder needs, or ambulance assistance. Immediate local hotline directory.
4. **Interactive Clinical Calculators**: Real calculation engines with instant input validation, unit conversions, and medical context disclaimers.
5. **Redux Toolkit + RTK Query Store**: Normalized state, cached endpoints for donors, campaigns, emergency tickets, and healthcare services.
