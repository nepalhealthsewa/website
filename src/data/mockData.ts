import {
  BloodDonor,
  Campaign,
  HealthcareService,
  TeamMember,
  DiseaseInfo,
  EmergencyTicket,
  ContactInquiry,
  VolunteerProfile,
} from '../types';

export const INITIAL_DONORS: BloodDonor[] = [
  {
    id: 'donor-1',
    firstName: 'Sangam',
    lastName: 'Pandit',
    bloodGroup: 'O+',
    gender: 'Male',
    age: 26,
    dob: '1998-05-14',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '9845012345',
    email: 'sangam@nepalhealthsewa.org',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-06-10',
    isAvailable: true,
    totalDonations: 12,
    verified: true,
  },
  {
    id: 'donor-2',
    firstName: 'Ayub',
    lastName: 'Alam',
    bloodGroup: 'B+',
    gender: 'Male',
    age: 27,
    dob: '1997-09-22',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '9804812345',
    email: 'ayub@nepalhealthsewa.org',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-05-18',
    isAvailable: true,
    totalDonations: 9,
    verified: true,
  },
  {
    id: 'donor-3',
    firstName: 'Megha',
    lastName: 'Karn',
    bloodGroup: 'A+',
    gender: 'Female',
    age: 24,
    dob: '2000-02-11',
    district: 'Dhanusha',
    city: 'Janakpur',
    mobile: '9812345678',
    email: 'megha.karn@example.com',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-07-02',
    isAvailable: true,
    totalDonations: 4,
    verified: true,
  },
  {
    id: 'donor-4',
    firstName: 'Bikash',
    lastName: 'Singh Rajput',
    bloodGroup: 'AB+',
    gender: 'Male',
    age: 28,
    dob: '1996-12-04',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '9815678901',
    email: 'bikash.rajput@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-04-12',
    isAvailable: true,
    totalDonations: 7,
    verified: true,
  },
  {
    id: 'donor-5',
    firstName: 'Prashant',
    lastName: 'Adhikari',
    bloodGroup: 'O-',
    gender: 'Male',
    age: 31,
    dob: '1993-08-19',
    district: 'Kathmandu',
    city: 'Kathmandu',
    mobile: '9841239876',
    email: 'prashant.adhikari@example.com',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-08-25',
    isAvailable: true,
    totalDonations: 14,
    verified: true,
  },
  {
    id: 'donor-6',
    firstName: 'Sunita',
    lastName: 'Tamang',
    bloodGroup: 'A-',
    gender: 'Female',
    age: 29,
    dob: '1995-04-03',
    district: 'Lalitpur',
    city: 'Patan',
    mobile: '9801987654',
    email: 'sunita.tamang@example.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-03-30',
    isAvailable: true,
    totalDonations: 5,
    verified: true,
  },
  {
    id: 'donor-7',
    firstName: 'Nitesh',
    lastName: 'Mehta',
    bloodGroup: 'B-',
    gender: 'Male',
    age: 25,
    dob: '1999-01-15',
    district: 'Morang',
    city: 'Biratnagar',
    mobile: '9823456789',
    email: 'nitesh.mehta@example.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-06-28',
    isAvailable: true,
    totalDonations: 3,
    verified: true,
  },
  {
    id: 'donor-8',
    firstName: 'Anupama',
    lastName: 'Thapa',
    bloodGroup: 'AB-',
    gender: 'Female',
    age: 33,
    dob: '1991-11-09',
    district: 'Chitwan',
    city: 'Bharatpur',
    mobile: '9845112233',
    email: 'anupama.thapa@example.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-07-20',
    isAvailable: false,
    totalDonations: 8,
    verified: true,
  },
  {
    id: 'donor-9',
    firstName: 'Dhiraj',
    lastName: 'Pandit',
    bloodGroup: 'O+',
    gender: 'Male',
    age: 23,
    dob: '2001-06-18',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '9865098765',
    email: 'dhiraj.pandit@example.com',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-07-15',
    isAvailable: true,
    totalDonations: 6,
    verified: true,
  },
  {
    id: 'donor-10',
    firstName: 'Pooja',
    lastName: 'Shrestha',
    bloodGroup: 'B+',
    gender: 'Female',
    age: 27,
    dob: '1997-03-29',
    district: 'Kaski',
    city: 'Pokhara',
    mobile: '9856012345',
    email: 'pooja.shrestha@example.com',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    lastDonated: '2024-08-01',
    isAvailable: true,
    totalDonations: 4,
    verified: true,
  }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    slug: 'ghantaghar-mega-blood-drive-birgunj',
    title: 'Ghantaghar Mega Blood Drive & Health Camp',
    name: 'Birgunj Community Blood Drive',
    date: 'Saturday, November 15, 2025',
    venue: 'Ghantaghar Chowk, Birgunj, Parsa',
    district: 'Parsa',
    attendance: '350+ Volunteers & Donors',
    unitsCollected: 184,
    bannerImage: '/img/img1.243adeed.jpg',
    description: 'Annual flagship blood donation and public health camp organized by Nepal Health Sewa in collaboration with local community youth, Nepal Red Cross Society Parsa Branch, and Narayani Hospital.',
    organizerName: 'Nepal Health Sewa Team',
    organizerAddress: 'Ghantaghar, Birgunj, Parsa, Nepal',
    organizerPhone: '+977 9845012345',
    organizerEmail: 'nepalhealthsewa@gmail.com',
    status: 'Upcoming'
  },
  {
    id: 'camp-2',
    slug: 'janakpur-dham-youth-blood-sewa',
    title: 'Mithila Youth Blood Donation & Wellness Camp',
    name: 'Janakpur Blood Camp',
    date: 'Saturday, October 11, 2025',
    venue: 'Janaki Mandir Parisar, Janakpurdham',
    district: 'Dhanusha',
    attendance: '210+ Donors Registered',
    unitsCollected: 126,
    bannerImage: '/img/img2.4dfe5a85.jpg',
    description: 'Youth-led emergency blood drive focusing on rare negative blood groups and community health awareness regarding thalassemia and anemia.',
    organizerName: 'Nepal Health Sewa Janakpur Chapter',
    organizerAddress: 'Ramanand Chowk, Janakpurdham, Nepal',
    organizerPhone: '+977 9812345678',
    organizerEmail: 'janakpur@nepalhealthsewa.org',
    status: 'Completed'
  },
  {
    id: 'camp-3',
    slug: 'chitwan-medical-awareness-blood-drive',
    title: 'Chitwan Regional Blood & Oxygen Preparedness Drive',
    name: 'Bharatpur Health Sewa',
    date: 'Saturday, December 20, 2025',
    venue: 'Chaubiskothi Ground, Bharatpur, Chitwan',
    district: 'Chitwan',
    attendance: '280+ Expected Participants',
    unitsCollected: 0,
    bannerImage: '/img/img3.5ca740c3.jpg',
    description: 'Comprehensive public awareness initiative for emergency blood reservation, oxygen cylinder safety guidelines, and basic cardiovascular health screenings.',
    organizerName: 'Nepal Health Sewa Chitwan Committee',
    organizerAddress: 'Lions Chowk, Bharatpur, Chitwan, Nepal',
    organizerPhone: '+977 9845112233',
    organizerEmail: 'chitwan@nepalhealthsewa.org',
    status: 'Upcoming'
  }
];

