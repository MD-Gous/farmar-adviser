export const FARMING_TIPS = [
  {
    en: "Apply neem oil spray early morning to control aphids and whiteflies naturally.",
    hi: "एफिड्स और व्हाइटफ्लाइज़ को प्राकृतिक रूप से नियंत्रित करने के लिए सुबह नीम तेल स्प्रे करें।",
    kn: "ಅಫಿಡ್ ಮತ್ತು ವ್ಹೈಟ್‌ಫ್ಲೈಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು ಬೆಳಗ್ಗೆ ನೀಮ್ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
    icon: "🌿"
  },
  {
    en: "Test soil pH before sowing — ideal range is 6.0 to 7.0 for most crops.",
    hi: "बुवाई से पहले मिट्टी का pH परीक्षण करें — अधिकांश फसलों के लिए आदर्श श्रेणी 6.0 से 7.0 है।",
    kn: "ಬಿತ್ತನೆ ಮಾಡುವ ಮೊದಲು ಮಣ್ಣಿನ pH ಪರೀಕ್ಷಿಸಿ — ಹೆಚ್ಚಿನ ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಶ್ರೇಣಿ 6.0 ರಿಂದ 7.0.",
    icon: "🧪"
  },
  {
    en: "Rotate crops every season to prevent soil depletion and reduce pest buildup.",
    hi: "मिट्टी की कमी को रोकने और कीट संचय को कम करने के लिए हर मौसम में फसल चक्र अपनाएं।",
    kn: "ಮಣ್ಣಿನ ಕ್ಷಯವನ್ನು ತಡೆಗಟ್ಟಲು ಮತ್ತು ಕೀಟ ಸಮಸ್ಯೆ ಕಡಿಮೆ ಮಾಡಲು ಪ್ರತಿ ಋತುವಿನಲ್ಲಿ ಬೆಳೆ ತಿರುಗಾವಳಿ ಮಾಡಿ.",
    icon: "🔄"
  },
  {
    en: "Use drip irrigation to save up to 50% water compared to flood irrigation.",
    hi: "बाढ़ सिंचाई की तुलना में 50% तक पानी बचाने के लिए ड्रिप सिंचाई का उपयोग करें।",
    kn: "ಪ್ರವಾಹ ನೀರಾವರಿಗಿಂತ 50% ನೀರನ್ನು ಉಳಿಸಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ.",
    icon: "💧"
  },
  {
    en: "Compost organic waste to enrich soil nutrients and improve crop yield.",
    hi: "मिट्टी के पोषक तत्वों को समृद्ध करने और फसल उपज में सुधार के लिए जैविक अपशिष्ट की खाद बनाएं।",
    kn: "ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಬೆಳೆ ಇಳುವರಿ ಸುಧಾರಿಸಲು ಸಾವಯವ ತ್ಯಾಜ್ಯವನ್ನು ಗೊಬ್ಬರ ಮಾಡಿ.",
    icon: "♻️"
  }
];

export const CROP_CATEGORIES = [
  { id: 'grains', label: 'Grains & Cereals', icon: '🌾', color: 'amber' },
  { id: 'vegetables', label: 'Vegetables', icon: '🥦', color: 'green' },
  { id: 'fruits', label: 'Fruits', icon: '🍎', color: 'red' },
  { id: 'pulses', label: 'Pulses', icon: '🫘', color: 'orange' },
  { id: 'oilseeds', label: 'Oilseeds', icon: '🌻', color: 'yellow' },
  { id: 'spices', label: 'Spices', icon: '🌶️', color: 'red' },
  { id: 'sugarcane', label: 'Cash Crops', icon: '🎋', color: 'green' },
  { id: 'cotton', label: 'Fiber Crops', icon: '☁️', color: 'blue' },
];

export const GOVT_SCHEMES = [
  {
    id: '1',
    name: 'PM-KISAN',
    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year to small and marginal farmers',
    amount: '₹6,000/year',
    eligibility: 'Small & marginal farmers with less than 2 hectares land',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    link: 'https://pmkisan.gov.in',
    color: 'green',
    icon: '💰'
  },
  {
    id: '2',
    name: 'PMFBY',
    fullName: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme providing financial support to farmers in crop failure',
    amount: 'Up to crop value',
    eligibility: 'All farmers growing notified crops',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    link: 'https://pmfby.gov.in',
    color: 'blue',
    icon: '🛡️'
  },
  {
    id: '3',
    name: 'KCC',
    fullName: 'Kisan Credit Card',
    description: 'Easy credit access for agricultural needs at low interest rates',
    amount: 'Up to ₹3 lakhs @ 4% interest',
    eligibility: 'All farmers, sharecroppers, tenant farmers',
    ministry: 'Ministry of Finance',
    link: 'https://www.nabard.org',
    color: 'purple',
    icon: '💳'
  },
  {
    id: '4',
    name: 'RKVY',
    fullName: 'Rashtriya Krishi Vikas Yojana',
    description: 'State-level agricultural development for improving farm infrastructure',
    amount: 'Variable',
    eligibility: 'Farmers as per state guidelines',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    link: 'https://rkvy.nic.in',
    color: 'orange',
    icon: '🚜'
  },
  {
    id: '5',
    name: 'eNAM',
    fullName: 'National Agriculture Market',
    description: 'Online trading platform for agricultural commodities at better prices',
    amount: 'Market-linked',
    eligibility: 'All registered farmers',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    link: 'https://enam.gov.in',
    color: 'teal',
    icon: '📊'
  },
  {
    id: '6',
    name: 'Soil Health Card',
    fullName: 'Soil Health Card Scheme',
    description: 'Free soil testing and recommendations for appropriate fertilizers',
    amount: 'Free',
    eligibility: 'All farmers',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    link: 'https://soilhealth.dac.gov.in',
    color: 'brown',
    icon: '🌱'
  }
];

