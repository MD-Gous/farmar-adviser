import { NextRequest, NextResponse } from 'next/server';

const FARMING_KB: Record<string, string> = {
  disease: `## 🦠 Crop Disease Analysis

Based on your query, here is expert guidance:

**Common Diseases & Treatments:**

**1. Blast Disease (Paddy)**
- *Symptoms:* Diamond-shaped lesions on leaves with gray centers
- *Treatment:* Tricyclazole 75 WP @ 0.6g/L water; Isoprothiolane 40 EC @ 1.5ml/L
- *Prevention:* Resistant varieties, balanced fertilization, avoid excess N

**2. Powdery Mildew (Wheat/Vegetables)**
- *Symptoms:* White powdery coating on leaves
- *Treatment:* Sulphur 80 WP @ 2g/L or Wettable Sulphur 3g/L

**3. Leaf Blight / Early Blight**
- *Symptoms:* Brown spots with yellow halo, water-soaked lesions
- *Treatment:* Mancozeb 75 WP @ 2.5g/L, Copper Oxychloride 50 WP @ 3g/L

💡 **Pro Tip:** Upload a crop photo in the **Diagnosis** tab for AI-powered disease detection!

🏪 Contact your nearest Krishi Bhavan or call **Kisan Call Centre: 1800-180-1551**`,

  pest: `## 🐛 Integrated Pest Management

**Top Pest Controls:**

**Aphids**
- Neem oil spray 5ml/L water (organic)
- Imidacloprid 17.8 SL @ 0.3ml/L
- Ladybird beetles as natural predators

**Stem Borer (Rice)**
- Release *Trichogramma* parasitoids @ 1 lakh/acre
- Chlorpyrifos 20 EC @ 2.5ml/L
- Light traps for moth monitoring

**Whiteflies**
- Yellow sticky traps
- Acetamiprid 20 SP @ 0.2g/L
- Neem-based pesticide NSKE 5%

**Thrips (Chilli/Onion)**
- Spinosad 45 SC @ 0.3ml/L
- Blue sticky traps

| Organic Method | Target Pest |
|----------------|-------------|
| Neem oil (5ml/L) | Aphids, thrips, mites |
| NSKE 5% | Sucking pests |
| Trichogramma | Stem borers |
| Beauveria bassiana | Soil insects |`,

  soil: `## 🌱 Soil Health Management

**Ideal Soil Parameters:**
| Parameter | Ideal Range | Action if Low |
|-----------|-------------|---------------|
| pH | 6.0 – 7.0 | Apply lime if acidic |
| Organic Carbon | >0.75% | Add compost/FYM |
| Nitrogen (N) | 280+ kg/ha | Apply urea |
| Phosphorus (P) | 25+ kg/ha | Add DAP |
| Potassium (K) | 120+ kg/ha | Apply MOP |

**Soil Improvement Tips:**
1. 🌿 Add green manure (Dhaincha, Sunhemp) before sowing
2. ♻️ Apply Vermicompost 2-4 t/ha for best results
3. 🐄 FYM (Farm Yard Manure) 10-15 t/ha
4. 🔄 Rotate crops to prevent soil depletion
5. 🧪 Get **Free Soil Health Card** at [soilhealth.dac.gov.in](https://soilhealth.dac.gov.in)`,

  fertilizer: `## 🧪 Fertilizer Management Guide

**Recommended for Major Crops:**

**Rice:** N-120, P-60, K-60 kg/ha
- Apply N in 3 splits (basal, tillering, PI stage)
- P & K as basal dose

**Wheat:** N-120, P-60, K-40 kg/ha
- Half N + full P + K as basal; remaining N at tillering

**Common Fertilizers:**
| Fertilizer | Nutrient | Rate |
|-----------|---------|------|
| Urea | 46% N | 2-5 bags/acre |
| DAP | 18N + 46P | 1-2 bags/acre |
| MOP | 60% K | 1-2 bags/acre |

**Biofertilizers (Cost-Saving):**
- Rhizobium for legumes (saves 20-30 kg N/ha)
- Azospirillum for cereals (saves 25% nitrogen)
- PSB to mobilize soil phosphorus

🌿 **Organic Option:** Vermicompost 2-4 t/ha, Neem Cake 200-500 kg/ha`,

  water: `## 💧 Water & Irrigation Management

**Water Saving Methods:**
| Method | Water Saved | Best For |
|--------|------------|---------|
| Drip Irrigation | 40-50% | Vegetables, fruits |
| Sprinkler | 25-30% | Wheat, vegetables |
| Mulching | 30-40% evap. | All crops |

**Critical Irrigation Stages:**
- **Rice:** Transplanting, tillering, panicle initiation, flowering
- **Wheat:** CRI (21 DAS), tillering, jointing, flowering

**Drip Irrigation Subsidy:**
- Up to 55% subsidy for small/marginal farmers
- Apply at your District Agriculture Office

💡 Signs of water stress: Wilting, leaf rolling, dry soil 3 inches down`,

  scheme: `## 📋 Government Schemes for Farmers

**1. PM-KISAN** 💰
- ₹6,000/year direct income support
- For farmers with <2 hectares land
- Apply: [pmkisan.gov.in](https://pmkisan.gov.in)

**2. PMFBY (Crop Insurance)** 🛡️
- Premium: 2% for Kharif, 1.5% for Rabi
- Coverage: Crop failure due to any reason
- Apply: [pmfby.gov.in](https://pmfby.gov.in)

**3. Kisan Credit Card** 💳
- Up to ₹3 lakhs @ 4% interest
- For all farmers, sharecroppers, tenant farmers
- Apply at nearest bank

**4. Soil Health Card** 🌱
- Free soil testing + fertilizer recommendations
- Apply: [soilhealth.dac.gov.in](https://soilhealth.dac.gov.in)

📞 **Kisan Call Centre: 1800-180-1551** (Free, 7 AM - 10 PM)`,

  weather: `## 🌤️ Weather-Based Advisory

**Seasonal Crop Calendar:**

**Kharif (June-Nov):** Paddy, Maize, Cotton, Soybean, Groundnut
**Rabi (Oct-Mar):** Wheat, Chickpea, Mustard, Lentil
**Zaid (Mar-Jun):** Watermelon, Cucumber, Moong

**Weather Alert Actions:**
| Weather | Recommended Action |
|---------|-------------------|
| Heavy Rain | Drain fields, postpone spray operations |
| Drought | Mulching, deficit irrigation, short-duration varieties |
| Frost | Smoke screens, light irrigation at night |
| Strong Wind | Staking, delay spraying |
| Heat Wave | Morning irrigation, shade nets for vegetables |

📱 **Download Meghdoot App** (IMD) for weekly agro-advisories tailored to your location`,

  harvest: `## 🚜 Harvesting & Post-Harvest Tips

**Crop Maturity Indicators:**
- **Rice:** 80-85% grains turn golden; harvest at 20-25% moisture
- **Wheat:** Golden yellow crop; avoid over-ripening
- **Tomato:** Color break stage (3/4 ripe) for transport

**Storage Tips:**
1. Dry grain to 14% moisture before storage
2. Use metal bins (better than jute bags)
3. Fumigate with Aluminium Phosphide 3g/tonne
4. Keep storage cool, dry, and pest-proof

**Reduce Post-Harvest Losses:**
- Grade and sort produce for better price
- Use ventilated crates for vegetables
- Cold storage for perishables
- Sell on **eNAM portal** for best market rates: [enam.gov.in](https://enam.gov.in)`,

  default: `## 🌾 Namaste! Welcome to Farmers Adviser

I'm your **Digital Krishi Officer** — here to provide instant, expert agricultural guidance.

**I can help you with:**
- 🦠 **Crop Disease** diagnosis and treatment
- 🐛 **Pest Management** strategies
- 🌱 **Soil Health** and fertilizer recommendations
- 💧 **Irrigation & Water** management
- 🌤️ **Weather-based** farming advice
- 📋 **Government Schemes** (PM-KISAN, PMFBY, KCC)
- 🚜 **Harvest & Storage** best practices
- 🌾 **Seed Varieties** for your region

**Just describe your farming problem in detail and I'll provide expert guidance!**

*Example: "My paddy leaves are turning yellow at the edges" or "How to control aphids in tomato?"*

---
📞 **Emergency:** Kisan Call Centre **1800-180-1551** (Free, 7AM-10PM)`
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.match(/disease|blight|rot|rust|wilt|spot|lesion|leaf curl|fungus|virus|bacteria/))
    return FARMING_KB.disease;
  if (lower.match(/pest|insect|bug|worm|aphid|borer|thrip|whitefly|mite|caterpillar|locust/))
    return FARMING_KB.pest;
  if (lower.match(/soil|ph|organic|nutrient|nitrogen|phosphorus|potassium|compost|manure/))
    return FARMING_KB.soil;
  if (lower.match(/fertilizer|urea|dap|mop|npk|biofertilizer|rhizobium/))
    return FARMING_KB.fertilizer;
  if (lower.match(/water|irrigation|drip|sprinkler|moisture|flood|drought/))
    return FARMING_KB.water;
  if (lower.match(/scheme|subsidy|pm.?kisan|pmfby|kcc|insurance|loan|credit|government/))
    return FARMING_KB.scheme;
  if (lower.match(/weather|rain|monsoon|forecast|season|kharif|rabi|temperature|frost/))
    return FARMING_KB.weather;
  if (lower.match(/harvest|storage|post.?harvest|price|market|enam|sell|store/))
    return FARMING_KB.harvest;

  // Yellow leaves
  if (lower.match(/yellow|pale|chlorosis/))
    return `## 🌿 Yellow Leaves Diagnosis

Yellow leaves can indicate several issues:

**1. Nitrogen Deficiency (Most Common)**
- *Pattern:* Yellowing starts from older/lower leaves, moves upward
- *Fix:* Apply Urea 2-3 bags/acre as top dressing

**2. Iron Deficiency**
- *Pattern:* Young leaves yellow while veins stay green (interveinal chlorosis)
- *Fix:* Spray Ferrous Sulphate 0.5% (5g/L)

**3. Overwatering**
- *Pattern:* All leaves yellow; soggy soil
- *Fix:* Improve drainage; reduce irrigation frequency

**4. Blast / Blight Disease**
- *Pattern:* Spots with yellow halo
- *Fix:* Spray Mancozeb 75WP @ 2.5g/L

**Recommended Action:**
1. Check soil moisture (not too wet/dry)
2. Check for insects on leaf undersides
3. Get Soil Health Card for nutrient analysis
4. Upload a photo in the **Diagnosis** tab for accurate detection`;

  return FARMING_KB.default;
}

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise(r => setTimeout(r, 800));

    const response = getAIResponse(message);

    const langNote = language === 'hi'
      ? '\n\n---\n*🇮🇳 अधिक जानकारी के लिए [सलाह पेज](/advisory) पर जाएं।*'
      : language === 'kn'
      ? '\n\n---\n*🌿 ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ [ಸಲಹೆ ಪುಟ](/advisory) ಗೆ ಭೇಟಿ ನೀಡಿ.*'
      : '\n\n---\n*💡 For more details, visit the [Advisory](/advisory) page or use the [Diagnosis](/diagnosis) tool.*';

    return NextResponse.json({
      response: response + langNote,
      language,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