export const HEALTHCARE_SERVICES: HealthcareService[] = [
  {
    id: 'srv-1',
    title: 'Voluntary Blood Donor Directory & Bank',
    slug: 'blood-donation',
    shortDesc: 'Connecting critical patients in need of whole blood, plasma, and platelets with verified volunteer donors across Nepal.',
    fullDesc: 'Today in Nepal, established blood banks experience acute seasonal shortages. Nepal Health Sewa operates as a community bridge connecting patients in hospitals with voluntary blood donors. We coordinate emergency requests for rare and standard blood groups across Parsa, Kathmandu, Janakpur, and Chitwan.',
    icon: 'Droplet',
    badge: 'Core Blood Sewa',
    availability: '24/7 Active Registry',
    actionText: 'Find Blood / Register Donor',
    actionLink: '/blood-bank'
  },
  {
    id: 'srv-2',
    title: 'Emergency Oxygen Cylinder Supply & Logistics',
    slug: 'oxygen-supply',
    shortDesc: 'Rapid coordination of high-pressure B & D medical oxygen cylinders and home concentrators during acute shortages.',
    fullDesc: 'During respiratory emergencies and seasonal peaks, oxygen availability is vital. Nepal Health Sewa maintains real-time coordination with medical refilling plants and cylinder reserves across Birgunj, Parsa, and central Nepal to supply emergency oxygen cylinders to home-care and clinic patients.',
    icon: 'Wind',
    badge: 'Emergency Supply',
    availability: '24/7 Response Depot',
    actionText: 'Request Oxygen Support',
    actionLink: '/emergency'
  },
  {
    id: 'srv-3',
    title: '24/7 Ambulance & Emergency Transfer Dispatch',
    slug: 'ambulance-dispatch',
    shortDesc: 'Immediate referral dispatch connecting patients with certified Basic (BLS) and Advanced (ALS) life support ambulances.',
    fullDesc: 'Direct emergency telephone helpline bridging trauma patients with Nepal Red Cross, municipal hospital ambulances, and private ICU transit vehicles across Madhesh Province, Kathmandu, and Narayani highway corridors.',
    icon: 'PhoneCall',
    badge: 'Critical Care',
    availability: 'Dial 102 / Helpline',
    actionText: 'Emergency Dispatch Desk',
    actionLink: '/emergency'
  },
  {
    id: 'srv-4',
    title: 'COVID-19 Guidelines & Vaccination Advisory',
    slug: 'covid-guidelines',
    shortDesc: 'Verified clinical protocols on COVID-19 isolation, booster vaccinations, and testing hubs in Nepal.',
    fullDesc: 'Following Government of Nepal Ministry of Health and Population (MoHP) and WHO clinical directives, our advisory provides step-by-step home isolation guidance, warning signs for emergency hospitalization, mask protocols, and booster vaccination schedules.',
    icon: 'ShieldCheck',
    badge: 'Clinical Protocol',
    availability: 'Always Accessible',
    actionText: 'View COVID-19 Protocols',
    actionLink: '/covid-guidlines'
  },
  {
    id: 'srv-5',
    title: 'Clinical Health Calculators & Vitals Trackers',
    slug: 'health-calculators',
    shortDesc: 'Evidence-based BMI body mass index, blood pressure staging, macro meal planner, sleep metrics, and exercise library.',
    fullDesc: 'Empowering preventative health in Nepal through interactive screening tools tailored for South Asian body types and WHO metabolic cutoffs. Track blood pressure, assess hypertension risks, plan culturally authentic balanced meals, and monitor sleep hygiene.',
    icon: 'HeartPulse',
    badge: 'Interactive Tools',
    availability: 'Self-Service Tools',
    actionText: 'Explore Health Tools',
    actionLink: '/health-tools'
  },
  {
    id: 'srv-6',
    title: 'Hospital Bed & ICU Availability Coordination',
    slug: 'bed-availability',
    shortDesc: 'Information bridge tracking vacant general ward, HDU, NICU, and ventilator ICU beds in regional hospitals.',
    fullDesc: 'During critical patient transfers, finding an available ICU bed with ventilator support can be life-saving. We maintain direct telephonic liaison with hospital admission desks at Narayani Hospital, Birgunj Healthcare, and Kathmandu medical centers.',
    icon: 'Building2',
    badge: 'Hospital Liaison',
    availability: 'Daily Coordination',
    actionText: 'Inquire Bed Status',
    actionLink: '/emergency'
  },
  {
    id: 'srv-7',
    title: 'Clinical Disease Knowledge & Care Guides',
    slug: 'disease-knowledge',
    shortDesc: 'Comprehensive, accessible medical guides on common conditions: Dengue, Diabetes, Hypertension, Hepatitis, and Malaria in Nepal.',
    fullDesc: 'Curated disease monographs highlighting symptoms, early diagnostic red flags, first-aid measures, dietary guidelines, and specialist referral recommendations designed to educate families and prevent late-stage complications.',
    icon: 'Activity',
    badge: 'Public Health',
    availability: 'Digital Library',
    actionText: 'Browse Disease Library',
    actionLink: '/diseases'
  },
  {
    id: 'srv-8',
    title: 'Community Blood Drives & Mobile Camps',
    slug: 'blood-camps',
    shortDesc: 'Organizing community, youth, and institutional blood donation camps to replenish regional blood banks.',
    fullDesc: 'We partner with the Nepal Red Cross Society, local youth clubs, colleges, and municipal health offices to organize voluntary mobile blood collection camps in Birgunj, Parsa, Bara, and Janakpur, maintaining safe national blood reserves.',
    icon: 'Calendar',
    badge: 'Community Drives',
    availability: 'Regular Camp Drives',
    actionText: 'View Blood Camps',
    actionLink: '/campaign'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Sangam Kumar Pandit',
    role: 'Founder & President',
    bio: 'Be happy and make others happy. Helping others without expecting anything in return is what true self-worth is all about.',
    image: '/img/sangam.6d1bafc1.jpg',
    socials: {
      facebook: 'https://www.facebook.com/sangam9876/',
      instagram: 'https://www.instagram.com/sangam_pandit/',
      twitter: 'https://twitter.com/sangampandit12'
    },
    isCore: true
  },
  {
    id: 'team-2',
    name: 'Ayub Alam',
    role: 'Co-Founder & Operations Lead',
    bio: 'You and I were taught to tell the truth as kids. Integrity in community service and swift emergency response is what saves lives.',
    image: '/img/ayub.c84e71a7.jpg',
    socials: {
      facebook: 'https://www.facebook.com/alamayub85/',
      instagram: 'https://www.instagram.com/_ayubalam_/',
      twitter: 'https://twitter.com/alamayub85'
    },
    isCore: true
  },
  {
    id: 'team-3',
    name: 'Megha Karn',
    role: 'Donor Coordinator & Community Relations',
    bio: 'Giving blood is something that does not take long, but can have a lifetime of impact. Dedicated to expanding voluntary donor networks.',
    image: '/img/megha.29e1ca41.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/megha.karn.39',
      instagram: 'https://www.instagram.com/riha_megha'
    },
    isCore: true
  },
  {
    id: 'team-4',
    name: 'Bikash Singh Rajput',
    role: 'Logistics & Emergency Response Coordinator',
    bio: 'Taking the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
    image: '/img/bikas1.49f3dc89.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/bikash.singh.5458498/',
      instagram: 'https://www.instagram.com/stunning_bcaash/'
    },
    isCore: true
  },
  {
    id: 'team-5',
    name: 'Dhiraj Pandit',
    role: 'Youth Volunteer Lead',
    bio: 'Mobilizing youth across schools and colleges in Parsa to understand the critical need for voluntary regular blood donation.',
    image: '/img/dhiraj.b7d3a281.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/suraj.pandit.9235',
      instagram: 'https://www.instagram.com/dhiraj.pandit/'
    },
    isCore: false
  },
  {
    id: 'team-6',
    name: 'Sanjay Sah',
    role: 'Field Logistics Support',
    bio: 'Ensuring emergency blood transport, temperature-regulated collection boxes, and quick verification during hospital calls.',
    image: '/img/sanjay.90549dd5.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/sdssanjay.sah',
      instagram: 'https://www.instagram.com/sanjay_sah01/'
    },
    isCore: false
  },
  {
    id: 'team-7',
    name: 'Nitesh Mehta',
    role: 'Technical & Data Management',
    bio: 'Maintaining donor directories and streamlining phone inquiries so no emergency blood caller is left waiting.',
    image: '/img/nites.a77b4060.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/nitesh.mehta.549/',
      instagram: 'https://www.instagram.com/mehtanitesh1842/'
    },
    isCore: false
  },
  {
    id: 'team-8',
    name: 'Kishan Sarraf',
    role: 'Community Outreach',
    bio: 'Building trust with local business associations and citizen clubs in Birgunj to support voluntary blood donation camps.',
    image: '/img/kishan.d9609e39.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/kisu.sarraf',
      instagram: 'https://www.instagram.com/kisusarraf/'
    },
    isCore: false
  },
  {
    id: 'team-9',
    name: 'Manish Rauniyar',
    role: 'Emergency Volunteer',
    bio: 'Round-the-clock emergency hospital liaison assisting families during urgent midnight blood and oxygen requirements.',
    image: '/img/manish.40b15c25.jpeg',
    socials: {
      facebook: 'https://www.facebook.com/manish.rauniyar.75/',
      instagram: 'https://www.instagram.com/rauniyar_man'
    },
    isCore: false
  }
];

