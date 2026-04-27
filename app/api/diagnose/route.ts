import { NextRequest, NextResponse } from 'next/server';

const DISEASE_DB = [
  {
    id: 'blast',
    cropType: 'Paddy / Rice',
    disease: 'Blast Disease (Magnaporthe oryzae)',
    confidence: 87,
    severity: 'high',
    symptoms: [
      'Diamond-shaped lesions with gray centers',
      'Brown to reddish-brown margins on lesions',
      'Neck rot causing white/empty earheads',
      'Spindle-shaped spots on leaf blades'
    ],
    remedies: [
      'Spray Tricyclazole 75 WP @ 0.6g/L water',
      'Apply Isoprothiolane 40 EC @ 1.5ml/L',
      'Use Carbendazim 50 WP @ 1g/L as preventive spray'
    ],
    organicRemedies: [
      'Spray Pseudomonas fluorescens @ 5g/L',
      'Apply Trichoderma viride @ 5g/L as seed treatment'
    ],
    prevention: [
      'Use resistant varieties (CO-51, ADT-43)',
      'Avoid excess nitrogen fertilization',
      'Maintain proper plant spacing (20×15 cm)',
      'Drain water periodically'
    ]
  },
  {
    id: 'blight',
    cropType: 'Tomato / Potato',
    disease: 'Early Blight (Alternaria solani)',
    confidence: 82,
    severity: 'medium',
    symptoms: [
      'Brown spots with concentric rings (target board pattern)',
      'Yellow halo around lesions',
      'Lower leaves affected first',
      'Premature defoliation'
    ],
    remedies: [
      'Spray Mancozeb 75 WP @ 2.5g/L',
      'Apply Chlorothalonil 75 WP @ 2g/L',
      'Use Copper Oxychloride 50 WP @ 3g/L'
    ],
    organicRemedies: [
      'Spray Neem oil 3ml/L + Garlic extract',
      'Bordeaux mixture 1% spray',
      'Baking soda spray (1 tsp/L water)'
    ],
    prevention: [
      'Remove infected leaves immediately',
      'Avoid overhead irrigation',
      'Practice crop rotation',
      'Improve air circulation'
    ]
  },
  {
    id: 'mildew',
    cropType: 'Wheat / Vegetables',
    disease: 'Powdery Mildew (Erysiphe sp.)',
    confidence: 91,
    severity: 'medium',
    symptoms: [
      'White powdery coating on leaves and stems',
      'Yellowing of affected leaves',
      'Premature leaf drop',
      'Distorted growth in severe cases'
    ],
    remedies: [
      'Spray Wettable Sulphur 80 WP @ 2g/L',
      'Apply Hexaconazole 5 EC @ 1ml/L',
      'Use Propiconazole 25 EC @ 1ml/L'
    ],
    organicRemedies: [
      'Spray diluted milk (1:9 with water)',
      'Baking soda 1% solution',
      'Neem oil spray 5ml/L'
    ],
    prevention: [
      'Plant resistant varieties',
      'Ensure proper spacing for airflow',
      'Avoid excess nitrogen',
      'Early morning irrigation'
    ]
  },
  {
    id: 'mosaic',
    cropType: 'Cotton / Chilli / Tomato',
    disease: 'Mosaic Virus (CMV/TMV)',
    confidence: 78,
    severity: 'high',
    symptoms: [
      'Mosaic pattern (light and dark green patches)',
      'Leaf distortion and curling',
      'Stunted plant growth',
      'Reduced fruit size and quality'
    ],
    remedies: [
      'No direct cure — remove infected plants',
      'Control aphids/whiteflies (virus vectors)',
      'Spray Imidacloprid 17.8 SL @ 0.3ml/L for vectors'
    ],
    organicRemedies: [
      'Spray Neem oil 5ml/L to control vector insects',
      'Yellow sticky traps for whitefly monitoring'
    ],
    prevention: [
      'Use virus-free certified seeds',
      'Eliminate alternate host weeds',
      'Control aphid/whitefly populations early',
      'Use reflective mulch to repel vectors'
    ]
  }
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File | null;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Simulate AI processing time
    await new Promise(r => setTimeout(r, 2000));

    // Return random result from database (simulated AI diagnosis)
    const result = DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)];

    return NextResponse.json({
      success: true,
      diagnosis: result,
      analysisTime: '2.1s',
      recommendation: `Visit your nearest Krishi Bhavan or call 1800-180-1551 for expert consultation.`
    });
  } catch {
    return NextResponse.json({ error: 'Image analysis failed' }, { status: 500 });
  }
}
