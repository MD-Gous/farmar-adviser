'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Camera, Mic, BookOpen, FileText, Globe, ArrowRight, Sprout, Check, Star, Shield, Zap, Users, ChevronDown } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { FARMING_TIPS } from '@/lib/constants';

const features = [
  { icon: MessageCircle, title: 'AI Chat Assistant', desc: 'Get instant expert farming advice 24/7 in your language', color: 'bg-green-100 text-green-700' },
  { icon: Camera, title: 'Crop Diagnosis', desc: 'Upload photos to detect diseases and get treatment advice', color: 'bg-blue-100 text-blue-700' },
  { icon: Mic, title: 'Voice Interaction', desc: 'Speak naturally — get audio responses in your language', color: 'bg-purple-100 text-purple-700' },
  { icon: Globe, title: 'Multilingual', desc: 'Full support for English, Hindi & Kannada', color: 'bg-amber-100 text-amber-700' },
  { icon: BookOpen, title: 'Smart Advisory', desc: 'Knowledge base on crops, pests, soil and weather', color: 'bg-teal-100 text-teal-700' },
  { icon: FileText, title: 'Govt Schemes', desc: 'Easily access PM-KISAN, PMFBY and more subsidies', color: 'bg-rose-100 text-rose-700' },
];

const stats = [
  { value: '50+', label: 'Crop Types Covered', icon: '🌾' },
  { value: '100+', label: 'Disease Patterns', icon: '🦠' },
  { value: '3', label: 'Languages Supported', icon: '🌐' },
  { value: '24/7', label: 'AI Availability', icon: '⚡' },
];

const testimonials = [
  { name: 'Ramesh Kumar', location: 'Dharwad, Karnataka', rating: 5, text: 'This app helped me identify leaf blight in my paddy crop and save my harvest!', lang: '🇮🇳' },
  { name: 'Sunita Devi', location: 'Patna, Bihar', rating: 5, text: 'मुझे PM-KISAN योजना के बारे में तुरंत जानकारी मिली। बहुत उपयोगी!', lang: '🇮🇳' },
  { name: 'Basavanna', location: 'Bijapur, Karnataka', rating: 5, text: 'ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರ ನೀಡುತ್ತದೆ - ತುಂಬಾ ಅನುಕೂಲ!', lang: '🌿' },
];

export default function LandingPage() {
  const { language, changeLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % FARMING_TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tip = FARMING_TIPS[tipIndex];
  const tipText = language === 'hi' ? tip.hi : language === 'kn' ? tip.kn : tip.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Sprout size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-green-800 text-base leading-tight">{t('appName')}</div>
              <div className="text-xs text-green-600 hidden sm:block">{t('tagline')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher language={language} onChange={changeLanguage} />
            {user ? (
              <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
                {t('dashboard')} <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:flex btn-ghost text-sm py-2">{t('login')}</Link>
                <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">{t('getStarted')}</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-hero-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap size={16} className="text-green-600" />
                AI-Powered • Free • 24/7 Available
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Your <span className="text-gradient">Digital</span>
                <br />Krishi Officer 🌾
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Instant expert agricultural advice in your language. Detect crop diseases, get pest control tips, access government schemes, and more — anytime, anywhere.
              </p>

              {/* Tip Rotator */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <div className="text-xs text-amber-700 font-semibold mb-1">Today's Tip</div>
                    <p className="text-sm text-amber-900">{tipText}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link href="/auth/signup" className="btn-primary py-4 px-8 text-base">
                  🚀 {t('getStarted')} — Free
                </Link>
                <Link href="/advisory" className="btn-secondary py-4 px-8 text-base">
                  {t('learnMore')} <ArrowRight size={18} />
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 justify-center md:justify-start text-sm text-gray-500">
                {['No sign-up fees', 'Works offline (partial)', '3 languages'].map(item => (
                  <span key={item} className="flex items-center gap-1">
                    <Check size={14} className="text-green-600" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden md:block relative">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Phone Mockup */}
                <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-green-50 rounded-[2rem] overflow-hidden" style={{ height: '520px' }}>
                    {/* App UI Preview */}
                    <div className="bg-green-600 px-4 py-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Sprout size={14} className="text-white" />
                      </div>
                      <span className="text-white font-semibold text-sm">Farmers Adviser</span>
                    </div>
                    <div className="p-3 space-y-3 overflow-hidden">
                      {/* Chat bubbles */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2 max-w-[70%]">
                          My paddy leaves are turning yellow 🌾
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white border border-green-100 text-gray-700 text-xs rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                          🌿 This looks like <strong>Nitrogen deficiency</strong>. Apply urea @ 45kg/acre...
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-green-600 text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2 max-w-[70%]">
                          Any organic solution?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white border border-green-100 text-gray-700 text-xs rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                          Yes! Try <strong>Panchagavya spray</strong> (3%) or neem cake in soil...
                        </div>
                      </div>
                      {/* Image diagnosis preview */}
                      <div className="bg-white rounded-xl border border-green-100 p-3 mt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera size={14} className="text-green-600" />
                          <span className="text-xs font-semibold text-green-700">Crop Diagnosis</span>
                        </div>
                        <div className="bg-green-100 rounded-lg h-20 flex items-center justify-center">
                          <span className="text-3xl">🌿</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">Upload leaf photo → Get instant diagnosis</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -right-8 top-16 bg-white rounded-xl shadow-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg">✅</span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">Disease Detected</div>
                      <div className="text-xs text-gray-500">95% confidence</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-8 bottom-24 bg-white rounded-xl shadow-lg p-3 border border-amber-100">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌐</span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">3 Languages</div>
                      <div className="text-xs text-gray-500">EN • HI • KN</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon }) => (
              <div key={label} className="text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-green-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything a Farmer Needs 🌾
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From instant crop disease diagnosis to government scheme updates — all in one powerful platform built for Indian farmers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple 3-step process to get expert farming advice</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '💬', title: 'Ask Your Question', desc: 'Type, speak, or upload a photo of your crop issue in any language' },
              { step: '02', icon: '🤖', title: 'AI Analyzes', desc: 'Our AI processes your query using agricultural knowledge base and expert data' },
              { step: '03', icon: '✅', title: 'Get Expert Advice', desc: 'Receive detailed, actionable farming guidance instantly in your language' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{icon}</span>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center md:static md:w-auto md:h-auto md:bg-transparent md:text-green-600 md:text-sm md:font-bold md:mb-2">
                  {step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Farmers Love It ❤️</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, rating, text, lang }) => (
              <div key={name} className="card">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-4">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">
                    {lang}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{name}</div>
                    <div className="text-xs text-gray-500">{location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-farm-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="text-5xl mb-4">🌾</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Join thousands of farmers getting AI-powered guidance every day. Free, multilingual, and always available.
          </p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-white text-green-700 font-bold py-4 px-10 rounded-xl hover:bg-green-50 transition-colors text-lg shadow-lg">
            🚀 Start Free — No Credit Card Required
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Sprout size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold">Farmers Adviser</div>
                <div className="text-xs">Digital Krishi Officer</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/advisory" className="hover:text-white transition-colors">Advisory</Link>
              <Link href="/schemes" className="hover:text-white transition-colors">Schemes</Link>
              <Link href="/auth/login" className="hover:text-white transition-colors">Login</Link>
            </div>
            <div className="text-xs text-center">
              © 2026 Farmers Adviser · Digital Krishi Officer · Built with ❤️ for Indian Farmers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
