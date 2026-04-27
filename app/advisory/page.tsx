'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, ChevronRight, Search, ArrowLeft, X } from 'lucide-react';

const topics = [
  {
    id: 'disease', icon: '🦠', color: 'bg-red-50 text-red-700 border-red-200',
    title: 'Disease Management',
    titleHi: 'रोग प्रबंधन',
    titleKn: 'ರೋಗ ನಿರ್ವಹಣೆ',
    desc: 'Identify and treat common crop diseases',
    content: `## Common Crop Diseases & Management

### 1. Blast Disease (Paddy)
**Symptoms:** Diamond-shaped lesions with gray centers on leaves; collar rot at tillering stage.
**Causes:** Fungus *Magnaporthe oryzae*
**Treatment:**
- Spray Tricyclazole 75 WP @ 0.6 g/L water
- Apply Isoprothiolane 40 EC @ 1.5 ml/L
- Avoid excess nitrogen

### 2. Powdery Mildew (Wheat/Vegetables)
**Symptoms:** White powdery coating on leaves and stems.
**Treatment:**
- Spray Sulphur 80 WP @ 2 g/L water
- Wettable Sulphur 3 g/L
- Remove infected parts immediately

### 3. Early/Late Blight (Tomato/Potato)
**Symptoms:** Brown spots with yellow halo; water-soaked lesions.
**Treatment:**
- Apply Mancozeb 75 WP @ 2.5 g/L
- Spray Copper Oxychloride 50 WP @ 3 g/L
- Avoid overhead irrigation

### 4. Leaf Curl Virus
**Symptoms:** Curling, yellowing, and stunting of leaves.
**Treatment:**
- Control whiteflies (vector) with Imidacloprid 17.8 SL @ 0.3 ml/L
- Remove and destroy infected plants
- Use resistant varieties

### Prevention Tips
- Use certified disease-free seeds
- Practice crop rotation
- Maintain proper field drainage
- Monitor crops regularly for early detection`,
  },
  {
    id: 'pest', icon: '🐛', color: 'bg-orange-50 text-orange-700 border-orange-200',
    title: 'Pest Control',
    titleHi: 'कीट नियंत्रण',
    titleKn: 'ಕೀಟ ನಿಯಂತ್ರಣ',
    desc: 'Manage harmful insects and infestations',
    content: `## Integrated Pest Management (IPM)

### Common Pests & Control

### 1. Aphids
**Identification:** Small green/black/yellow soft-bodied insects on new growth.
**Damage:** Suck plant sap, transmit viruses, cause curling.
**Control:**
- Neem oil spray 5 ml/L water
- Imidacloprid 17.8 SL @ 0.3 ml/L
- Release ladybird beetles (natural predators)

### 2. Stem Borer (Rice)
**Identification:** Dead hearts in young plants; white earheads.
**Control:**
- Release *Trichogramma* egg parasitoids @ 1 lakh/acre
- Chlorpyrifos 20 EC @ 2.5 ml/L
- Light traps for adult moth monitoring

### 3. Thrips (Chilli/Onion)
**Identification:** Silvery streaks on leaves; curling upwards.
**Control:**
- Spinosad 45 SC @ 0.3 ml/L
- Fipronil 5 SC @ 1.5 ml/L
- Blue sticky traps

### 4. Whiteflies
**Identification:** Tiny white insects on leaf undersides; yellowing.
**Control:**
- Yellow sticky traps
- Acetamiprid 20 SP @ 0.2 g/L
- Neem-based pesticide (NSKE 5%)

### Organic/Natural Controls
| Method | Target Pest |
|--------|------------|
| Neem oil (5 ml/L) | Aphids, thrips, mites |
| NSKE 5% | Sucking pests |
| Trichogramma | Stem borers |
| Beauveria bassiana | Soil insects |
| Yellow sticky traps | Whiteflies, thrips |`,
  },
  {
    id: 'soil', icon: '🌱', color: 'bg-green-50 text-green-700 border-green-200',
    title: 'Soil Health',
    titleHi: 'मिट्टी स्वास्थ्य',
    titleKn: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ',
    desc: 'Soil testing, pH management and nutrients',
    content: `## Soil Health Management Guide

### Ideal Soil Parameters
| Parameter | Ideal Range | Deficiency Symptoms |
|-----------|-------------|---------------------|
| pH | 6.0 – 7.0 | Nutrient lockout |
| Organic Carbon | >0.75% | Poor structure |
| Nitrogen (N) | 280+ kg/ha | Yellowing leaves |
| Phosphorus (P) | 25+ kg/ha | Purple tinge |
| Potassium (K) | 120+ kg/ha | Leaf scorch |

### pH Management
- **Too Acidic (pH < 6):** Apply agricultural lime @ 1-2 t/ha
- **Too Alkaline (pH > 7.5):** Add gypsum or sulfur
- Test pH every 2 years

### Improving Soil Organic Matter
1. **Green Manure:** Grow Dhaincha or Sunhemp and incorporate
2. **Farm Yard Manure (FYM):** Apply 10-15 t/ha before sowing
3. **Vermicompost:** Apply 2-4 t/ha for best results
4. **Crop Residue Management:** Chop and incorporate instead of burning

### Nutrient Management
**For Rice:**
- N: 120 kg/ha (split 3 doses)
- P: 60 kg/ha (basal)
- K: 60 kg/ha (basal)

**For Wheat:**
- N: 120 kg/ha, P: 60 kg/ha, K: 40 kg/ha

### Get Your Free Soil Health Card
Visit your nearest Krishi Bhavan or check: [soilhealth.dac.gov.in](https://soilhealth.dac.gov.in)`,
  },
  {
    id: 'water', icon: '💧', color: 'bg-blue-50 text-blue-700 border-blue-200',
    title: 'Water Management',
    titleHi: 'जल प्रबंधन',
    titleKn: 'ನೀರಿನ ನಿರ್ವಹಣೆ',
    desc: 'Efficient irrigation and water conservation',
    content: `## Water Management & Irrigation Guide

### Irrigation Methods Comparison
| Method | Water Saving | Best For | Cost |
|--------|-------------|----------|------|
| Flood Irrigation | 0% (baseline) | Rice, sugarcane | Low |
| Sprinkler | 25-30% | Vegetables, wheat | Medium |
| Drip Irrigation | 40-50% | Fruits, vegetables | High |
| Micro-sprinkler | 30-40% | Orchards | Medium |

### Critical Irrigation Stages
**Rice:** Transplanting, tillering, panicle initiation, flowering
**Wheat:** Crown root initiation (21 DAS), tillering, jointing, flowering
**Cotton:** Flowering to boll development

### Water Conservation Techniques
1. **Mulching:** Reduces evaporation by 30-40%
   - Use paddy straw, sugarcane trash or plastic mulch
2. **Land Leveling:** Ensures uniform distribution
3. **Bunding:** Prevents runoff, retains moisture
4. **Rainwater Harvesting:** Farm ponds for dry spells

### Drip Irrigation Benefits
- Saves 40-50% water vs flood irrigation
- Reduces weed growth
- Better fertilizer efficiency (fertigation)
- Government subsidy available (up to 55% for small farmers)

### Signs of Water Stress
- **Shortage:** Wilting, leaf rolling, dry soil (3 inches down)
- **Excess:** Yellowing, root rot, waterlogged soil`,
  },
  {
    id: 'fertilizer', icon: '🧪', color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    title: 'Fertilizers',
    titleHi: 'उर्वरक',
    titleKn: 'ರಸಗೊಬ್ಬರಗಳು',
    desc: 'Organic and chemical fertilizer guidance',
    content: `## Fertilizer Management Guide

### Common Chemical Fertilizers
| Fertilizer | Nutrient Content | Application Rate |
|-----------|------------------|-----------------|
| Urea | 46% N | 2-5 bags/acre |
| DAP | 18% N + 46% P | 1-2 bags/acre |
| MOP | 60% K | 1-2 bags/acre |
| SSP | 16% P + 11% S | 3-4 bags/acre |
| NPK 10:26:26 | 10-26-26 | 2-3 bags/acre |

### Organic Fertilizers
| Type | N-P-K | Application |
|------|-------|-------------|
| Vermicompost | 1.5-2.5-1.5% | 2-4 t/ha |
| FYM | 0.5-0.2-0.5% | 10-15 t/ha |
| Neem Cake | 5-1-1.5% | 200-500 kg/ha |
| Bone Meal | 3-20-0% | 100-200 kg/ha |

### Biofertilizers
- **Rhizobium:** For legumes (pulses) — fixes atmospheric N
- **Azospirillum:** For cereals — saves 25% nitrogen
- **PSB (Phosphate Solubilizing Bacteria):** Mobilizes soil P
- **Mycorrhiza:** Improves P & water uptake

### Fertilizer Application Tips
1. Apply based on soil test results
2. Split nitrogen into 3-4 doses
3. Apply P and K as basal dose
4. Use biofertilizers as seed treatment
5. Avoid over-fertilizing — causes pollution and cost`,
  },
  {
    id: 'seeds', icon: '🌾', color: 'bg-amber-50 text-amber-700 border-amber-200',
    title: 'Seeds & Varieties',
    titleHi: 'बीज एवं किस्में',
    titleKn: 'ಬೀಜಗಳು ಮತ್ತು ತಳಿಗಳು',
    desc: 'Best crop varieties for different regions',
    content: `## Seed Selection & Crop Varieties Guide

### High-Yielding Varieties (HYV)

#### Rice
| Variety | Duration | Yield (t/ha) | Special |
|---------|----------|-------------|---------|
| Swarnadhan | 130 days | 5-6 | Popular in Karnataka |
| IR-64 | 110 days | 4-5 | Drought tolerant |
| BPT-5204 | 135 days | 5-6 | Fine grain |
| Sahyadri-4 | 115 days | 6-7 | Short duration |

#### Wheat
| Variety | Duration | Yield (t/ha) | State |
|---------|----------|-------------|-------|
| HD-2781 | 120 days | 4-5 | North India |
| GW-322 | 115 days | 4-5 | Gujarat/MP |
| K-9107 | 120 days | 4-5 | UP/Bihar |

#### Cotton
| Variety | Duration | Yield (quintals) | |
|---------|----------|-----------------|--|
| Bt Cotton | 150-160 days | 15-20 | Boll worm resistant |
| DCH-32 | 200 days | 10-12 | Long staple |

### Seed Treatment
1. **Hot water treatment:** 52°C for 10 min (viral diseases)
2. **Chemical treatment:** Thiram 2g + Carbendazim 1g per kg seed
3. **Bioagent treatment:** *Trichoderma viride* @ 4g/kg seed
4. **Rhizobium coating:** For pulses @ 600 g/ha seed

### Certified Seed Sources
- Government seed farms
- National Seed Corporation (NSC)
- State Seed Corporations
- Krishi Vigyan Kendras (KVK)`,
  },
  {
    id: 'weather', icon: '🌤️', color: 'bg-sky-50 text-sky-700 border-sky-200',
    title: 'Weather Advisory',
    titleHi: 'मौसम सलाह',
    titleKn: 'ಹವಾಮಾನ ಸಲಹೆ',
    desc: 'Season-based farming recommendations',
    content: `## Weather-Based Farming Advisory

### Seasonal Crop Calendar (South India)

#### Kharif Season (June – November)
**Sow:** Paddy, Maize, Cotton, Soybean, Groundnut, Jowar
**Key Tasks:**
- Prepare land before monsoon
- Apply basal fertilizers
- Monitor for kharif pests (stem borer, blast)

#### Rabi Season (October – March)
**Sow:** Wheat, Chickpea, Mustard, Lentil, Peas
**Key Tasks:**
- Ensure proper irrigation (no rain)
- Protect from frost (mulch/smoke method)
- Monitor aphid populations

#### Zaid (Summer) Season (March – June)
**Sow:** Watermelon, Muskmelon, Cucumber, Moong
**Key Tasks:**
- Critical irrigation needed
- Shade management for vegetables
- Short-duration varieties only

### Weather Alert Actions
| Condition | Action |
|-----------|--------|
| Heavy Rain Expected | Drain fields, postpone spray |
| Drought | Irrigation, mulching, deficit irrigation |
| Frost Alert | Smoke screens, flood irrigation, covers |
| Heatwave | Light irrigation early morning |
| Strong Wind | Staking plants, delay spraying |

### Agrometeorological Advisories
- Check **Meghdoot App** (IMD) for weekly agro-advisories
- Agromet Field Units at District Level
- Krishi Vigyan Kendra SMS alerts`,
  },
  {
    id: 'harvest', icon: '🚜', color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    title: 'Harvesting & Storage',
    titleHi: 'कटाई एवं भंडारण',
    titleKn: 'ಕೊಯ್ಲು ಮತ್ತು ಸಂಗ್ರಹಣೆ',
    desc: 'Post-harvest handling and storage techniques',
    content: `## Harvesting & Post-Harvest Management

### Harvesting Guidelines

#### Rice
- Harvest when 80-85% grains turn golden
- Moisture content: 20-25% at harvest
- Dry to 14% moisture for storage
- Use combine harvester or sickle

#### Wheat
- Harvest when crop turns golden yellow
- Moisture: 14-18%
- Avoid over-ripening (shattering losses)

#### Fruits & Vegetables
| Crop | Maturity Index | Storage Temp |
|------|---------------|-------------|
| Tomato | Color break (3/4 ripe) | 12-15°C |
| Onion | 50% top fall | 2-4°C |
| Banana | Finger diameter | 12-14°C |
| Mango | Specific gravity | 8-12°C |

### Storage Best Practices
1. **Clean storage:** Remove debris, pest-proof bins
2. **Moisture control:** Dry grain to safe moisture (14%)
3. **Fumigation:** Aluminium Phosphide 3g/tonne
4. **Metal bins:** Better than jute bags (less losses)
5. **Cool & dry:** Avoid direct sunlight

### Reducing Post-Harvest Losses
- Use proper packaging (ventilated crates for vegetables)
- Cold storage for perishables
- Grading & sorting increases market price
- Join Farmer Producer Organizations (FPO) for better price
- Sell on eNAM portal for best market rates

### Value Addition Opportunities
- Tomato → Paste, puree, ketchup
- Banana → Chips, flour
- Mango → Pickle, squash, pulp
- Turmeric → Powder, oleoresin`,
  },
];

