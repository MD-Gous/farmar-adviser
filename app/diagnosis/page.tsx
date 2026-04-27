'use client';

import { useState, useRef } from 'react';
import { Upload, Camera, RefreshCw, Leaf, AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useLanguage } from '@/hooks/useLanguage';
import toast from 'react-hot-toast';

interface DiagnosisResult {
  cropType: string;
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  remedies: string[];
  organicRemedies: string[];
  prevention: string[];
  affectedArea: string;
}

const MOCK_RESULTS: DiagnosisResult[] = [
  {
    cropType: 'Paddy / Rice',
    disease: 'Blast Disease (Magnaporthe oryzae)',
    confidence: 87,
    severity: 'high',
    symptoms: [
      'Diamond-shaped lesions with gray centers on leaves',
      'Brown to reddish-brown lesion margins',
      'Neck rot causing white ear (flag leaf infection)',
      'Circular to oval spots on leaf sheaths'
    ],
    remedies: [
      'Spray Tricyclazole 75 WP @ 0.6g/L water immediately',
      'Apply Isoprothiolane 40 EC @ 1.5ml/L water',
      'Use Carbendazim + Mancozeb @ 2g/L as systemic fungicide',
      'Repeat spray after 10-14 days if infection persists'
    ],
    organicRemedies: [
      'Spray 10% cow urine extract every 7 days',
      'Apply Trichoderma viride @ 2.5 kg/ha with compost',
      'Use neem seed kernel extract (NSKE 5%) spray',
      'Pseudomonas fluorescens @ 2kg/ha as soil drench'
    ],
    prevention: [
      'Use blast-resistant varieties like IR-64, Jyoti, Indira',
      'Avoid excess nitrogen fertilization',
      'Ensure proper spacing for air circulation',
      'Drain fields periodically (2-3 day drainage)',
      'Use certified disease-free seeds'
    ],
    affectedArea: '~35%'
  },
  {
    cropType: 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    confidence: 92,
    severity: 'medium',
    symptoms: [
      'Dark brown circular spots with concentric rings (target pattern)',
      'Yellow halo surrounding the lesions',
      'Lesions start on older lower leaves first',
      'Stems and fruits may also be affected'
    ],
    remedies: [
      'Apply Mancozeb 75 WP @ 2.5g/L water',
      'Spray Chlorothalonil 75 WP @ 2g/L water',
      'Use Azoxystrobin 23 SC @ 1ml/L for systemic control',
      'Apply Copper Oxychloride 50 WP @ 3g/L'
    ],
    organicRemedies: [
      'Spray baking soda solution (1 tsp/L) weekly',
      'Apply compost tea as foliar spray',
      'Use Bacillus subtilis biofungicide',
      'Neem oil + liquid soap spray (2:1 ratio)'
    ],
    prevention: [
      'Remove and destroy infected plant debris',
      'Rotate crops with non-solanaceous crops for 2-3 years',
      'Mulch around plants to prevent soil splash',
      'Water at base of plants, avoid wetting foliage',
      'Plant certified disease-free transplants'
    ],
    affectedArea: '~20%'
  }
];

