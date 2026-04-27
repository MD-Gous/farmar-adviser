'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, Eye, EyeOff, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import toast from 'react-hot-toast';

const STATES = ['Karnataka', 'Maharashtra', 'Uttar Pradesh', 'Bihar', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Madhya Pradesh', 'Rajasthan', 'Punjab', 'Haryana', 'Gujarat', 'West Bengal', 'Odisha'];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    village: '', district: '', state: 'Karnataka',
    preferredLanguage: 'en'
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const router = useRouter();

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await signup(form);
    if (ok) {
      toast.success('Account created! Welcome, ' + form.name + ' 🌾');
      router.push('/dashboard');
    } else {
      toast.error('Registration failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-pattern flex">
      {/* Left side */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-farm-gradient w-2/5 p-12">
        <div className="text-center">
          <div className="text-7xl mb-6">🚜</div>
          <h2 className="text-white text-3xl font-bold mb-4">Join Farmers Adviser</h2>
          <p className="text-green-100 text-lg mb-8">Start your journey to smarter farming</p>
          <div className="space-y-3">
            {['Free forever', 'Expert AI guidance', 'Multilingual support', 'Govt scheme alerts'].map(item => (
              <div key={item} className="flex items-center gap-3 bg-white/10 text-white rounded-lg px-4 py-2">
                <span>✅</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => step === 1 ? router.push('/') : setStep(1)}
              className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">{step === 1 ? 'Back' : 'Previous'}</span>
            </button>
            <LanguageSwitcher language={language} onChange={changeLanguage} />
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${s === step ? 'bg-green-600 text-white' : s < step ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                  {s < step ? '✓' : s}
                </div>
                {s < 2 && <div className={`h-1 w-12 rounded-full ${s < step ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
            <span className="ml-2 text-sm text-gray-500">Step {step} of 2</span>
          </div>

          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
              <Sprout size={20} className="text-white" />
            </div>
            <div className="font-bold text-green-800">{t('appName')}</div>
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
              <p className="text-gray-500 mb-6">Step 1: Basic information</p>

              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('name')} *</label>
                  <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                    placeholder="Ramesh Kumar" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('email')} *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    placeholder="ramesh@example.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('phone')}</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                    placeholder="+91 9876543210" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('password')} *</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="Min 6 characters" className="input-field pr-12" />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-3.5 text-base">
                  Continue <ChevronRight size={18} />
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Farm Details</h1>
              <p className="text-gray-500 mb-6">Step 2: Location & language preference</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('village')}</label>
                    <input type="text" value={form.village} onChange={e => update('village', e.target.value)}
                      placeholder="Your village" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('district')}</label>
                    <input type="text" value={form.district} onChange={e => update('district', e.target.value)}
                      placeholder="District" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('state')}</label>
                  <select value={form.state} onChange={e => update('state', e.target.value)} className="input-field">
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('language')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { code: 'en', label: 'English', flag: '🇬🇧' },
                      { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
                      { code: 'kn', label: 'ಕನ್ನಡ', flag: '🌿' },
                    ].map(lang => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => { update('preferredLanguage', lang.code); changeLanguage(lang.code); }}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-colors
                          ${form.preferredLanguage === lang.code
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300 text-gray-600'}`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-xs font-medium">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
                  {loading ? <Loader2 size={20} className="animate-spin" /> : '🌾'}
                  {loading ? t('loading') : 'Create My Account'}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-green-600 font-semibold hover:underline">
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