export default function AdvisoryPage() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof topics[0] | null>(null);

  const filtered = topics.filter(tp =>
    tp.title.toLowerCase().includes(search.toLowerCase()) ||
    tp.desc.toLowerCase().includes(search.toLowerCase())
  );

  const getTitle = (tp: typeof topics[0]) =>
    language === 'hi' ? tp.titleHi : language === 'kn' ? tp.titleKn : tp.title;

  if (selected) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Advisory
          </button>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border mb-4 ${selected.color}`}>
            <span>{selected.icon}</span>
            <span>{getTitle(selected)}</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
            <div className="prose-farm" dangerouslySetInnerHTML={{ __html: renderMarkdown(selected.content) }} />
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm text-green-800">
              💬 <strong>Need personalized advice?</strong> Use our{' '}
              <Link href="/chat" className="underline font-semibold">AI Chat Assistant</Link>
              {' '}to ask specific questions about your farm.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('advisory')}</h1>
              <p className="text-gray-500 text-sm">Agricultural knowledge base for farmers</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search advisory topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Quick AI Chat CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">🤖 Can't find what you need?</h3>
              <p className="text-green-100 text-sm">Ask our AI assistant any farming question in your language</p>
            </div>
            <Link
              href="/chat"
              className="flex-shrink-0 bg-white text-green-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-green-50 transition-colors"
            >
              Ask AI →
            </Link>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelected(topic)}
              className="bg-white rounded-2xl border border-green-100 p-5 text-left hover:shadow-md hover:border-green-300 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${topic.color}`}>
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{getTitle(topic)}</h3>
                    <p className="text-gray-500 text-sm">{topic.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-green-600 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">No topics found for &quot;{search}&quot;</p>
            <p className="text-sm mt-1">Try different keywords or{' '}
              <Link href="/chat" className="text-green-600 underline">ask the AI</Link>
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^#### (.*?)$/gm, '<h4 style="font-weight:700;color:#374151;margin:10px 0 4px">$1</h4>')
    .replace(/^### (.*?)$/gm, '<h3 style="font-weight:700;color:#166534;font-size:1rem;margin:14px 0 6px">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 style="font-weight:800;color:#166534;font-size:1.15rem;margin:16px 0 8px">$1</h2>')
    .replace(/^- (.*?)$/gm, '<li style="margin:3px 0;padding-left:4px">$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul style="list-style:disc;padding-left:20px;margin:6px 0">$1</ul>')
    .replace(/`([^`]+)`/g, '<code style="background:#dcfce7;color:#166534;padding:2px 6px;border-radius:4px;font-size:0.875em">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#16a34a;text-decoration:underline">$1</a>')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td style="padding:8px 12px;border:1px solid #e5e7eb">${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, match => `<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:0.875rem">${match}</table>`)
    .replace(/\n\n/g, '</p><p style="margin:8px 0">')
    .replace(/\n/g, '<br/>');
}