export const EMERGENCY_CONTACTS = [
  {
    title: 'Nepal Ambulance Service (Unified)',
    number: '102',
    desc: 'Toll-free emergency medical dispatch across major cities in Nepal.',
    category: 'Ambulance'
  },
  {
    title: 'Nepal Police Emergency Control',
    number: '100',
    desc: 'National emergency assistance and road rescue.',
    category: 'Police'
  },
  {
    title: 'Nepal Red Cross Central Blood Bank (Kathmandu)',
    number: '01-4288485',
    desc: 'Central blood transfusion service, Exhibition Road / Soaltee Mode.',
    category: 'Blood Bank'
  },
  {
    title: 'Narayani Hospital Emergency (Birgunj)',
    number: '051-521993',
    desc: 'Primary government referral hospital in Parsa district.',
    category: 'Hospital'
  },
  {
    title: 'Nepal Red Cross Parsa Blood Bank (Birgunj)',
    number: '051-522137',
    desc: 'Regional blood collection and testing facility, Birgunj.',
    category: 'Blood Bank'
  },
  {
    title: 'Nepal Health Sewa Emergency Desk',
    number: '+977 9845012345',
    desc: '24/7 volunteer hotline for blood match and oxygen logistics.',
    category: 'Nepal Health Sewa'
  }
];

