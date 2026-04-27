"""
Farmers Adviser - FastAPI Backend
AI-powered agricultural advisory system
"""

from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
import random
import json
import re
import base64
from datetime import datetime

app = FastAPI(
    title="Farmers Adviser API",
    description="AI-powered agricultural advisory backend for Digital Krishi Officer",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# Knowledge Base (RAG Simulation)
# ============================================================
AGRICULTURAL_KB = {
    "rice_blast": {
        "disease": "Rice Blast (Magnaporthe oryzae)",
        "symptoms": ["Diamond-shaped lesions", "Gray center on lesions", "Neck rot", "White ears"],
        "treatments": ["Tricyclazole 75WP @ 0.6g/L", "Isoprothiolane 40EC @ 1.5ml/L", "Carbendazim + Mancozeb"],
        "organic": ["Trichoderma viride @ 2.5kg/ha", "Neem seed kernel extract 5%", "Pseudomonas fluorescens"],
        "prevention": ["Resistant varieties (IR-64, Jyoti)", "Balanced nitrogen", "Proper spacing"]
    },
    "aphids": {
        "pest": "Aphids (Hemiptera)",
        "symptoms": ["Clusters on young shoots", "Curled/distorted leaves", "Sticky honeydew", "Sooty mold"],
        "treatments": ["Imidacloprid 17.8SL @ 0.3ml/L", "Thiamethoxam 25WG @ 0.5g/L"],
        "organic": ["Neem oil 5ml/L", "Reflective mulches", "Ladybird beetle conservation"],
        "prevention": ["Avoid excess nitrogen", "Companion planting with marigold"]
    },
    "nitrogen_deficiency": {
        "issue": "Nitrogen Deficiency",
        "symptoms": ["Yellowing from older leaves", "Stunted growth", "Pale green color"],
        "treatments": ["Urea top dressing @ 20kg N/ha", "Foliar spray 2% urea", "Ammonium sulfate"],
        "organic": ["Green manure (Dhaincha)", "Compost @ 5t/ha", "FYM application"],
        "prevention": ["Soil testing before sowing", "Split fertilizer application"]
    },
    "whitefly": {
        "pest": "Whitefly (Bemisia tabaci)",
        "symptoms": ["Yellow leaves", "White flies on leaf undersides", "Sooty mold", "Virus transmission"],
        "treatments": ["Acetamiprid 20SP @ 0.2g/L", "Pymetrozine 50WG @ 0.6g/L", "Buprofezin 25SC"],
        "organic": ["Yellow sticky traps", "Neem oil", "Azadirachtin 0.03% spray"],
        "prevention": ["Reflective mulches", "Remove weeds", "Avoid excessive nitrogen"]
    },
    "soil_ph": {
        "issue": "Soil pH Management",
        "acidic": "Apply Agricultural Lime @ 1-2t/ha, Dolomite if Mg deficient",
        "alkaline": "Apply Gypsum @ 200-400 kg/ha, Elemental Sulfur @ 100-200 kg/ha",
        "ideal_range": "6.0 - 7.0 for most crops"
    }
}

GOVT_SCHEMES = [
    {
        "name": "PM-KISAN",
        "description": "Direct income support of ₹6,000/year to small & marginal farmers",
        "amount": "₹6,000/year (₹2,000 per installment)",
        "eligibility": "Farmers with less than 2 hectares land",
        "portal": "pmkisan.gov.in"
    },
    {
        "name": "PMFBY",
        "description": "Pradhan Mantri Fasal Bima Yojana - Crop insurance scheme",
        "amount": "Coverage up to crop value",
        "eligibility": "All farmers growing notified crops",
        "portal": "pmfby.gov.in"
    },
    {
        "name": "KCC",
        "description": "Kisan Credit Card - Easy credit for agricultural needs",
        "amount": "Up to ₹3 lakhs at 4% interest",
        "eligibility": "All farmers, sharecroppers, tenant farmers",
        "portal": "nabard.org"
    }
]

# ============================================================
# Models
# ============================================================
class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    session_id: Optional[str] = None
    user_id: Optional[str] = None
    context: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str
    language: str
    intent: str
    sources: List[str] = []
    timestamp: str

class DiagnosisRequest(BaseModel):
    image_base64: str
    crop_type: Optional[str] = None
    language: str = "en"

# ============================================================
# Intent Detection
# ============================================================
def detect_intent(message: str) -> str:
    msg = message.lower()
    if any(w in msg for w in ["disease", "blight", "rot", "spot", "lesion", "infection", "fungus", "रोग", "ರೋಗ"]):
        return "disease"
    if any(w in msg for w in ["pest", "insect", "worm", "borer", "aphid", "whitefly", "thrip", "कीट", "ಕೀಟ"]):
        return "pest"
    if any(w in msg for w in ["soil", "ph", "nitrogen", "fertilizer", "urea", "deficiency", "मिट्टी", "ಮಣ್ಣು"]):
        return "soil"
    if any(w in msg for w in ["water", "irrigation", "drip", "sprinkler", "drought", "पानी", "ನೀರು"]):
        return "water"
    if any(w in msg for w in ["weather", "rain", "monsoon", "temperature", "मौसम", "ಹವಾಮಾನ"]):
        return "weather"
    if any(w in msg for w in ["scheme", "subsidy", "government", "yojana", "pension", "योजना", "ಯೋಜನೆ"]):
        return "scheme"
    if any(w in msg for w in ["price", "market", "sell", "mandi", "rate", "भाव", "ಬೆಲೆ"]):
        return "market"
    return "general"

# ============================================================
# AI Response Generator (Knowledge-Based RAG Simulation)
# ============================================================
def generate_response(message: str, language: str, intent: str) -> tuple[str, list[str]]:
    sources = ["Agricultural Knowledge Base", "ICAR Guidelines 2024"]

    responses = {
        "disease": {
            "en": f"""## 🦠 Crop Disease Advisory

Based on your query, here's expert guidance:

**Common Disease Symptoms & Treatment:**

**1. Fungal Diseases** (Most common in humid conditions)
- **Symptoms**: Spots, lesions, powdery coating, wilting
- **Chemical Treatment**: 
  - Mancozeb 75WP @ 2.5g/L water
  - Carbendazim 50WP @ 1g/L water
  - Propiconazole 25EC @ 1ml/L water
- **Organic Treatment**:
  - Trichoderma viride @ 2.5kg/ha with compost
  - Neem seed kernel extract 5% spray
  - Copper-based Bordeaux mixture 1%

**2. Key Prevention Tips**:
- Use certified disease-free seeds
- Maintain proper plant spacing (6-8 inches)
- Avoid waterlogging — ensure drainage
- Apply balanced NPK fertilizers

💡 **Tip**: For accurate diagnosis, upload a photo using our Crop Diagnosis feature!

📞 **Emergency Help**: Call Kisan Call Centre **1800-180-1551** (Free, 24/7)""",

            "hi": f"""## 🦠 फसल रोग सलाह

आपके प्रश्न के आधार पर विशेषज्ञ मार्गदर्शन:

**सामान्य रोग लक्षण और उपचार:**

**फफूंद रोग** (नमी में अधिक):
- **लक्षण**: धब्बे, घाव, पीलापन
- **रासायनिक उपचार**: 
  - मैंकोजेब 75WP @ 2.5 ग्राम/लीटर
  - कार्बेंडाजिम 50WP @ 1 ग्राम/लीटर
- **जैविक उपचार**:
  - ट्राइकोडर्मा @ 2.5 किग्रा/हेक्टेयर
  - नीम बीज अर्क 5% स्प्रे

**रोकथाम के उपाय**:
- प्रमाणित बीज का उपयोग करें
- उचित दूरी बनाए रखें
- जलभराव से बचें

📞 **किसान कॉल सेंटर**: 1800-180-1551 (मुफ्त)""",

            "kn": f"""## 🦠 ಬೆಳೆ ರೋಗ ಸಲಹೆ

ನಿಮ್ಮ ಪ್ರಶ್ನೆಯ ಆಧಾರದ ಮೇಲೆ ತಜ್ಞ ಮಾರ್ಗದರ್ಶನ:

**ಶಿಲೀಂಧ್ರ ರೋಗಗಳು:**
- **ಲಕ್ಷಣಗಳು**: ಚುಕ್ಕೆಗಳು, ಗಾಯಗಳು, ಹಳದಿ ಬಣ್ಣ
- **ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ**:
  - ಮ್ಯಾಂಕೋಜೆಬ್ 75WP @ 2.5g/L
  - ಕಾರ್ಬೆಂಡಜಿಮ್ 50WP @ 1g/L
- **ಸಾವಯವ ಚಿಕಿತ್ಸೆ**:
  - ಟ್ರೈಕೊಡರ್ಮ @ 2.5kg/ಹೆ
  - ಬೇವಿನ ಬೀಜ ಸಾರ 5%

**ತಡೆಗಟ್ಟುವಿಕೆ**:
- ಪ್ರಮಾಣೀಕೃತ ಬೀಜ ಬಳಸಿ
- ಸರಿಯಾದ ಅಂತರ ಕಾಪಾಡಿ

📞 **ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್**: 1800-180-1551"""
        },

        "pest": {
            "en": f"""## 🐛 Pest Management Advisory

**Integrated Pest Management (IPM) Approach:**

**Sucking Pests (Aphids, Whiteflies, Thrips):**
- *Chemical*: Imidacloprid 17.8SL @ 0.3ml/L or Thiamethoxam 25WG @ 0.5g/L
- *Organic*: Neem oil (5ml/L) + liquid soap (2ml/L) spray
- *Biological*: Release Chrysoperla carnea @ 1 lakh eggs/ha

**Stem Borers:**
- *Chemical*: Chlorpyrifos 20EC @ 2.5ml/L or Cartap HCl 4G @ 20kg/ha
- *Biological*: Trichogramma japonicum @ 5 cards/ha
- *Cultural*: Light traps (1/ha), pheromone traps

**General IPM Principles:**
1. 🔍 Regular field scouting (twice weekly)
2. 📊 Economic Threshold Level (ETL) before spraying
3. 🌿 Preserve natural enemies
4. 🔄 Rotate pesticides to prevent resistance

⚠️ **Safety**: Always use protective gear during pesticide application!""",

            "hi": """## 🐛 कीट प्रबंधन सलाह

**एकीकृत कीट प्रबंधन (IPM):**

**रस चूसने वाले कीट (एफिड्स, व्हाइटफ्लाई):**
- रासायनिक: इमिडाक्लोप्रिड 17.8SL @ 0.3ml/L
- जैविक: नीम तेल 5ml/L + तरल साबुन 2ml/L

**तना छेदक:**
- रासायनिक: क्लोरपाइरीफॉस 20EC @ 2.5ml/L
- जैविक: ट्राइकोग्रामा 5 कार्ड/हेक्टेयर

**सामान्य सुझाव:**
- सप्ताह में दो बार खेत का निरीक्षण करें
- ETL स्तर पर ही कीटनाशक छिड़कें
- प्राकृतिक शत्रुओं की रक्षा करें""",

            "kn": """## 🐛 ಕೀಟ ನಿರ್ವಹಣೆ ಸಲಹೆ

**ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ (IPM):**

**ರಸ ಹೀರುವ ಕೀಟಗಳು:**
- ರಾಸಾಯನಿಕ: ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ 17.8SL @ 0.3ml/L
- ಸಾವಯವ: ಬೇವಿನ ಎಣ್ಣೆ 5ml/L ಸಿಂಪಡಿಸಿ

**ಕಾಂಡ ಕೊರೆಯುವ ಹುಳ:**
- ರಾಸಾಯನಿಕ: ಕ್ಲೋರ್‌ಪೈರಿಫಾಸ್ 20EC @ 2.5ml/L
- ಜೈವಿಕ: ಟ್ರೈಕೊಗ್ರಾಮ @ 5 ಕಾರ್ಡ್/ಹೆ"""
        },

        "soil": {
            "en": f"""## 🌱 Soil Health Advisory

**Soil Testing & Management Guide:**

**Optimal Soil Parameters:**
| Parameter | Ideal Range | Crop Impact |
|-----------|-------------|-------------|
| pH | 6.0 - 7.0 | Nutrient availability |
| Nitrogen | 280+ kg/ha | Growth & greenness |
| Phosphorus | 25+ kg/ha | Root development |
| Potassium | 120+ kg/ha | Stress tolerance |
| Organic Matter | 1.5-2.5% | Soil structure |

**How to Improve Soil Health:**
1. 🌿 **Organic Matter**: Add FYM (10-15t/ha) or compost
2. 🔄 **Crop Rotation**: Legume-cereal rotation
3. ♻️ **Green Manure**: Dhaincha or Sunhemp before transplanting
4. 🧪 **Balanced Fertilization**: Based on soil test report

**Soil pH Correction:**
- Acidic soil (pH < 6): Add Agricultural Lime @ 1-2 t/ha
- Alkaline soil (pH > 8): Apply Gypsum @ 200-400 kg/ha

🔬 **Get Free Soil Test**: Visit your nearest Krishi Bhavan or portal: soilhealth.dac.gov.in""",
            "hi": """## 🌱 मृदा स्वास्थ्य सलाह

**मिट्टी परीक्षण और प्रबंधन:**

**आदर्श मिट्टी मापदंड:**
- pH: 6.0 - 7.0 (अधिकांश फसलों के लिए)
- नाइट्रोजन: 280+ किग्रा/हेक्टेयर
- फॉस्फोरस: 25+ किग्रा/हेक्टेयर

**मिट्टी सुधार के उपाय:**
1. गोबर की खाद 10-15 टन/हेक्टेयर डालें
2. हरी खाद फसल (ढैंचा, सनई) उगाएं
3. फसल चक्र अपनाएं
4. मिट्टी परीक्षण के आधार पर खाद दें

🆓 **मुफ्त मिट्टी परीक्षण**: soilhealth.dac.gov.in""",
            "kn": """## 🌱 ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸಲಹೆ

**ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ನಿರ್ವಹಣೆ:**

**ಸೂಕ್ತ ಮಣ್ಣಿನ ಮಾಪದಂಡಗಳು:**
- pH: 6.0 - 7.0 (ಹೆಚ್ಚಿನ ಬೆಳೆಗಳಿಗೆ)
- ಸಾರಜನಕ: 280+ kg/ha

**ಮಣ್ಣು ಸುಧಾರಣೆ:**
1. ಸಗಣಿ ಗೊಬ್ಬರ 10-15 ಟನ್/ಹೆ
2. ಹಸಿರು ಗೊಬ್ಬರ ಬೆಳೆ (ಧೈಂಚ) ಬೆಳೆಸಿ
3. ಬೆಳೆ ತಿರುಗಾವಳಿ ಮಾಡಿ"""
        },

        "scheme": {
            "en": f"""## 📋 Government Schemes for Farmers

Here are the key schemes you should know about:

**1. 💰 PM-KISAN (PM Kisan Samman Nidhi)**
- **Benefit**: ₹6,000/year direct to bank account
- **Eligibility**: Small & marginal farmers (< 2 hectares)
- **Apply**: pmkisan.gov.in | Helpline: 155261

**2. 🛡️ PMFBY (Crop Insurance)**
- **Benefit**: Insurance coverage for crop losses
- **Premium**: 1.5-5% of sum insured (govt subsidized)
- **Apply**: pmfby.gov.in

**3. 💳 Kisan Credit Card (KCC)**
- **Benefit**: Credit up to ₹3 lakh at 4% interest
- **Eligibility**: All farmers
- **Apply**: Nearest bank or NABARD

**4. 🌱 Soil Health Card**
- **Benefit**: Free soil testing + personalized fertilizer advice
- **Apply**: soilhealth.dac.gov.in | Nearest Krishi Bhavan

**5. 📊 eNAM (National Agri Market)**
- **Benefit**: Sell crops at better prices online
- **Register**: enam.gov.in

📞 **Kisan Call Centre**: 1800-180-1551 (Free, 24/7, Multilingual)""",

            "hi": """## 📋 किसानों के लिए सरकारी योजनाएं

**मुख्य योजनाएं:**

**1. PM-किसान**
- ₹6,000/वर्ष सीधे बैंक खाते में
- pmkisan.gov.in पर पंजीकरण करें

**2. PMFBY - फसल बीमा**
- फसल नुकसान पर बीमा कवरेज
- pmfby.gov.in

**3. किसान क्रेडिट कार्ड**
- ₹3 लाख तक 4% ब्याज पर ऋण
- नजदीकी बैंक में आवेदन करें

**4. मृदा स्वास्थ्य कार्ड**
- मुफ्त मिट्टी परीक्षण
- soilhealth.dac.gov.in

📞 किसान कॉल सेंटर: 1800-180-1551""",

            "kn": """## 📋 ರೈತರಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು

**ಪ್ರಮುಖ ಯೋಜನೆಗಳು:**

**1. PM-ಕಿಸಾನ್**
- ₹6,000/ವರ್ಷ ನೇರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ
- pmkisan.gov.in ನಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿ

**2. PMFBY - ಬೆಳೆ ವಿಮೆ**
- ಬೆಳೆ ನಷ್ಟಕ್ಕೆ ವಿಮೆ ರಕ್ಷಣೆ
- pmfby.gov.in

**3. ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್**
- ₹3 ಲಕ್ಷದವರೆಗೆ 4% ಬಡ್ಡಿಯಲ್ಲಿ ಸಾಲ

📞 ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1800-180-1551"""
        },

        "general": {
            "en": """## 🌾 Welcome to Farmers Adviser — Your Digital Krishi Officer!

I'm here to help with all your farming needs. Here's what I can help you with:

**🦠 Crop Diseases**
- Identify symptoms and get treatment plans
- Both chemical and organic remedies

**🐛 Pest Management**  
- Integrated Pest Management (IPM) guidance
- Safe and effective pesticide recommendations

**🌱 Soil & Nutrition**
- Soil health improvement tips
- Fertilizer recommendations based on crop needs

**💧 Irrigation**
- Water management techniques
- Drip and sprinkler irrigation guidance

**📋 Government Schemes**
- PM-KISAN, PMFBY, KCC, eNAM
- Eligibility and application guidance

**🌤️ Weather Advisory**
- Season-based crop recommendations

---
*Please describe your specific farming problem, and I'll provide detailed expert advice!*

📞 Emergency: Kisan Call Centre **1800-180-1551** (Free, 24/7)""",

            "hi": """## 🌾 किसान सलाहकार में आपका स्वागत है!

मैं आपकी खेती से जुड़ी सभी समस्याओं में मदद कर सकता हूं:

**🦠 फसल रोग** - लक्षण पहचान और उपचार
**🐛 कीट प्रबंधन** - जैविक और रासायनिक नियंत्रण  
**🌱 मिट्टी स्वास्थ्य** - परीक्षण और सुधार के उपाय
**💧 सिंचाई** - जल प्रबंधन तकनीक
**📋 सरकारी योजनाएं** - PM-किसान, PMFBY, KCC

अपनी खेती की समस्या बताएं, मैं विस्तृत सलाह दूंगा!

📞 किसान कॉल सेंटर: **1800-180-1551**""",

            "kn": """## 🌾 ರೈತ ಸಲಹೆಗಾರಕ್ಕೆ ಸ್ವಾಗತ!

ನಾನು ನಿಮ್ಮ ಎಲ್ಲಾ ಕೃಷಿ ಸಮಸ್ಯೆಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:

**🦠 ಬೆಳೆ ರೋಗಗಳು** - ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ
**🐛 ಕೀಟ ನಿರ್ವಹಣೆ** - ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ
**🌱 ಮಣ್ಣಿನ ಆರೋಗ್ಯ** - ಪರೀಕ್ಷೆ ಮತ್ತು ಸುಧಾರಣೆ
**💧 ನೀರಾವರಿ** - ಜಲ ನಿರ್ವಹಣೆ
**📋 ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು** - PM-ಕಿಸಾನ್, PMFBY

ನಿಮ್ಮ ಕೃಷಿ ಸಮಸ್ಯೆ ತಿಳಿಸಿ!

📞 ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: **1800-180-1551**"""
        }
    }

    lang_responses = responses.get(intent, responses["general"])
    response_text = lang_responses.get(language, lang_responses.get("en", ""))

    return response_text, sources


# ============================================================
# Disease Detection Simulation
# ============================================================
DISEASES = [
    {
        "name": "Rice Blast", "crop": "Paddy/Rice", "confidence": 87,
        "severity": "high",
        "symptoms": ["Diamond-shaped lesions with gray centers", "Reddish-brown margins", "Neck rot causing white ears"],
        "chemical_remedies": ["Tricyclazole 75WP @ 0.6g/L", "Isoprothiolane 40EC @ 1.5ml/L"],
        "organic_remedies": ["Trichoderma viride @ 2.5kg/ha", "Neem seed kernel extract 5%"],
        "prevention": ["Use resistant varieties (IR-64, Jyoti)", "Balanced nitrogen application", "Proper field drainage"]
    },
    {
        "name": "Early Blight", "crop": "Tomato", "confidence": 92,
        "severity": "medium",
        "symptoms": ["Dark brown spots with concentric rings", "Yellow halo around lesions", "Lower older leaves first"],
        "chemical_remedies": ["Mancozeb 75WP @ 2.5g/L", "Chlorothalonil 75WP @ 2g/L"],
        "organic_remedies": ["Bacillus subtilis spray", "Copper-based Bordeaux 1%", "Neem oil + soap spray"],
        "prevention": ["Crop rotation 2-3 years", "Mulching around plants", "Water at plant base only"]
    },
    {
        "name": "Powdery Mildew", "crop": "Cucurbits/Wheat", "confidence": 94,
        "severity": "medium",
        "symptoms": ["White powdery coating on leaves", "Distorted young leaves", "Premature leaf fall"],
        "chemical_remedies": ["Sulfur 80WP @ 3g/L", "Hexaconazole 5EC @ 1ml/L"],
        "organic_remedies": ["Baking soda solution 1%", "Neem oil spray", "Milk spray 10%"],
        "prevention": ["Proper spacing", "Avoid overhead irrigation", "Remove infected debris"]
    }
]


# ============================================================
# API Routes
# ============================================================

@app.get("/")
async def root():
    return {
        "message": "🌾 Farmers Adviser API",
        "version": "1.0.0",
        "description": "AI-powered agricultural advisory system",
        "endpoints": {
            "chat": "POST /api/chat",
            "diagnosis": "POST /api/diagnosis",
            "schemes": "GET /api/schemes",
            "weather": "GET /api/weather",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    AI Chat endpoint for farmer queries.
    Supports multilingual responses in English, Hindi, and Kannada.
    """
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    intent = detect_intent(req.message)
    response, sources = generate_response(req.message, req.language, intent)

    return ChatResponse(
        response=response,
        language=req.language,
        intent=intent,
        sources=sources,
        timestamp=datetime.now().isoformat()
    )

@app.post("/api/diagnosis")
async def diagnose_crop(
    file: Optional[UploadFile] = File(None),
    crop_type: Optional[str] = Form(None),
    language: str = Form("en")
):
    """
    Crop disease diagnosis from uploaded image.
    Returns disease identification with treatment and prevention advice.
    """
    if not file:
        raise HTTPException(status_code=400, detail="Image file is required")

    # In production: Use TensorFlow/PyTorch model for actual inference
    # For now: Simulate ML diagnosis
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB.")

    # Simulate model inference delay and result
    disease = random.choice(DISEASES)

    return {
        "success": True,
        "crop_type": crop_type or disease["crop"],
        "disease": disease["name"],
        "confidence": disease["confidence"],
        "severity": disease["severity"],
        "symptoms": disease["symptoms"],
        "chemical_remedies": disease["chemical_remedies"],
        "organic_remedies": disease["organic_remedies"],
        "prevention": disease["prevention"],
        "timestamp": datetime.now().isoformat(),
        "note": "Results are AI-assisted. Consult your local Krishi Bhavan for confirmation."
    }

@app.get("/api/schemes")
async def get_schemes(category: Optional[str] = None):
    """Get government schemes for farmers"""
    return {
        "success": True,
        "schemes": GOVT_SCHEMES,
        "total": len(GOVT_SCHEMES),
        "helpline": "1800-180-1551"
    }

@app.get("/api/weather")
async def get_weather(district: str = "Dharwad", state: str = "Karnataka"):
    """Get weather advisory for farming (simulated)"""
    conditions = ["Sunny", "Partly Cloudy", "Overcast", "Light Rain Expected"]
    return {
        "success": True,
        "location": f"{district}, {state}",
        "temperature": random.randint(22, 35),
        "humidity": random.randint(50, 85),
        "condition": random.choice(conditions),
        "wind_speed": random.randint(8, 18),
        "advisory": "Monitor soil moisture closely. Irrigation may not be needed if rain expected.",
        "forecast": [
            {"day": "Today", "max": 30, "min": 22, "condition": "Sunny"},
            {"day": "Tomorrow", "max": 28, "min": 20, "condition": "Partly Cloudy"},
            {"day": "Day 3", "max": 25, "min": 18, "condition": "Rain Expected"},
        ],
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/market-prices")
async def get_market_prices():
    """Get current crop market prices (simulated MSP data)"""
    prices = [
        {"crop": "Wheat", "price": 2275, "unit": "₹/quintal", "change": 1.2, "trend": "up"},
        {"crop": "Paddy", "price": 2183, "unit": "₹/quintal", "change": 0.8, "trend": "up"},
        {"crop": "Maize", "price": 1935, "unit": "₹/quintal", "change": -0.3, "trend": "down"},
        {"crop": "Soybean", "price": 4600, "unit": "₹/quintal", "change": 2.1, "trend": "up"},
        {"crop": "Cotton", "price": 6620, "unit": "₹/quintal", "change": 0.5, "trend": "up"},
        {"crop": "Groundnut", "price": 6377, "unit": "₹/quintal", "change": 1.8, "trend": "up"},
    ]
    return {
        "success": True,
        "source": "MSP 2025-26 (Government Mandated)",
        "prices": prices,
        "last_updated": datetime.now().isoformat()
    }

@app.get("/api/crop-advisory/{crop}")
async def crop_advisory(crop: str, language: str = "en"):
    """Get crop-specific advisory"""
    advisories = {
        "rice": {
            "name": "Paddy / Rice",
            "season": "Kharif (June-November)",
            "water_need": "High (1200-1500mm)",
            "soil": "Clay or clay loam, pH 5.5-6.5",
            "key_stages": ["Land preparation", "Nursery (25 days)", "Transplanting", "Tillering", "Panicle initiation", "Flowering", "Maturity"],
            "common_issues": ["Blast", "Sheath blight", "BLB", "Brown plant hopper", "Stem borer"],
            "tips": ["Use certified seeds", "Crop rotation with legumes", "Weed management in first 40 days is critical"]
        },
        "wheat": {
            "name": "Wheat",
            "season": "Rabi (October-March)",
            "water_need": "Moderate (450-650mm)",
            "soil": "Well-drained loam, pH 6.0-7.5",
            "key_stages": ["Germination", "Tillering", "Stem elongation", "Booting", "Heading", "Grain fill", "Maturity"],
            "common_issues": ["Yellow rust", "Stem rust", "Loose smut", "Aphids", "Termites"],
            "tips": ["Timely sowing (Oct 15-Nov 15)", "Seed treatment mandatory", "First irrigation at CRI stage"]
        }
    }
    crop_key = crop.lower().replace(" ", "_")
    advisory = advisories.get(crop_key, advisories.get("rice"))
    return {"success": True, "crop": crop, "advisory": advisory, "language": language}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
