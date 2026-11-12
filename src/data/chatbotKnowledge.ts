export interface BotActionLink {
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface BotKnowledgeItem {
  id: string;
  keywords: string[];
  intents: string[];
  title: string;
  response: string;
  actionLinks?: BotActionLink[];
  suggestedFollowUps?: string[];
}

export const BOT_KNOWLEDGE_BASE: BotKnowledgeItem[] = [
  {
    id: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'greetings', 'k cha', 'k chha', 'good morning', 'good afternoon', 'good evening', 'sanchai'],
    intents: ['greeting', 'welcome'],
    title: 'Welcome to Nepal Health Sewa',
    response: `**Namaste! 🙏 Welcome to Nepal Health Sewa.**

I am your 24/7 dedicated virtual health guide. I can help you with:
• **Finding Voluntary Blood Donors** across Nepal (A+, B+, O+, AB+, and rare negative groups)
• **Emergency Services & Hotlines** (Ambulance 102, Oxygen cylinders, Narayani Hospital, Red Cross)
• **Clinical Health Calculators** (BMI, Blood Pressure, Nepali Meal Planner, Sleep Tracker)
• **Disease & Clinical Guides** (COVID-19, Dengue Fever, Hypertension, Diabetes, Cholera)
• **Community Campaigns & Blood Drives** in Birgunj, Janakpur, and Chitwan

What can I assist you with today?`,
    actionLinks: [
      { label: '🩸 Search Blood Donors', path: '/blood-bank' },
      { label: '🚨 Emergency Desk', path: '/emergency' },
      { label: '🧮 Health Calculators', path: '/health-tools' },
      { label: '📞 Contact Us', path: '/contact' },
    ],
    suggestedFollowUps: [
      'How do I find a blood donor?',
      'What are your emergency hotlines?',
      'Can I donate blood?',
      'Check my BMI',
    ],
  },
  {
    id: 'blood-find',
    keywords: [
      'find blood',
      'need blood',
      'search donor',
      'blood donor',
      'find a blood donor',
      'find donor',
      'search blood',
      'blood bank',
      'blood group',
      'a positive',
      'b positive',
      'o positive',
      'ab positive',
      'o negative',
      'rare blood',
      'blood urgent',
      'blood emergency',
    ],
    intents: ['find_blood', 'search_donor'],
    title: 'Finding Voluntary Blood Donors',
    response: `**How to Find a Blood Donor in Nepal:**

1. Go to our **Blood Bank Directory** (/blood-bank).
2. Filter by your patient's required **Blood Group** (A+, B+, O+, AB+, A-, B-, O-, AB-).
3. Filter by **District / City** (e.g. Parsa, Birgunj, Kathmandu, Janakpur, Chitwan, Pokhara).
4. Browse available donors with verified phone numbers and last donation dates.
5. If you cannot find a donor immediately, call our **24/7 Emergency Desk** at **+977 9845012345** or dial Red Cross Parsa at **051-522137**.

⚠️ *All blood donations facilitated by Nepal Health Sewa are 100% voluntary and non-commercial.*`,
    actionLinks: [
      { label: '🩸 Open Blood Bank Directory', path: '/blood-bank' },
      { label: '🚨 Call Emergency Desk', path: 'tel:+9779845012345', isExternal: true },
    ],
    suggestedFollowUps: [
      'How to register as a donor?',
      'What are the eligibility requirements for blood donation?',
      'Where is Nepal Red Cross Parsa?',
    ],
  },
  {
    id: 'blood-eligibility',
    keywords: ['eligibility', 'can i donate', 'who can donate', 'blood criteria', 'weight for donation', 'age for donation', 'hemoglobin', 'alcohol donation', 'tattoo donation', 'interval'],
    intents: ['donation_eligibility'],
    title: 'Blood Donation Eligibility Criteria',
    response: `**Who Can Donate Blood in Nepal? (WHO & Nepal Red Cross Standards):**

✅ **Age:** Between 18 and 65 years old.
✅ **Body Weight:** Minimum **45 kg** (100 lbs).
✅ **Hemoglobin Level:** Minimum **12.5 g/dL**.
✅ **Donation Interval:** At least **90 days (3 months)** since your last whole blood donation.
✅ **Vital Signs:** Normal blood pressure (Systolic 100-140, Diastolic 60-90 mmHg) and pulse (60-100 bpm).

🚫 **Temporary Deferrals:**
• Alcohol consumption: Must wait **24 hours**.
• Tattoos or body piercings: Must wait **6 months**.
• Recent flu, cold, or fever: Must wait **14 days** after full recovery.
• Pregnancy & lactation: Defer during pregnancy and for 6 months post-delivery.

*Remember: Every single blood donation can save up to three lives!*`,
    actionLinks: [
      { label: '📝 Register as a Donor', path: '/blood-bank?tab=register' },
      { label: '🩸 View Donor Directory', path: '/blood-bank' },
    ],
    suggestedFollowUps: [
      'How to register as a donor?',
      'How often can I donate blood?',
      'Check health tools',
    ],
  },
  {
    id: 'blood-register',
    keywords: ['register donor', 'become donor', 'join donor', 'sign up blood', 'volunteer blood', 'registration'],
    intents: ['register_donor'],
    title: 'Register as a Voluntary Donor',
    response: `**Join Our Life-Saving Blood Donor Community:**

You can register as a voluntary donor in under 60 seconds:
1. Navigate to the **Blood Bank** page and click the **"Register as Donor"** tab.
2. Enter your Name, Blood Group, Age, Gender, and Mobile Number.
3. Select your District (e.g. Parsa, Kathmandu, Morang, Chitwan) and City.
4. Mark your current availability status.

Once registered, your contact will be securely listed for verified patients and hospital staff in your municipality during critical shortages.`,
    actionLinks: [
      { label: '📝 Register as Donor Now', path: '/blood-bank?tab=register' },
      { label: '🛡️ Read Privacy Policy', path: '/privacy-policy' },
    ],
    suggestedFollowUps: [
      'Who can donate blood?',
      'How to find a blood donor?',
      'Where is your office located?',
    ],
  },
  {
    id: 'emergency-services',
    keywords: ['emergency', 'urgent', 'ambulance', 'hotline', 'phone number', 'helpline', 'oxygen', 'icu', 'hospital', 'narayani', '102', '100', 'critical'],
    intents: ['emergency_assistance', 'hotlines'],
    title: '24/7 Emergency Helplines & Services',
    response: `**🚨 Emergency Hotlines (Nepal):**

• **Nepal Health Sewa 24/7 Desk:** **+977 9845012345** / **+977 9804812345**
• **Unified Nepal Ambulance Service:** **102** (Toll-Free Dispatch)
• **Nepal Police Control:** **100**
• **Narayani Hospital Emergency (Birgunj):** **051-521993**
• **Nepal Red Cross Parsa Blood Bank (Birgunj):** **051-522137**
• **Central Red Cross Blood Bank (Kathmandu):** **01-4288485**

**Oxygen Support:**
We assist in locating medical oxygen cylinders, regulators, flowmeters, and refilling plants in Parsa and Bara districts during acute respiratory distress.`,
    actionLinks: [
      { label: '🚨 Open Emergency Sewa', path: '/emergency' },
      { label: '📞 Call Hot Desk (+977 9845012345)', path: 'tel:+9779845012345', isExternal: true },
    ],
    suggestedFollowUps: [
      'How to request emergency oxygen?',
      'Where is Narayani Hospital located?',
      'Search available blood donors',
    ],
  },
  {
    id: 'oxygen-support',
    keywords: ['oxygen', 'cylinder', 'concentrator', 'respiratory', 'breathing', 'refill', 'spo2', 'hypoxia', 'lungs'],
    intents: ['oxygen_support'],
    title: 'Emergency Oxygen Coordination',
    response: `**Emergency Oxygen Logistics & Guidelines:**

During severe respiratory infections, asthma attacks, or COPD crises:
• **Target SpO2:** Aim for **94%–98%** in standard patients (or 88%–92% in chronic COPD).
• **Helpline:** Call Nepal Health Sewa Emergency Desk at **+977 9845012345** for localized oxygen cylinder coordination in Birgunj.
• **Safety Rules:** Keep oxygen cylinders upright in stands. Keep away from open flames, oil, and electrical sparks. Never smoke near oxygen equipment.

Submit an emergency request online to alert our volunteer logistics team immediately.`,
    actionLinks: [
      { label: '🚨 Submit Emergency Request', path: '/emergency' },
      { label: '📞 Call Emergency Desk', path: 'tel:+9779845012345', isExternal: true },
    ],
    suggestedFollowUps: [
      'What are your emergency hotlines?',
      'Read COVID-19 guidelines',
      'Where is your office?',
    ],
  },
  {
    id: 'health-tools-overview',
    keywords: ['health tools', 'calculator', 'calculators', 'bmi', 'blood pressure tool', 'meal planner', 'sleep tracker', 'exercise'],
    intents: ['health_tools'],
    title: 'Clinical & Preventive Health Calculators',
    response: `**Our 5 Evidence-Based Health Utilities:**

1. **BMI Calculator (/health-tools/bmi):** Adult BMI with metric and imperial units + WHO South Asian cutoffs.
2. **Blood Pressure Evaluator (/health-tools/blood-pressure):** Staging per AHA/ACC & Nepal MoHP guidelines with urgency alerts.
3. **Nepali Dietary Meal Planner (/health-tools/meal-planner):** Traditional recipes (Dal, Bhat, Tarkari, Dhido, Gundruk, Chukauni) balanced for nutrition.
4. **Sleep Duration & Debt Tracker (/health-tools/sleep-tracker):** Calculates sleep debt against the 7–9 hour standard across midnight shifts.
5. **Physical Activity Benchmarks (/health-tools/exercise):** WHO weekly targets with accessible routines for Nepali lifestyles.`,
    actionLinks: [
      { label: '🧮 View All Health Tools', path: '/health-tools' },
      { label: '⚖️ BMI Calculator', path: '/health-tools/bmi' },
      { label: '❤️ Blood Pressure Tool', path: '/health-tools/blood-pressure' },
      { label: '🍛 Meal Planner', path: '/health-tools/meal-planner' },
    ],
    suggestedFollowUps: [
      'How is BMI calculated?',
      'What is normal blood pressure?',
      'Nepali diet recommendations',
    ],
  },
  {
    id: 'bmi-tool',
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'overweight', 'obese', 'underweight', 'ideal weight', 'asian bmi'],
    intents: ['bmi_info'],
    title: 'Body Mass Index (BMI) & Asian Cutoffs',
    response: `**Understanding Body Mass Index (BMI):**

BMI is calculated as: **Weight (kg) ÷ [Height (m)]²**

🌏 **WHO South Asian Health Classification:**
Because South Asians experience higher cardiovascular and diabetes risks at lower BMI values:
• **Underweight:** BMI < 18.5 kg/m²
• **Normal Weight:** BMI 18.5 – 22.9 kg/m² *(Standard WHO is 18.5–24.9)*
• **Overweight:** BMI 23.0 – 27.4 kg/m²
• **Obese:** BMI ≥ 27.5 kg/m²

Use our interactive calculator to find your exact BMI, category, healthy weight range, and customized lifestyle suggestions.`,
    actionLinks: [
      { label: '⚖️ Open BMI Calculator', path: '/health-tools/bmi' },
      { label: '🥗 Nepali Meal Planner', path: '/health-tools/meal-planner' },
    ],
    suggestedFollowUps: [
      'What is normal blood pressure?',
      'Nepali healthy meal plan',
      'Recommended weekly exercise',
    ],
  },
  {
    id: 'blood-pressure-tool',
    keywords: ['blood pressure', 'bp', 'systolic', 'diastolic', 'hypertension', 'high blood pressure', 'low blood pressure', 'normal bp', '120 80'],
    intents: ['blood_pressure_info'],
    title: 'Blood Pressure Guidelines & Staging',
    response: `**Blood Pressure Staging (AHA & Nepal MoHP):**

• **Normal:** Systolic < 120 AND Diastolic < 80 mmHg
• **Elevated:** Systolic 120–129 AND Diastolic < 80 mmHg
• **Stage 1 Hypertension:** Systolic 130–139 OR Diastolic 80–89 mmHg
• **Stage 2 Hypertension:** Systolic ≥ 140 OR Diastolic ≥ 90 mmHg
• 🚨 **Hypertensive Crisis:** Systolic > 180 and/or Diastolic > 120 mmHg *(Seek Emergency Care Immediately!)*

**Tips:** Rest for 5 minutes before taking readings. Limit sodium to <5g salt per day (watch out for salty pickles and instant noodles).`,
    actionLinks: [
      { label: '❤️ Open BP Evaluator', path: '/health-tools/blood-pressure' },
      { label: '📖 Read Hypertension Guide', path: '/diseases/hypertension' },
    ],
    suggestedFollowUps: [
      'Hypertension prevention tips',
      'Check BMI calculator',
      'Emergency hotlines',
    ],
  },
  {
    id: 'meal-planner-tool',
    keywords: ['diet', 'meal', 'food', 'nutrition', 'calories', 'dal bhat', 'tarkari', 'dhido', 'gundruk', 'nepali food', 'protein', 'nepali meal'],
    intents: ['meal_planner_info'],
    title: 'Nepali Dietary Meal Planner',
    response: `**Balanced Traditional Nepali Nutrition:**

A healthy Nepali plate balances:
• **Carbohydrates (50%):** Brown rice, red rice, millet/buckwheat *Dhido*, or whole-wheat roti.
• **Protein (25%):** Mixed lentils (*Dal*), black-eyed peas, chickpeas, soy chunks (*Badi*), eggs, or grilled fish/chicken.
• **Fiber & Micronutrients (25%):** Green leafy vegetables (*Saag*), fermented *Gundruk*, fresh seasonal vegetables (*Tarkari*), and yogurt.

Our meal planner lets you set target daily calories (e.g., 1800 kcal) and generates traditional Nepali meal structures with macro percentages.`,
    actionLinks: [
      { label: '🍛 Open Meal Planner', path: '/health-tools/meal-planner' },
      { label: '🏃 Exercise Benchmarks', path: '/health-tools/exercise' },
    ],
    suggestedFollowUps: [
      'How to track sleep debt?',
      'Check BMI calculator',
      'Diabetes meal advice',
    ],
  },
  {
    id: 'covid-guidelines',
    keywords: ['covid', 'covid-19', 'coronavirus', 'corona', 'mask', 'quarantine', 'isolation', 'symptoms of covid', 'fever cough', 'spo2 covid'],
    intents: ['covid_guidance'],
    title: 'COVID-19 Health Guidelines',
    response: `**Nepal Health Sewa COVID-19 & Respiratory Protocol:**

😷 **Mask Standards:**
• Use a well-fitting 3-ply surgical mask or certified KN95 mask covering both nose and mouth snugly without gaps.

🏠 **Mild Symptoms & Home Care:**
• Isolate in a well-ventilated room.
• Rest and hydrate with warm water, herbal teas, and *Jeevan Jal* (ORS).
• Monitor SpO2 at least 3 times daily using a fingertip pulse oximeter.

🚨 **Immediate Hospital Red Flags:**
• SpO2 drops below **94%**.
• Severe shortness of breath or persistent chest pain.
• Blue or pale lips or fingernails.
• Inability to stay awake or confusion.`,
    actionLinks: [
      { label: '🦠 Read Full COVID Guidelines', path: '/covid-guidelines' },
      { label: '🚨 Emergency Oxygen Support', path: '/emergency' },
    ],
    suggestedFollowUps: [
      'Dengue fever symptoms and care',
      'Emergency hotline numbers',
      'Where is your clinic/office?',
    ],
  },
  {
    id: 'dengue-guidelines',
    keywords: ['dengue', 'mosquito', 'platelet', 'platelets', 'breakbone', 'aedes', 'ns1', 'dengue fever', 'dengue care', 'jeevan jal'],
    intents: ['dengue_guidance'],
    title: 'Dengue Fever Symptoms & Home Care',
    response: `**Dengue Fever Management (Nepal MoHP & WHO):**

🦟 **Transmission:** Transmitted by day-biting *Aedes aegypti* mosquitoes.

🤒 **Common Symptoms:**
• High fever (104°F / 40°C), severe pain behind the eyes, excruciating joint and muscle aches ("breakbone fever"), nausea, and rash.

💊 **Crucial Medical Rule:**
• Take **Paracetamol** for fever under medical advice.
• ⚠️ **STRICTLY AVOID** Aspirin, Ibuprofen, Diclofenac, or Brufen! These thin the blood and dramatically raise internal bleeding hazards.

💧 **Recovery Care:** Complete bed rest and heavy oral hydration with ORS (*Jeevan Jal*), coconut water, and soups. If platelet count plummets or you experience abdominal pain or bleeding gums, transfer to hospital immediately.`,
    actionLinks: [
      { label: '🦟 Read Full Dengue Guide', path: '/diseases/dengue-fever' },
      { label: '🩸 Search Platelet Donors', path: '/blood-bank' },
    ],
    suggestedFollowUps: [
      'What are your emergency numbers?',
      'How to request blood or platelets?',
      'COVID-19 guidelines',
    ],
  },
  {
    id: 'campaigns-events',
    keywords: ['campaign', 'campaigns', 'events', 'blood drive', 'donation camp', 'rally', 'birgunj camp', 'janakpur', 'chitwan'],
    intents: ['campaigns'],
    title: 'Community Campaigns & Blood Drives',
    response: `**Nepal Health Sewa Flagship Initiatives:**

1. **Ghantaghar Mega Blood Drive & Health Camp (Birgunj, Parsa):**
   Our flagship annual community event collecting 180+ units of whole blood in partnership with Nepal Red Cross Parsa and Narayani Hospital.
2. **Mithila Youth Blood Donation Camp (Janakpurdham):**
   Youth-led initiative focusing on rare negative blood groups and thalassemia patient registries.
3. **Chitwan Regional Blood & Oxygen Drive (Bharatpur):**
   Cardiovascular screening and emergency logistics reservation camps.

Want to organize a blood donation camp in your college, company, or club? Contact us today!`,
    actionLinks: [
      { label: '📢 Explore Campaigns', path: '/campaign' },
      { label: '🤝 Partner for a Blood Camp', path: '/contact' },
    ],
    suggestedFollowUps: [
      'How do I register as a donor?',
      'Who is on the team?',
      'View photo gallery',
    ],
  },
  {
    id: 'about-organization',
    keywords: ['about', 'nepal health sewa', 'who are you', 'mission', 'vision', 'pillars', 'organization', 'motto', 'slogan', 'history'],
    intents: ['about_us'],
    title: 'About Nepal Health Sewa',
    response: `**Nepal Health Sewa — "Donate Blood, Save Life"**

Nepal Health Sewa is a non-profit voluntary community healthcare network initiated in Birgunj, Parsa, Nepal.

✨ **Our 4 Pillars:**
1. **Supportive & Helpful:** Standing with patients and families during midnight hospital emergencies.
2. **Strength & Empowerment:** Educating youths and communities on regular voluntary blood donation.
3. **Sharing & Caring:** Connecting generous donors with recipients without financial friction.
4. **Bringing Smiles:** Ensuring no patient loses their life due to a lack of compatible blood or emergency logistics.`,
    actionLinks: [
      { label: '📖 Learn More About Us', path: '/about' },
      { label: '👥 Meet Our Team', path: '/team' },
      { label: '🖼️ View Photo Archive', path: '/gallery' },
    ],
    suggestedFollowUps: [
      'Who founded Nepal Health Sewa?',
      'Where is your office located?',
      'How can I get involved?',
    ],
  },
  {
    id: 'team-leadership',
    keywords: ['team', 'founder', 'president', 'sangam', 'pandit', 'ayub', 'alam', 'megha', 'bikash', 'dhiraj', 'sanjay', 'nitesh', 'kishan', 'manish', 'members'],
    intents: ['team_info'],
    title: 'Leadership & Dedicated Volunteer Team',
    response: `**Meet the Team Behind Nepal Health Sewa:**

• **Sangam Kumar Pandit** – Founder & President
  *"Helping others without expecting anything in return is what true self-worth is all about."*
• **Ayub Alam** – Co-Founder & Operations Lead
• **Megha Karn** – Donor Coordinator & Community Relations
• **Bikash Singh Rajput** – Logistics & Emergency Response Coordinator
• **Dhiraj Pandit** – Youth Volunteer Lead
• **Sanjay Sah** – Field Logistics Support
• **Nitesh Mehta** – Technical & Data Management
• **Kishan Sarraf** – Community Outreach
• **Manish Rauniyar** – Emergency Volunteer`,
    actionLinks: [
      { label: '👥 View Full Team Profiles', path: '/team' },
      { label: '📞 Contact the Team', path: '/contact' },
    ],
    suggestedFollowUps: [
      'Where is your office located?',
      'How to organize a blood camp?',
      'About Nepal Health Sewa',
    ],
  },
  {
    id: 'contact-location',
    keywords: [
      'contact us',
      'contact info',
      'office location',
      'headquarters',
      'where is your office',
      'where are you located',
      'office address',
      'ghantaghar office',
      'email address',
      'phone numbers',
      'opening hours',
      'working hours',
      'reach out',
    ],
    intents: ['contact_details'],
    title: 'Office Location & Contact Info',
    response: `**Get in Touch with Nepal Health Sewa:**

📍 **Headquarters:**
Ghantaghar Chowk, Birgunj, Parsa, Madhesh Province, Nepal

📞 **Emergency Desk (24/7):**
• **+977 9845012345**
• **+977 9804812345**

✉️ **Official Email:**
Nepalhealthsewa@gmail.com

🌐 **Official Websites:**
• **Primary Portal:** https://nepalhealthsewa.com
• **Netlify Mirror:** https://nepalhealthsewa.netlify.app
• **Cloudflare Pages:** https://nepalhealthsewa.pages.dev

📱 **Social Media (@nepalhealthsewa):**
• YouTube: youtube.com/@nepalhealthsewa
• Instagram: instagram.com/nepalhealthsewa
• Facebook: facebook.com/nepalhealthsewa
• Twitter: twitter.com/nepalhealthsewa
• LinkedIn: linkedin.com/in/nepalhealthsewa
• GitHub: github.com/nepalhealthsewa

🕒 **Hours:**
• Emergency Blood Coordination & Hotlines: **Open 24/7, 365 Days**
• Administrative Office: Sunday – Friday, 9:00 AM – 5:00 PM`,
    actionLinks: [
      { label: '✉️ Send Enquiry Online', path: '/contact' },
      { label: '📞 Call Now (+977 9845012345)', path: 'tel:+9779845012345', isExternal: true },
    ],
    suggestedFollowUps: [
      'What are your social media links?',
      'What are your emergency hotlines?',
      'Find a blood donor',
    ],
  },
  {
    id: 'social-media',
    keywords: [
      'social media',
      'social',
      'socials',
      'facebook',
      'instagram',
      'youtube',
      'twitter',
      'tweet',
      'x.com',
      'linkedin',
      'github',
      'git',
      'open source',
      'repository',
      'nepalhealthsewa',
      'follow',
      'channel',
      'handles',
      'subscribe',
    ],
    intents: ['social_media', 'official_channels'],
    title: 'Official Social Media Channels',
    response: `**Connect with Nepal Health Sewa on Official Social Media:**
Username / Handle: **@nepalhealthsewa**

• 📺 **YouTube:** https://www.youtube.com/@nepalhealthsewa
• 📸 **Instagram:** https://www.instagram.com/nepalhealthsewa
• 📘 **Facebook:** https://www.facebook.com/nepalhealthsewa
• 🐦 **Twitter (X):** https://twitter.com/nepalhealthsewa
• 💼 **LinkedIn:** https://www.linkedin.com/in/nepalhealthsewa
• 🐙 **GitHub:** https://github.com/nepalhealthsewa

Follow our official pages for real-time blood appeals, medical camps, open-source healthcare tools, and medical education in Nepal!`,
    actionLinks: [
      { label: '📘 Facebook (@nepalhealthsewa)', path: 'https://www.facebook.com/nepalhealthsewa', isExternal: true },
      { label: '🐙 GitHub (@nepalhealthsewa)', path: 'https://github.com/nepalhealthsewa', isExternal: true },
      { label: '📸 Instagram (@nepalhealthsewa)', path: 'https://www.instagram.com/nepalhealthsewa', isExternal: true },
      { label: '📺 YouTube (@nepalhealthsewa)', path: 'https://www.youtube.com/@nepalhealthsewa', isExternal: true },
    ],
    suggestedFollowUps: [
      'Where is your office located?',
      'Upcoming blood donation campaigns',
      'Emergency hotlines in Nepal',
    ],
  },
];

