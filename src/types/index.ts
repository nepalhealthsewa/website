export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Gender = 'Male' | 'Female' | 'Other';

export interface BloodDonor {
  id: string;
  firstName: string;
  lastName: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  age: number;
  dob?: string;
  district: string;
  city: string;
  mobile: string;
  email?: string;
  image?: string;
  lastDonated?: string;
  isAvailable: boolean;
  totalDonations?: number;
  verified?: boolean;
}

export type EmergencyServiceType = 'Blood' | 'Oxygen' | 'Ambulance' | 'Medicine' | 'Bed Availability';

export interface EmergencyTicket {
  id: string;
  ticketNumber: string;
  patientName: string;
  patientAge: number;
  gender: Gender;
  patientAddress: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalContact: string;
  contactName: string;
  contactAddress: string;
  contactMobile: string;
  contactEmail?: string;
  sewaType: EmergencyServiceType;
  bloodGroup?: BloodGroup;
  unitsNeeded?: number;
  urgency: 'Immediate (Within 2 hrs)' | 'Today (Within 6 hrs)' | 'Scheduled';
  message?: string;
  status: 'Pending' | 'In Progress' | 'Fulfilled' | 'Closed';
  createdAt: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  name: string;
  date: string;
  venue: string;
  district: string;
  attendance: string | number;
  unitsCollected?: number;
  bannerImage: string;
  description: string;
  organizerName: string;
  organizerAddress: string;
  organizerPhone: string;
  organizerEmail: string;
  status: 'Upcoming' | 'Completed' | 'Active';
}

export interface HealthcareService {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  badge: string;
  availability: string;
  actionText: string;
  actionLink: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  isCore: boolean;
  phone?: string;
  email?: string;
  department?: 'Leadership' | 'Emergency Operations' | 'Donor Relations' | 'Logistics' | 'Medical Advisory' | 'Youth Wing';
  status?: 'Active' | 'On Leave' | 'Inactive';
}

export type InquiryCategory =
  | 'Donor Inquiry'
  | 'Camp Organization'
  | 'Emergency Assistance'
  | 'Hospital Partnership'
  | 'General Feedback';

export type InquiryStatus = 'New' | 'In Progress' | 'Resolved' | 'Archived';
export type InquiryPriority = 'Urgent' | 'High' | 'Normal';

export interface ContactInquiry {
  id: string;
  ticketId: string;
  name: string;
  mobile: string;
  email?: string;
  category: InquiryCategory;
  message: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  assignedTo?: string;
  createdAt: string;
  responseNotes?: string;
}

export type VolunteerStatus = 'Active' | 'On Call' | 'Inactive';
export type VolunteerBadge = 'Gold Responder' | 'Youth Lead' | 'Field Medic' | 'Star Donor';

export interface VolunteerProfile {
  id: string;
  name: string;
  role: string;
  district: string;
  city: string;
  mobile: string;
  email?: string;
  bloodGroup: BloodGroup;
  status: VolunteerStatus;
  skills: string[];
  totalDrivesAttended: number;
  totalDonations: number;
  joinedDate: string;
  badge: VolunteerBadge;
  emergencyStandby: boolean;
}

export interface DiseaseInfo {
  id: string;
  slug: string;
  name: string;
  nepaliName?: string;
  category: 'Infectious & Vector-Borne' | 'Chronic & Metabolic' | 'Respiratory' | 'Cardiovascular';
  overview: string;
  symptoms: {
    common: string[];
    lessCommon?: string[];
    serious: string[];
  };
  prevention: string[];
  homeCare: string[];
  whenToSeeDoctor: string[];
  nepalGuidance: string;
  sources: string[];
  lastReviewed: string;
}

export interface SleepRecord {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  durationHours: number;
  quality: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface MealRecommendation {
  mealType: 'Breakfast' | 'Lunch' | 'Afternoon Snack' | 'Dinner';
  title: string;
  nepaliName?: string;
  items: string[];
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  notes: string;
}

export type MedicalServiceCategory =
  | 'Hospital'
  | 'Blood Bank'
  | 'Emergency Sewa'
  | 'Ambulance'
  | 'Oxygen & Critical Care';

export type MedicalRegion =
  | 'Birgunj & Parsa'
  | 'Madhesh Province'
  | 'Kathmandu Valley'
  | 'Koshi Province'
  | 'Gandaki Province'
  | 'Lumbini Province'
  | 'Karnali & Sudurpashchim'
  | 'National / Toll-Free';

export interface MedicalServiceContact {
  id: string;
  name: string;
  nepaliName?: string;
  category: MedicalServiceCategory;
  primaryPhone: string;
  alternatePhone?: string;
  tollFree?: string;
  tel: string;
  address: string;
  district: string;
  city: string;
  province: string;
  region: MedicalRegion;
  operatingHours: string;
  is24x7: boolean;
  verified: boolean;
  capabilities: string[];
  description: string;
  website?: string;
}

export type HealthTipCategory =
  | 'All'
  | 'Blood Donation'
  | 'Heart & BP'
  | 'Nutrition & Diet'
  | 'Seasonal & Vector'
  | 'Diabetes Care'
  | 'Respiratory & Air'
  | 'First Aid & Emergency'
  | 'Mental Health & Sleep';

export interface HealthTip {
  id: string;
  title: string;
  nepaliTitle?: string;
  category: Exclude<HealthTipCategory, 'All'>;
  summary: string;
  keyAction: string;
  doList: string[];
  dontList?: string[];
  medicalBasis: string;
  verifiedBy: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
}