export const DISEASES_DATA: DiseaseInfo[] = [
  {
    id: 'dis-1',
    slug: 'dengue-fever',
    name: 'Dengue Fever',
    nepaliName: 'डेंगु ज्वरो',
    category: 'Infectious & Vector-Borne',
    overview: 'Dengue is a viral infection transmitted to humans through the bites of infected female Aedes mosquitoes (predominantly Aedes aegypti). In Nepal, post-monsoon outbreaks have affected Terai districts and Kathmandu Valley significantly.',
    symptoms: {
      common: [
        'Sudden high fever (104°F / 40°C)',
        'Severe headache and pain behind the eyes',
        'Muscle and joint pains ("breakbone fever")',
        'Nausea and vomiting'
      ],
      lessCommon: [
        'Skin rash appearing 2–5 days after onset',
        'Mild bleeding (nosebleed, bleeding gums)'
      ],
      serious: [
        'Severe abdominal pain and persistent vomiting',
        'Rapid breathing and mucosal bleeding',
        'Extreme fatigue, restlessness, or confusion',
        'Sudden drop in platelet count causing shock (Dengue Hemorrhagic Fever)'
      ]
    },
    prevention: [
      'Eliminate stagnant water from discarded tires, flower pots, coolers, and buckets around homes.',
      'Wear long-sleeved shirts and long pants, particularly during daytime peak biting hours.',
      'Use mosquito repellents approved for topical use.',
      'Install mosquito screens on windows and sleep under treated bed nets.'
    ],
    homeCare: [
      'Maintain complete bed rest.',
      'Drink plenty of oral fluids: ORS (Jeevan Jal), coconut water, clear soups, and clean water.',
      'Take paracetamol for fever as directed by a healthcare worker. Strictly AVOID aspirin, ibuprofen, or other NSAIDs as they increase bleeding risks.'
    ],
    whenToSeeDoctor: [
      'Warning signs appear within 24–48 hours after fever begins to subside.',
      'Persistent vomiting or inability to tolerate oral fluids.',
      'Black or tarry stools, or blood in vomit.',
      'Cold, clammy skin or altered mental status.'
    ],
    nepalGuidance: 'The Ministry of Health and Population (MoHP) and Epidemiology and Disease Control Division (EDCD) recommend testing via NS1 antigen (days 1-5) or IgM antibody tests at government health centers.',
    sources: [
      'World Health Organization (WHO) Dengue Guidelines',
      'Nepal MoHP Epidemiology & Disease Control Division (EDCD)'
    ],
    lastReviewed: '2025-01-10'
  },
  {
    id: 'dis-2',
    slug: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    nepaliName: 'उच्च रक्तचाप',
    category: 'Cardiovascular',
    overview: 'Hypertension is a chronic condition where the force of the blood against artery walls is consistently too high (systolic ≥ 130 mmHg and/or diastolic ≥ 80 mmHg). Often referred to as a "silent killer" because it rarely presents symptoms early.',
    symptoms: {
      common: [
        'Usually asymptomatic in early stages ("Silent Killer")',
        'Early morning headaches in some individuals'
      ],
      lessCommon: [
        'Occasional dizziness, lightheadedness, or flushed face',
        'Mild visual changes or ringing in ears (tinnitus)'
      ],
      serious: [
        'Severe occipital headache with nausea',
        'Chest pain, shortness of breath, or palpitations',
        'Sudden numbness or weakness in face or arm (stroke warning)'
      ]
    },
    prevention: [
      'Reduce sodium intake (< 5g of salt / ~1 teaspoon daily). Watch out for salty Nepali pickles (achar) and packaged noodles.',
      'Engage in at least 150 minutes of moderate aerobic activity weekly.',
      'Maintain healthy weight and waist circumference.',
      'Avoid tobacco and limit alcohol consumption.'
    ],
    homeCare: [
      'Check blood pressure regularly using a validated upper-arm digital monitor.',
      'Keep a daily blood pressure log noting date, time, and reading.',
      'Adhere strictly to prescribed antihypertensive medication without stopping abruptly.'
    ],
    whenToSeeDoctor: [
      'Systolic reading exceeds 180 mmHg or diastolic exceeds 120 mmHg (Hypertensive Crisis).',
      'High reading accompanied by chest discomfort, shortness of breath, or neurological deficit.',
      'Persistent readings consistently above 140/90 mmHg despite lifestyle measures.'
    ],
    nepalGuidance: 'Nepal PEN (Package of Essential Non-communicable Diseases) guidelines implemented by Nepal MoHP provide free basic hypertension screening and essential medications at primary health care centers.',
    sources: [
      'AHA / ACC Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure',
      'Nepal Ministry of Health and Population Non-Communicable Disease Strategy'
    ],
    lastReviewed: '2025-02-15'
  },
  {
    id: 'dis-3',
    slug: 'type-2-diabetes',
    name: 'Type 2 Diabetes Mellitus',
    nepaliName: 'मधुमेह (चिनी रोग)',
    category: 'Chronic & Metabolic',
    overview: 'A metabolic condition characterized by high levels of blood glucose due to progressive insulin resistance and inadequate insulin secretion. Highly prevalent in urban and semi-urban Nepal.',
    symptoms: {
      common: [
        'Increased thirst (polydipsia)',
        'Frequent urination, especially at night (polyuria)',
        'Increased hunger (polyphagia)',
        'Persistent unexplained fatigue'
      ],
      lessCommon: [
        'Slow-healing cuts or frequent skin infections',
        'Tingling or numbness in feet and hands'
      ],
      serious: [
        'Severe dehydration, confusion, or fruity breath (ketoacidosis/hyperosmolar state)',
        'Vision blurring or sudden loss of vision'
      ]
    },
    prevention: [
      'Balance carbohydrate portions in daily Nepali meals (e.g. increase vegetables and dal, reduce polished white rice).',
      'Engage in brisk walking or cycling daily.',
      'Undergo annual fasting blood glucose or HbA1c screenings if over age 30 or having a family history.'
    ],
    homeCare: [
      'Monitor blood sugar levels with a home glucometer as recommended.',
      'Inspect feet daily for sores, blisters, or redness.',
      'Follow a balanced diet rich in fiber (gundruk, green saag, lentils, whole grains).'
    ],
    whenToSeeDoctor: [
      'Blood glucose consistently > 250 mg/dL or < 70 mg/dL with sweating/shaking (hypoglycemia).',
      'Non-healing foot ulcer or signs of skin infection.',
      'Routine quarterly clinical evaluation with HbA1c measurement.'
    ],
    nepalGuidance: 'Nepal Diabetes Association and MoHP provide guidelines on standard HbA1c targets (< 7.0% for most non-pregnant adults) and diet management.',
    sources: [
      'American Diabetes Association (ADA) Standards of Care',
      'WHO South-East Asia Region Diabetes Profile'
    ],
    lastReviewed: '2025-01-28'
  },
  {
    id: 'dis-4',
    slug: 'typhoid-fever',
    name: 'Typhoid Fever',
    nepaliName: 'टाइफाइड ज्वरो',
    category: 'Infectious & Vector-Borne',
    overview: 'A life-threatening systemic infection caused by the bacterium Salmonella enterica serotype Typhi. Spread through contaminated food and drinking water. Nepal introduced the Typhoid Conjugate Vaccine (TCV) into its routine immunization schedule in 2022.',
    symptoms: {
      common: [
        'Step-ladder fever rising progressively each day',
        'Headache, generalized malaise, and fatigue',
        'Loss of appetite and stomach pain',
        'Constipation in adults or diarrhea in young children'
      ],
      lessCommon: [
        'Rose spots (faint pink rash on chest and abdomen)',
        'Dry cough and coated white tongue'
      ],
      serious: [
        'Intestinal perforation or severe internal bleeding',
        'Delirium, confusion, and sustained high fever'
      ]
    },
    prevention: [
      'Drink boiled or properly chlorinated/filtered water only.',
      'Wash hands thoroughly with soap and clean water before eating or preparing meals.',
      'Avoid raw unpeeled vegetables or street drinks prepared with untreated ice.',
      'Ensure children receive the Typhoid Conjugate Vaccine.'
    ],
    homeCare: [
      'Complete the full course of prescribed antibiotics even if feeling better early.',
      'Maintain hydration with oral rehydration solutions and soft, digestible foods.'
    ],
    whenToSeeDoctor: [
      'Fever fails to subside within 48–72 hours of starting antibiotics.',
      'Sudden severe abdominal pain, vomiting, or blood in stool.'
    ],
    nepalGuidance: 'National Immunization Program Nepal ensures nationwide TCV coverage for children. Blood culture is the gold standard diagnostic method.',
    sources: [
      'WHO Typhoid Fact Sheet',
      'Nepal National Immunization Advisory Committee'
    ],
    lastReviewed: '2024-12-05'
  },
  {
    id: 'dis-5',
    slug: 'copd',
    name: 'Chronic Obstructive Pulmonary Disease (COPD)',
    nepaliName: 'दम तथा श्वासप्रश्वास रोग',
    category: 'Respiratory',
    overview: 'A progressive lung disease causing airflow limitation and breathing difficulty. In Nepal, key contributors include tobacco smoking and long-term exposure to indoor biomass smoke from traditional cooking stoves (chulo).',
    symptoms: {
      common: [
        'Chronic cough with mucus production',
        'Shortness of breath, especially during physical exertion',
        'Wheezing and tightness in chest',
        'Frequent respiratory infections'
      ],
      serious: [
        'Severe breathlessness preventing speech in full sentences',
        'Bluish discoloration of lips or nail beds (cyanosis)',
        'Confusion or excessive morning sleepiness due to carbon dioxide retention'
      ]
    },
    prevention: [
      'Never start smoking; seek cessation support if currently smoking.',
      'Improve household ventilation and adopt clean cooking stoves (improved chulo or electric induction).',
      'Avoid outdoor air pollution and dust during high AQI days using well-fitting particulate masks.'
    ],
    homeCare: [
      'Use prescribed inhalers (bronchodilators / inhaled corticosteroids) with proper technique and spacer.',
      'Practice pursed-lip breathing exercises to relieve breathlessness.',
      'Keep vaccinations up-to-date (influenza and pneumococcal).'
    ],
    whenToSeeDoctor: [
      'Sudden severe worsening of symptoms (acute exacerbation).',
      'Oxygen saturation drops below 90% on home pulse oximeter.',
      'Fever accompanied by increased purulent (yellow/green) sputum.'
    ],
    nepalGuidance: 'Nepal Health Research Council (NHRC) identifies COPD as one of the leading causes of chronic morbidity in rural Nepal. Community spirometry and oxygen logistics play critical roles.',
    sources: [
      'Global Initiative for Chronic Obstructive Lung Disease (GOLD)',
      'Nepal Ministry of Health and Population Non-Communicable Diseases Division'
    ],
    lastReviewed: '2025-02-01'
  }
];