/**
 * Intelligent client-side matcher that finds the most relevant knowledge item
 * based on exact intent, keywords, and token frequency.
 */
export function queryKnowledgeBase(rawQuery: string): BotKnowledgeItem {
  const query = rawQuery.toLowerCase().trim();

  // 1. Direct high-priority intent matching
  if (/^(hi|hello|hey|namaste|namaskar|k cha|k chha|greetings|hola)\b/i.test(query)) {
    const greeting = BOT_KNOWLEDGE_BASE.find((k) => k.id === 'greetings');
    if (greeting) return greeting;
  }

  // 2. Score-based matching across all knowledge items
  let bestItem: BotKnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of BOT_KNOWLEDGE_BASE) {
    let score = 0;

    // Check exact keyword matches
    for (const kw of item.keywords) {
      if (query.includes(kw)) {
        score += kw.length > 5 ? 6 : 3;
      }
    }

    // Check words in title
    const titleWords = item.title.toLowerCase().split(/\s+/);
    for (const tw of titleWords) {
      if (query.includes(tw) && tw.length > 3) {
        score += 2;
      }
    }

    // Check words in query vs keywords
    const queryTokens = query.split(/\s+/);
    for (const token of queryTokens) {
      if (token.length > 2) {
        if (item.keywords.some((kw) => kw.includes(token))) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  // 3. Fallback: If score is high enough, return best match
  if (bestItem && highestScore >= 2) {
    return bestItem;
  }

  // 4. Smart fallback response with context and suggestions
  return {
    id: 'fallback',
    keywords: [],
    intents: ['fallback'],
    title: 'Here is How I Can Help You',
    response: `I want to make sure you get the exact medical or donation assistance you need.

Here are the most common things people ask me about:
• **Voluntary Blood Donors:** Search donors by group (A+, B+, O+, AB+, O-, etc.) or register as a donor.
• **Emergency Assistance:** 24/7 hotline **+977 9845012345**, Ambulance **102**, Narayani Hospital, Red Cross Blood Bank.
• **Health Tools:** BMI calculator (Asian cutoffs), Blood pressure staging, Nepali meal planning, Sleep debt tracking.
• **Health Guides:** COVID-19 rules, Dengue fever home care, Hypertension, Diabetes.

Please click one of the quick options below, or type your question in simple words!`,
    actionLinks: [
      { label: '🩸 Search Blood Donors', path: '/blood-bank' },
      { label: '🚨 Emergency Desk', path: '/emergency' },
      { label: '🧮 Health Calculators', path: '/health-tools' },
      { label: '📞 Contact Hotlines', path: '/contact' },
    ],
    suggestedFollowUps: [
      'How to find a blood donor?',
      'What are your emergency hotlines?',
      'Check my BMI',
      'Who is on the team?',
    ],
  };
}