export default function DiagnosisPage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropType, setCropType] = useState('');
  const [showOrganic, setShowOrganic] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error('Max 10MB'); return; }
    const reader = new FileReader();
    reader.onload = () => { setImage(reader.result as string); setResult(null); };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!image) { toast.error('Please upload an image first'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2500));
    const res = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
    setResult(res);
    setLoading(false);
    toast.success('Analysis complete!');
  };

  const reset = () => { setImage(null); setResult(null); setCropType(''); };

  const severityConfig = {
    low: { color: 'text-green-700 bg-green-100', label: 'Low Severity', icon: CheckCircle },
    medium: { color: 'text-amber-700 bg-amber-100', label: 'Medium Severity', icon: Info },
    high: { color: 'text-red-700 bg-red-100', label: 'High Severity', icon: AlertTriangle },
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-1">
            📸 {t('diagnoseCrop')}
          </h1>
          <p className="text-gray-500 text-sm">Upload a photo of your crop to detect diseases and get treatment advice</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="space-y-4">
            {/* Crop Type Selector */}
            <div className="card">
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type (Optional)</label>
              <select
                value={cropType}
                onChange={e => setCropType(e.target.value)}
                className="input-field"
              >
                <option value="">Auto-detect from image</option>
                {['Paddy/Rice', 'Wheat', 'Tomato', 'Cotton', 'Maize', 'Sugarcane', 'Potato', 'Soybean', 'Groundnut', 'Chilli'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Image Upload Area */}
            <div className="card">
              {!image ? (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all"
                >
                  <div className="text-5xl mb-3">🌿</div>
                  <h3 className="font-semibold text-gray-700 mb-1">Upload Crop Photo</h3>
                  <p className="text-gray-400 text-sm mb-4">Take a clear photo of affected leaf, stem, or fruit</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
                      className="btn-primary py-2 px-4 text-sm"
                    >
                      <Upload size={16} /> {t('uploadImage')}
                    </button>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); cameraRef.current?.click(); }}
                      className="btn-secondary py-2 px-4 text-sm"
                    >
                      <Camera size={16} /> Camera
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">JPG, PNG up to 10MB</p>
                </div>
              ) : (
                <div>
                  <img src={image} alt="Crop" className="w-full rounded-xl max-h-64 object-contain bg-gray-50" />
                  <div className="flex gap-2 mt-3">
                    <button onClick={reset} className="btn-ghost text-sm py-2 flex-1">
                      <RefreshCw size={16} /> Upload New
                    </button>
                    <button
                      onClick={analyze}
                      disabled={loading}
                      className="btn-primary text-sm py-2 flex-1"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('analyzing')}
                        </>
                      ) : (
                        <>🔍 {t('analyzeImage')}</>
                      )}
                    </button>
                  </div>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
            </div>

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="font-semibold text-amber-800 mb-2 text-sm">📋 Photo Tips for Best Results</h4>
              <ul className="text-xs text-amber-700 space-y-1">
                {[
                  'Take close-up photos of affected leaves/stem',
                  'Ensure good natural lighting (avoid shadows)',
                  'Include both healthy and diseased parts',
                  'Take multiple angles for accuracy',
                  'Clean the lens before clicking'
                ].map(tip => (
                  <li key={tip} className="flex items-start gap-1.5">
                    <span>•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {loading ? (
              <div className="card flex flex-col items-center justify-center py-12">
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 border-4 border-green-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">🔬</div>
                </div>
                <p className="font-semibold text-gray-800">Analyzing your crop...</p>
                <p className="text-gray-500 text-sm mt-1">AI is examining the image patterns</p>
                <div className="mt-4 space-y-2 w-full max-w-xs">
                  {['Detecting crop type...', 'Analyzing disease patterns...', 'Generating remedies...'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Disease Header */}
                <div className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Detected Crop</div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <Leaf size={16} className="text-green-600" />
                        {result.cropType}
                      </div>
                    </div>
                    <div className={`badge ${severityConfig[result.severity].color} flex items-center gap-1`}>
                      {severityConfig[result.severity].label}
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                    <div className="text-xs text-red-600 font-medium mb-0.5">Disease Identified</div>
                    <div className="font-bold text-red-900 text-sm">{result.disease}</div>
                    <div className="text-xs text-red-700 mt-1">Affected Area: {result.affectedArea}</div>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t('confidence')}</span>
                      <span className="font-bold text-green-700">{result.confidence}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    🔍 {t('symptoms')}
                  </h3>
                  <ul className="space-y-2">
                    {result.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remedies */}
                <div className="card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      💊 {t('remedies')}
                    </h3>
                    <button
                      onClick={() => setShowOrganic(!showOrganic)}
                      className="text-xs text-green-600 font-medium flex items-center gap-1 hover:underline"
                    >
                      {showOrganic ? 'Chemical' : '🌿 Organic'} {showOrganic ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {(showOrganic ? result.organicRemedies : result.remedies).map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 rounded-lg p-2">
                        <span className="text-green-600 flex-shrink-0">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div className="card">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    🛡️ {t('prevention')}
                  </h3>
                  <ul className="space-y-2">
                    {result.prevention.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 flex-shrink-0">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button onClick={reset} className="btn-secondary flex-1 py-2.5 text-sm">
                    <RefreshCw size={16} /> New Diagnosis
                  </button>
                  <button
                    onClick={() => window.location.href = '/chat'}
                    className="btn-primary flex-1 py-2.5 text-sm"
                  >
                    💬 Ask AI More
                  </button>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="font-bold text-gray-700 mb-2">Upload a Crop Photo</h3>
                <p className="text-gray-400 text-sm">
                  Take a photo of affected leaves, stems, or fruits to get instant AI-powered disease diagnosis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