export const COVID_GUIDELINES = {
  title: 'COVID-19 Health Guidelines',
  subtitle: 'Please go through the given guidelines to stay safe and protect our community.',
  symptoms: {
    mostCommon: ['Fever', 'Dry Cough', 'Tiredness'],
    lessCommon: [
      'Aches & Pains',
      'Sore Throat',
      'Diarrhea',
      'Conjunctivitis',
      'Headache',
      'Loss of Taste or Smell',
      'A rash on skin or discoloration of fingers/toes'
    ],
    serious: [
      'Difficulty breathing or shortness of breath',
      'Chest pain or pressure',
      'Loss of speech or movement'
    ]
  },
  prevention: [
    'Wash your hands frequently with soap and clean water or use alcohol-based hand sanitizer.',
    'Maintain physical distance by avoiding unnecessary travel and staying away from large crowded gatherings.',
    'Wear a properly fitted mask over your nose and mouth whenever in public spaces.',
    'Avoid touching your eyes, nose, and mouth with unwashed hands.',
    'Cover your mouth and nose with your bent elbow or tissue when you cough or sneeze.',
    'Stay home and self-isolate even with minor symptoms until you recover.',
    'Refrain from smoking and other activities that weaken the lungs.',
    'Practice meditation, stay hydrated, and do not compromise on adequate sleep.'
  ],
  maskTips: [
    'Wash hands or use hand sanitizer before putting on your mask.',
    'Put the mask over your nose and mouth and secure it under your chin.',
    'Fit the mask snugly against the sides of your face without gaps.',
    'If you have to continually adjust your mask, it does not fit properly—find a better fitting type.'
  ]
};

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'Ghantaghar Blood Donation Camp, Birgunj',
    date: 'Parsa, Nepal',
    image: '/img/img1.243adeed.jpg',
    category: 'Blood Camp'
  },
  {
    id: 'gal-2',
    title: 'Community Medical Volunteers at Work',
    date: 'Community Health Centre',
    image: '/img/img2.4dfe5a85.jpg',
    category: 'Community Sewa'
  },
  {
    id: 'gal-3',
    title: 'Youth Health Volunteers Camp',
    date: 'Birgunj Hub',
    image: '/img/img3.5ca740c3.jpg',
    category: 'Blood Camp'
  },
  {
    id: 'gal-4',
    title: 'Relief Distribution & Oxygen Support',
    date: 'Parsa Relief Centre',
    image: '/img/img4.351c535e.jpg',
    category: 'Emergency Relief'
  },
  {
    id: 'gal-5',
    title: 'Health Awareness & Public Guidance Drive',
    date: 'Community Program',
    image: '/img/img1.936ee7e1.jpg',
    category: 'Public Health'
  },
  {
    id: 'gal-6',
    title: 'Medical Mask & Hygiene Guidelines',
    date: 'Health Guidance',
    image: '/img/wear.415a9039.jpg',
    category: 'Safety Guidelines'
  }
];

