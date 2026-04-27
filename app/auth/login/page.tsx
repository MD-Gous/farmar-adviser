'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    const ok = await login(email, password);
    if (ok) {
      toast.success('Welcome back! 🌾');
      router.push('/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  const handleDemo = async () => {
    setLoading(true);
    await login('farmer@example.com', 'demo123');
    toast.success('Demo login successful! 🌾');
    router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-pattern flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-farm-gradient w-2/5 p-12">
        <div className="text-center">
          <div className="text-7xl mb-6">🌾</div>
          <h2 className="text-white text-3xl font-bold mb-4">Farmers Adviser</h2>
          <p className="text-green-100 text-lg mb-8">Your Digital Krishi Officer</p>
          <div className="space-y-4 text-left">
            {[
              '🤖 AI-powered expert advice',
              '📸 Instant crop disease detection',
              '🎙️ Voice queries in your language',
              '📋 Easy govt scheme access',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-green-100">
                <span className="text-lg">{item.split(' ')[0]}</span>
                <span>{item.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors">
              <ArrowLeft size={20} />
              <span className="text-sm">Back</span>
            </Link>
            <LanguageSwitcher language={language} onChange={changeLanguage} />
          </div>

          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Sprout size={22} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-green-800">{t('appName')}</div>
              <div className="text-xs text-green-600">{t('tagline')}</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('login')}</h1>
          <p className="text-gray-500 mb-8">Access your farming dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('password')}</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? <Loader2 size={20} className="animate-spin" /> : null}
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-medium">Or</span>
            </div>
          </div>

          <button
            onClick={handleDemo}
            disabled={loading}
            className="btn-secondary w-full py-3.5 text-base"
          >
            🌾 Try Demo Account
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-green-600 font-semibold hover:underline">
              {t('signup')}
            </Link>
          </p>

          {/* Quick language hints */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p className="text-xs text-amber-700">
              🌐 Available in <strong>English • हिंदी • ಕನ್ನಡ</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
