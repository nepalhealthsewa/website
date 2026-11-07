import React, { useState } from 'react';
import { Utensils, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { MealRecommendation } from '../../types';
import { SEO } from '../../components/common/SEO';

type DietaryGoal = 'weight-loss' | 'maintenance' | 'muscle-building' | 'diabetes-friendly' | 'heart-healthy';
type DietType = 'vegetarian' | 'non-vegetarian' | 'high-fiber-vegan';

export const MealPlannerPage: React.FC = () => {
  const [goal, setGoal] = useState<DietaryGoal>('maintenance');
  const [dietType, setDietType] = useState<DietType>('vegetarian');

  // Dynamic Nepali meal plan database
  const getMealPlan = (currentGoal: DietaryGoal, currentDiet: DietType): MealRecommendation[] => {
    if (currentGoal === 'diabetes-friendly') {
      return [
        {
          mealType: 'Breakfast',
          title: 'Sprouted Moong & Chana Salad with Boiled Eggs/Curd',
          nepaliName: 'टुसाएको चना र मुंगको खाजा',
          items: [
            '1 cup sprouted mixed legumes (chana, moong, bhatmas) with lemon, cucumber, and green coriander',
            currentDiet === 'non-vegetarian' ? '2 boiled egg whites' : '1 small bowl plain curd (dahi)',
            'Warm black tea or herbal chia without sugar',
          ],
          calories: 340,
          proteinGrams: 20,
          carbsGrams: 42,
          fatsGrams: 8,
          notes: 'High fiber with slow glycemic release, preventing morning blood glucose spikes.',
        },
        {
          mealType: 'Lunch',
          title: 'Brown Rice or Buckwheat Dhido with Mixed Dal & Gundruk',
          nepaliName: 'फापरको ढिँडो, कालो दाल र रायोको साग',
          items: [
            '1 cup buckwheat (phapar) or millet (kodo) dhido, or 1 small cup brown rice',
            '1 large bowl thick black lentil dal (mash ko daal) cooked with ginger and cumin',
            'Generous serving of fresh spinach or rayo saag with minimal mustard oil',
            'Fresh radish (mula) and cucumber salad slices',
          ],
          calories: 520,
          proteinGrams: 24,
          carbsGrams: 76,
          fatsGrams: 10,
          notes: 'Buckwheat and millet have significantly lower glycemic indices than polished white rice.',
        },
        {
          mealType: 'Afternoon Snack',
          title: 'Roasted Chana, Chiura & Green Tea',
          nepaliName: 'भुटेको चना, बदाम र हरियो चिया',
          items: [
            'Handful of dry roasted chickpeas (chana) and peanuts',
            'Cup of unsweetened green tea or tulsi tea',
          ],
          calories: 190,
          proteinGrams: 9,
          carbsGrams: 26,
          fatsGrams: 6,
          notes: 'Sustained satiety between meals to eliminate sugar cravings.',
        },
        {
          mealType: 'Dinner',
          title: 'Mixed Vegetable Soup, Tofu/Chicken Tarkari & 2 Multigrain Rotis',
          nepaliName: 'दुई वटा गहुँको रोटी, तोफु/कुखुराको झोल र तरकारी',
          items: [
            '2 medium whole wheat rotis',
            currentDiet === 'non-vegetarian'
              ? 'Grilled or lightly curried country chicken breast with mild spices'
              : 'Stir-fried tofu/paneer with cauliflower, peas, and green beans',
            '1 bowl clear seasonal bottle gourd (lauka) or pumpkin soup',
          ],
          calories: 460,
          proteinGrams: 26,
          carbsGrams: 60,
          fatsGrams: 11,
          notes: 'Lighter dinner taken at least 2.5 hours before bedtime for optimal metabolic control.',
        },
      ];
    }

    if (currentGoal === 'weight-loss') {
      return [
        {
          mealType: 'Breakfast',
          title: 'Oats Khichdi or Boiled Eggs with Sprouted Dal',
          nepaliName: 'ओट्स खिचडी वा उमालेको अण्डा',
          items: [
            'Bowl of oats or broken wheat (dalia) simmered with chopped carrots, beans, and turmeric',
            currentDiet === 'non-vegetarian' ? '2 boiled eggs' : '100g fresh paneer slices',
            '1 seasonal orange or fresh apple slice',
          ],
          calories: 310,
          proteinGrams: 18,
          carbsGrams: 38,
          fatsGrams: 7,
          notes: 'High satiety index to prevent mid-morning grazing.',
        },
        {
          mealType: 'Lunch',
          title: 'Portion-Controlled Dal Bhat with Double Tarkari',
          nepaliName: 'सन्तुलित दाल-भात र दोहोरो तरकारी',
          items: [
            '1/2 cup cooked rice (bhat) only',
            '1 full bowl yellow arhar or masoor dal',
            '2 cups mixed fresh vegetables (ghiraula, bodi, parwal, or cauli)',
            'Large plate of lemon cucumber tomato salad (eat salad first)',
          ],
          calories: 480,
          proteinGrams: 19,
          carbsGrams: 72,
          fatsGrams: 9,
          notes: 'Volume-eating technique: fills plate with low-calorie vegetables and soup rather than excess rice.',
        },
        {
          mealType: 'Afternoon Snack',
          title: 'Roasted Makhana & Black Tea',
          nepaliName: 'भुटेको मखाना र कालो चिया',
          items: ['1 small bowl roasted makhana (fox nuts) with pinch of black salt', 'Lemon black tea (sugar-free)'],
          calories: 140,
          proteinGrams: 4,
          carbsGrams: 24,
          fatsGrams: 2,
          notes: 'Crunchy, mineral-rich snack under 150 calories.',
        },
        {
          mealType: 'Dinner',
          title: 'Kwati Sprout Soup with 1 Whole Wheat Roti',
          nepaliName: 'क्वाँटी झोल र एउटा रोटी',
          items: [
            '1 generous bowl of traditional 9-sprout Kwati soup boiled with ajwain and ginger',
            '1 whole wheat roti (dry, no extra ghee)',
            'Steamed green beans and carrots',
          ],
          calories: 420,
          proteinGrams: 22,
          carbsGrams: 64,
          fatsGrams: 7,
          notes: 'Kwati provides high natural dietary fiber and plant protein.',
        },
      ];
    }

    // Default: Maintenance / Healthy Traditional Nepali
    return [
      {
        mealType: 'Breakfast',
        title: 'Traditional Chiura, Curd & Boiled Egg / Chana',
        nepaliName: 'ताजा चिउरा, दही र उमालेको अण्डा वा चना',
        items: [
          '1 cup fresh red chiura (beaten rice)',
          '1 bowl unsweetened buffalo or cow curd (dahi)',
          currentDiet === 'non-vegetarian' ? '1 boiled egg' : '1/2 cup boiled black chickpeas (chana)',
          '1 cup warm ginger water or light tea',
        ],
        calories: 420,
        proteinGrams: 19,
        carbsGrams: 62,
        fatsGrams: 9,
        notes: 'Classic wholesome Nepali morning fuel providing natural probiotics and complex carbohydrates.',
      },
      {
        mealType: 'Lunch',
        title: 'Traditional Balanced Nepali Thali',
        nepaliName: 'नेपाली थाली (दाल, भात, तरकारी र साग)',
        items: [
          '1 cup steamed rice (bhat) or fresh buckwheat dhido',
          '1 bowl yellow or black dal cooked with jimbu and turmeric',
          'Fresh saag (palak or chamsur) sautéed lightly in mustard oil',
          'Mixed seasonal vegetable tarkari (aloo, bodi, tama or bandakobi)',
          currentDiet === 'non-vegetarian' ? '1 small piece trout or country chicken curry' : 'Fresh radish and tomato chokha',
        ],
        calories: 650,
        proteinGrams: 26,
        carbsGrams: 98,
        fatsGrams: 14,
        notes: 'Balanced staple providing micronutrients, zinc, iron, and complete proteins from rice-dal complementarity.',
      },
      {
        mealType: 'Afternoon Snack',
        title: 'Seasonal Nepali Fruit & Roasted Bhatmas (Soybeans)',
        nepaliName: 'मौसमी फल र भुटेको भटमास-मकै',
        items: [
          '1 fresh guava, orange, or papaya slice',
          'Small handful of traditional roasted corn & soybeans (makai-bhatmas)',
        ],
        calories: 220,
        proteinGrams: 10,
        carbsGrams: 32,
        fatsGrams: 5,
        notes: 'Traditional high-protein crunchy Nepali snack, packed with calcium and dietary fiber.',
      },
      {
        mealType: 'Dinner',
        title: 'Multigrain Roti with Dal & Mixed Vegetable Tarkari',
        nepaliName: 'गहुँको रोटी, मुसुरो दाल र तरकारी',
        items: [
          '2 whole wheat rotis',
          '1 bowl red lentil (musuro) dal',
          'Seasonal vegetable curry with minimal salt',
          'Sliced cucumber and carrot salad',
        ],
        calories: 510,
        proteinGrams: 21,
        carbsGrams: 80,
        fatsGrams: 10,
        notes: 'Easily digestible evening meal assisting restful sleep and digestive comfort.',
      },
    ];
  };

  const currentMeals = getMealPlan(goal, dietType);
  const totalCalories = currentMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = currentMeals.reduce((acc, m) => acc + m.proteinGrams, 0);
  const totalCarbs = currentMeals.reduce((acc, m) => acc + m.carbsGrams, 0);
  const totalFats = currentMeals.reduce((acc, m) => acc + m.fatsGrams, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SEO
        title="Nepali Dietary Meal Planner | Traditional Nutrition"
        description="Personalize balanced daily meals featuring traditional Nepali ingredients: Dal, Bhat, Tarkari, Dhido, Gundruk, Kwati, and Saag, tailored by calories and goals."
        keywords="Nepali meal planner, healthy Nepali food, Dal Bhat diet, low calorie Nepali recipes, diabetic Nepali meal plan"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Nepali Dietary Meal Planner",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "description": "Nutritional planner designed with authentic Nepali cuisine and ingredients."
        }}
      />
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
          <Utensils className="w-4 h-4" />
          <span>Local Nutritional Planning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Nepali Dietary Meal Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
          Evidence-based meal structure built around wholesome Nepali ingredients (Dal, Bhat, Tarkari, Dhido, Gundruk, Kwati, fresh Saag) aligned with your health goals.
        </p>
      </div>

      {/* Goal & Preference Selector Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Select Your Health Goal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { id: 'weight-loss', label: 'Weight Loss / Calorie Deficit' },
              { id: 'maintenance', label: 'Healthy Maintenance' },
              { id: 'muscle-building', label: 'Strength & Muscle Gain' },
              { id: 'diabetes-friendly', label: 'Diabetes & Low GI' },
              { id: 'heart-healthy', label: 'Heart Healthy (Low Sodium)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGoal(item.id as DietaryGoal)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                  goal === item.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              2. Dietary Preference
            </label>
            <div className="flex gap-2">
              {[
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'non-vegetarian', label: 'Non-Vegetarian' },
                { id: 'high-fiber-vegan', label: 'Plant-Based' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  type="button"
                  onClick={() => setDietType(diet.id as DietType)}
                  className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    dietType === diet.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Calories: <span className="font-mono text-emerald-700 font-extrabold">{totalCalories} kcal</span>
            </label>
            <div className="text-xs text-slate-500">
              Macronutrient Target: <strong>{totalProtein}g</strong> Protein · <strong>{totalCarbs}g</strong> Carbs · <strong>{totalFats}g</strong> Fats
            </div>
          </div>
        </div>
      </div>

      {/* Meal Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentMeals.map((meal) => (
          <Card key={meal.mealType} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {meal.mealType}
                </span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  ~{meal.calories} kcal
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{meal.title}</h3>
                {meal.nepaliName && (
                  <span className="text-xs text-slate-500 font-medium block mt-0.5">
                    {meal.nepaliName}
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 text-xs text-slate-600">
                {meal.items.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div>
                <span className="font-semibold text-slate-700">Macros:</span> {meal.proteinGrams}g P · {meal.carbsGrams}g C · {meal.fatsGrams}g F
              </div>
              <span className="text-slate-400 italic">{meal.notes}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Visual & Cultural Nutritional Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="lg:col-span-5 h-64 rounded-xl overflow-hidden shadow-xs">
          <img
            src="/src/assets/images/healthy_nepali_nutrition_1792473887224.jpg"
            alt="Healthy traditional Nepali thali"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Authentic Nepali Nutrition Principles
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            The Healthy "Dal-Bhat" Plate Rule
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In standard Nepali diets, polished white rice often makes up 75% of the plate, which can cause excessive post-prandial glycemic load. The ideal healthy plate rule balances:
          </p>
          <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="font-bold text-emerald-900 text-sm">50%</div>
              <div className="text-slate-600 text-[11px] mt-0.5">Vegetables & Fresh Saag</div>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100">
              <div className="font-bold text-amber-900 text-sm">25%</div>
              <div className="text-slate-600 text-[11px] mt-0.5">Dal / Legumes / Protein</div>
            </div>
            <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
              <div className="font-bold text-blue-900 text-sm">25%</div>
              <div className="text-slate-600 text-[11px] mt-0.5">Rice, Dhido or Roti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong>Medical Nutrition Disclaimer:</strong> These sample meal suggestions are educational guides based on general nutritional recommendations. They do not constitute individualized Medical Nutrition Therapy (MNT). Individuals with chronic kidney disease, advanced diabetes, cardiovascular disorders, or allergies should follow a meal prescription tailored by a registered clinical dietitian.
        </div>
      </div>
    </div>
  );
};