export const ADVISORY_TOPICS = [
  { id: 'disease', title: 'Disease Management', icon: '🦠', color: 'red', desc: 'Identify and treat common crop diseases' },
  { id: 'pest', title: 'Pest Control', icon: '🐛', color: 'orange', desc: 'Manage insects and pest infestations' },
  { id: 'soil', title: 'Soil Health', icon: '🌱', color: 'green', desc: 'Soil testing and improvement techniques' },
  { id: 'water', title: 'Water Management', icon: '💧', color: 'blue', desc: 'Irrigation methods and water conservation' },
  { id: 'fertilizer', title: 'Fertilizers', icon: '🧪', color: 'yellow', desc: 'Organic and chemical fertilizer guidance' },
  { id: 'seeds', title: 'Seeds & Varieties', icon: '🌾', color: 'amber', desc: 'Best seed varieties for your region' },
  { id: 'weather', title: 'Weather Advisory', icon: '🌤️', color: 'sky', desc: 'Season-based farming recommendations' },
  { id: 'harvest', title: 'Harvesting Tips', icon: '🚜', color: 'indigo', desc: 'Post-harvest handling and storage' },
];

export const DEMO_CHAT_RESPONSES: Record<string, string> = {
  default: `🌾 **Namaste! I'm your Digital Krishi Officer.**

I can help you with:
- 🦠 **Crop diseases** and treatment
- 🐛 **Pest management** strategies  
- 🌱 **Soil health** and fertilizers
- 💧 **Irrigation** advice
- 🌤️ **Weather-based** recommendations
- 📋 **Government schemes** and subsidies
- 🌾 **Best crop varieties** for your region

Please describe your farming issue in detail, and I'll provide expert guidance!`,

  disease: `## 🦠 Crop Disease Analysis

Based on your query, here are common diseases to watch for:

**Blast Disease (Magnaporthe oryzae)**
- *Symptoms*: Diamond-shaped lesions on leaves with gray centers
- *Treatment*: Apply Tricyclazole 75 WP @ 0.6g/L water
- *Prevention*: Use resistant varieties, balanced fertilization

**Leaf Blight**  
- *Symptoms*: Water-soaked lesions turning brown
- *Treatment*: Spray Copper Oxychloride 50 WP @ 3g/L
- *Prevention*: Avoid excessive nitrogen, ensure proper drainage

💡 **Tip**: Upload a photo of your affected crop for more accurate diagnosis!`,

  pest: `## 🐛 Pest Management Guide

**Identified Common Pests:**

**1. Aphids**
- Small green/black insects on leaf undersides
- Control: Neem oil spray (5ml/L), Imidacloprid 17.8 SL @ 0.3ml/L

**2. Stem Borer**
- Dead hearts in young plants
- Control: Release Trichogramma parasitoids, Chlorpyrifos 20 EC @ 2.5ml/L

**3. Whiteflies**
- Yellowing leaves, sticky honeydew
- Control: Yellow sticky traps, Acetamiprid 20 SP @ 0.2g/L

🌿 **Organic Options**: Neem-based pesticides are safe and effective!`,

  soil: `## 🌱 Soil Health Recommendations

**Optimal Soil Parameters:**
| Parameter | Ideal Range | Action if Low |
|-----------|-------------|---------------|
| pH | 6.0 - 7.0 | Add lime if acidic |
| Nitrogen | 280+ kg/ha | Apply urea |
| Phosphorus | 25+ kg/ha | Add DAP |
| Potassium | 120+ kg/ha | Apply MOP |

**Improvement Tips:**
1. 🌿 Add green manure crops (Dhaincha, Sunhemp)
2. ♻️ Compost crop residues instead of burning
3. 🐄 Apply FYM (Farm Yard Manure) 10-15 tons/ha
4. 🧪 Get a Soil Health Card from your nearest Krishi Bhavan

📍 Visit: [Soil Health Card Portal](https://soilhealth.dac.gov.in)`,
};