export const INITIAL_EMERGENCY_TICKETS: EmergencyTicket[] = [
  {
    id: 'ticket-101',
    ticketNumber: 'NHS-2025-1042',
    patientName: 'Rameshwar Mahato',
    patientAge: 54,
    gender: 'Male',
    patientAddress: 'Adarshanagar, Birgunj',
    hospitalName: 'Narayani Hospital (ICU Ward)',
    hospitalAddress: 'Ghantaghar Road, Birgunj',
    hospitalContact: '051-521993',
    contactName: 'Sunil Mahato (Son)',
    contactAddress: 'Birgunj-10',
    contactMobile: '9845112233',
    contactEmail: 'sunil.mahato@example.com',
    sewaType: 'Blood',
    bloodGroup: 'O-',
    unitsNeeded: 2,
    urgency: 'Immediate (Within 2 hrs)',
    message: 'Urgent cardiac surgery requirement. Rare negative blood group needed immediately.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'ticket-102',
    ticketNumber: 'NHS-2025-1043',
    patientName: 'Devi Shrestha',
    patientAge: 42,
    gender: 'Female',
    patientAddress: 'Pipara, Birgunj',
    hospitalName: 'National Medical College',
    hospitalAddress: 'Bhediyahi, Birgunj',
    hospitalContact: '051-532261',
    contactName: 'Anil Shrestha',
    contactAddress: 'Pipara',
    contactMobile: '9801234567',
    sewaType: 'Blood',
    bloodGroup: 'A+',
    unitsNeeded: 2,
    urgency: 'Immediate (Within 2 hrs)',
    message: 'Emergency orthopedic surgery following highway accident. A+ packed red cells requested.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'ticket-103',
    ticketNumber: 'NHS-2025-1039',
    patientName: 'Kriti Adhikari',
    patientAge: 29,
    gender: 'Female',
    patientAddress: 'Kalaiya, Bara',
    hospitalName: 'Provincial Hospital Kalaiya',
    hospitalAddress: 'Hospital Chowk, Kalaiya',
    hospitalContact: '053-550110',
    contactName: 'Rajesh Adhikari',
    contactAddress: 'Kalaiya-4',
    contactMobile: '9819876543',
    sewaType: 'Blood',
    bloodGroup: 'B+',
    unitsNeeded: 3,
    urgency: 'Today (Within 6 hrs)',
    message: 'Post-delivery bleeding management. Donor coordination underway with Parsa volunteers.',
    status: 'Fulfilled',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
  },
  {
    id: 'ticket-104',
    ticketNumber: 'NHS-2025-1036',
    patientName: 'Gopal Krishna Yadav',
    patientAge: 68,
    gender: 'Male',
    patientAddress: 'Jeetpur, Bara',
    hospitalName: 'Birgunj Healthcare Hospital',
    hospitalAddress: 'Gandak Road, Birgunj',
    hospitalContact: '051-580123',
    contactName: 'Manish Yadav',
    contactAddress: 'Jeetpur',
    contactMobile: '9845334455',
    sewaType: 'Blood',
    bloodGroup: 'O+',
    unitsNeeded: 2,
    urgency: 'Immediate (Within 2 hrs)',
    message: 'Urgent cardiac ICU transfusion support. Volunteer donor bridge mobilized.',
    status: 'Fulfilled',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'ticket-105',
    ticketNumber: 'NHS-2025-1044',
    patientName: 'Nisha Thakur',
    patientAge: 33,
    gender: 'Female',
    patientAddress: 'Murli Chowk, Birgunj',
    hospitalName: 'Terai Hospital & Research Centre',
    hospitalAddress: 'Murli, Birgunj',
    hospitalContact: '051-524001',
    contactName: 'Vikram Thakur',
    contactAddress: 'Murli Chowk',
    contactMobile: '9807654321',
    sewaType: 'Blood',
    bloodGroup: 'AB+',
    unitsNeeded: 1,
    urgency: 'Today (Within 6 hrs)',
    message: 'Orthopedic surgery prep for accidental fracture repair.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    ticketId: 'INQ-2025-081',
    name: 'Dr. Rabin Shrestha',
    mobile: '9841209876',
    email: 'rabin.shrestha@nmc.edu.np',
    category: 'Hospital Partnership',
    message: 'Requesting formal coordination with National Medical College Blood Bank for emergency rare Rh-negative cross-referrals during ICU surgical emergencies.',
    status: 'In Progress',
    priority: 'Urgent',
    assignedTo: 'Sangam Kumar Pandit',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    responseNotes: 'Met with NMC Blood Bank in-charge. Drafting standard protocol for Rh-negative alerts.',
  },
  {
    id: 'inq-2',
    ticketId: 'INQ-2025-078',
    name: 'Sunil Kumar Gupta',
    mobile: '9804822334',
    email: 'sunil.rotary@gmail.com',
    category: 'Camp Organization',
    message: 'Rotary Club of Birgunj wishes to organize a joint 150-pint Mega Blood Donation Camp at Ghantaghar on the upcoming public holiday. Please share logistics checklist.',
    status: 'New',
    priority: 'High',
    assignedTo: 'Ayub Alam',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'inq-3',
    ticketId: 'INQ-2025-075',
    name: 'Pooja Thapa',
    mobile: '9813456789',
    email: 'pooja.thapa@gmail.com',
    category: 'Donor Inquiry',
    message: 'I had malaria 6 months ago but have made a full recovery. Can I register as a blood donor or is there an active deferral period?',
    status: 'Resolved',
    priority: 'Normal',
    assignedTo: 'Megha Karn',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    responseNotes: 'Explained 12-month post-malaria recovery protocol per National Transfusion guidelines.',
  },
  {
    id: 'inq-4',
    ticketId: 'INQ-2025-072',
    name: 'Bikash Mahato',
    mobile: '9845099887',
    email: 'bikash.mahato@live.com',
    category: 'Emergency Assistance',
    message: 'Need emergency blood transport box for patient being transferred from Narayani Hospital to Chitwan Medical College tonight. Can your volunteer assist with cold chain transport?',
    status: 'In Progress',
    priority: 'Urgent',
    assignedTo: 'Bikash Singh Rajput',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    responseNotes: 'Assigned field volunteer with portable cold box (2°C-6°C).',
  },
  {
    id: 'inq-5',
    ticketId: 'INQ-2025-069',
    name: 'Apsara Nepal',
    mobile: '9801239988',
    email: 'apsara.n@gmail.com',
    category: 'General Feedback',
    message: 'Thank you Nepal Health Sewa team for coordinating O-negative blood in Narayani Hospital last week. It saved my brother life. Wonderful community work!',
    status: 'Archived',
    priority: 'Normal',
    assignedTo: 'Sangam Kumar Pandit',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    responseNotes: 'Sent appreciation note and added to donor gratitude circle.',
  },
];

export const INITIAL_VOLUNTEERS: VolunteerProfile[] = [
  {
    id: 'vol-1',
    name: 'Rohan Chaudhary',
    role: 'Emergency Field Responder',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '9845112233',
    email: 'rohan.c@nepalhealthsewa.org',
    bloodGroup: 'O+',
    status: 'Active',
    skills: ['Cold Chain Transport', 'Hospital Liaison', 'CPR & First Aid'],
    totalDrivesAttended: 18,
    totalDonations: 11,
    joinedDate: '2023-02-15',
    badge: 'Gold Responder',
    emergencyStandby: true,
  },
  {
    id: 'vol-2',
    name: 'Anjali Shah',
    role: 'Donor Verification Specialist',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '9804556677',
    email: 'anjali.shah@gmail.com',
    bloodGroup: 'B+',
    status: 'Active',
    skills: ['Donor Screening', 'Registry Verification', 'Community Outreach'],
    totalDrivesAttended: 12,
    totalDonations: 6,
    joinedDate: '2023-06-10',
    badge: 'Youth Lead',
    emergencyStandby: false,
  },
  {
    id: 'vol-3',
    name: 'Dipendra Mahato',
    role: 'Rare Blood Group Coordinator',
    district: 'Bara',
    city: 'Kalaiya',
    mobile: '9814223344',
    email: 'dipendra.m@gmail.com',
    bloodGroup: 'O-',
    status: 'On Call',
    skills: ['Rh-Negative Registry', 'Emergency Motorcycle Logistics', 'Night Triage'],
    totalDrivesAttended: 24,
    totalDonations: 15,
    joinedDate: '2022-11-01',
    badge: 'Star Donor',
    emergencyStandby: true,
  },
  {
    id: 'vol-4',
    name: 'Kavita Joshi',
    role: 'Health Camp Nurse & Educator',
    district: 'Chitwan',
    city: 'Bharatpur',
    mobile: '9845998811',
    email: 'kavita.nurse@gmail.com',
    bloodGroup: 'A+',
    status: 'Active',
    skills: ['Hemoglobin Screening', 'Vitals Assessment', 'Pre-Donation Counseling'],
    totalDrivesAttended: 16,
    totalDonations: 8,
    joinedDate: '2023-04-20',
    badge: 'Field Medic',
    emergencyStandby: true,
  },
  {
    id: 'vol-5',
    name: 'Subash Adhikari',
    role: 'Campus Outreach Lead',
    district: 'Kathmandu',
    city: 'Kathmandu',
    mobile: '9841887766',
    email: 'subash.tu@gmail.com',
    bloodGroup: 'AB+',
    status: 'Active',
    skills: ['University Youth Drives', 'Digital Engagement', 'Public Speaking'],
    totalDrivesAttended: 10,
    totalDonations: 5,
    joinedDate: '2023-09-05',
    badge: 'Youth Lead',
    emergencyStandby: false,
  },
  {
    id: 'vol-6',
    name: 'Prakash Yadav',
    role: 'Rapid Ambulance Liaison',
    district: 'Dhanusha',
    city: 'Janakpur',
    mobile: '9819334455',
    email: 'prakash.yadav@gmail.com',
    bloodGroup: 'A-',
    status: 'On Call',
    skills: ['Ambulance Hotline Dispatch', 'Hospital Ward Coordination', 'Emergency Escort'],
    totalDrivesAttended: 21,
    totalDonations: 9,
    joinedDate: '2023-01-18',
    badge: 'Gold Responder',
    emergencyStandby: true,
  },
];

