'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Camera, Mic, BookOpen, FileText, Sun, Cloud, Wind, Droplets, TrendingUp, AlertCircle, Sprout, ChevronRight, Bell, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { FARMING_TIPS, CROP_CATEGORIES } from '@/lib/constants';

const quickActions = [
  { href: '/chat', icon: MessageCircle, label: 'Ask AI', desc: 'Get instant advice', color: 'bg-green-500', emoji: '🤖' },
  { href: '/diagnosis', icon: Camera, label: 'Diagnose', desc: 'Upload crop photo', color: 'bg-blue-500', emoji: '📸' },
  { href: '/voice', icon: Mic, label: 'Voice', desc: 'Speak your query', color: 'bg-purple-500', emoji: '🎙️' },
  { href: '/schemes', icon: FileText, label: 'Schemes', desc: 'Govt benefits', color: 'bg-amber-500', emoji: '📋' },
];

const recentAlerts = [
  { type: 'warning', msg: 'Heavy rainfall expected in next 48 hours. Protect crops!', icon: '🌧️' },
  { type: 'info', msg: 'PM-KISAN 19th installment release expected this week.', icon: '💰' },
  { type: 'success', msg: 'Paddy MSP increased to ₹2,183/quintal for 2025-26.', icon: '📈' },
];

const marketPrices = [
  { crop: 'Wheat', price: '₹2,275', change: '+1.2%', up: true },
  { crop: 'Paddy', price: '₹2,183', change: '+0.8%', up: true },
  { crop: 'Maize', price: '₹1,935', change: '-0.3%', up: false },
  { crop: 'Soybean', price: '₹4,600', change: '+2.1%', up: true },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good Morning', emoji: '🌅' };
  if (h < 17) return { text: 'Good Afternoon', emoji: '☀️' };
  return { text: 'Good Evening', emoji: '🌙' };
}

export default function Dashboard() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [tipIndex, setTipIndex] = useState(0);
  const greeting = getGreeting();

  useEffect(() => {
    const iv = setInterval(() => setTipIndex(i => (i + 1) % FARMING_TIPS.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const tip = FARMING_TIPS[tipIndex];
  const tipText = language === 'hi' ? tip.hi : language === 'kn' ? tip.kn : tip.en;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Welcome Header */}
        <div className="bg-farm-gradient rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-40 h-40 opacity-10">
            <div className="text-9xl">🌾</div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-green-200 text-sm font-medium">
                {greeting.emoji} {greeting.text}
              </div>
              <Link href="/profile" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="text-white font-bold">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold">
              {t('welcomeBack')}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-green-100 text-sm mt-1">
              📍 {user?.village ? `${user.village}, ` : ''}{user?.district || 'Your Farm'} | {user?.state || 'India'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            ⚡ {t('quickActions')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map(({ href, label, desc, color, emoji }) => (
              <Link key={href} href={href}
                className="card-hover flex flex-col items-center text-center p-4 gap-3">
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                  {emoji}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Farming Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-amber-800 flex items-center gap-2">
                💡 {t('todaysTips')}
              </h3>
              <div className="flex gap-1">
                {FARMING_TIPS.map((_, i) => (
                  <button key={i} onClick={() => setTipIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === tipIndex ? 'bg-amber-600' : 'bg-amber-300'}`} />
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{tip.icon}</span>
              <p className="text-amber-900 text-sm leading-relaxed">{tipText}</p>
            </div>
            <Link href="/advisory" className="mt-3 text-amber-700 text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
              More tips <ArrowRight size={14} />
            </Link>
          </div>

          {/* Weather Widget */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              🌤️ Weather Advisory
            </h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-5xl">⛅</div>
              <div>
                <div className="text-3xl font-bold text-gray-900">28°C</div>
                <div className="text-gray-500 text-sm">Partly Cloudy</div>
                <div className="text-xs text-gray-400">{user?.district || 'Dharwad'}, {user?.state || 'Karnataka'}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Droplets size={16} />, val: '72%', label: 'Humidity' },
                { icon: <Wind size={16} />, val: '12 km/h', label: 'Wind' },
                { icon: <Sun size={16} />, val: '6.2 hrs', label: 'Sunshine' },
              ].map(({ icon, val, label }) => (
                <div key={label} className="bg-blue-50 rounded-xl p-2 text-center">
                  <div className="text-blue-600 flex justify-center mb-1">{icon}</div>
                  <div className="font-semibold text-sm text-gray-800">{val}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-orange-50 rounded-lg p-2 text-xs text-orange-700 flex items-center gap-2">
              <AlertCircle size={14} />
              <span>Heavy rains likely in 2 days. Harvest early!</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Bell size={18} className="text-amber-500" /> Farm Alerts
          </h2>
          <div className="space-y-2">
            {recentAlerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm
                ${alert.type === 'warning' ? 'bg-orange-50 border border-orange-100' :
                  alert.type === 'success' ? 'bg-green-50 border border-green-100' :
                    'bg-blue-50 border border-blue-100'}`}>
                <span className="text-lg mt-0.5">{alert.icon}</span>
                <p className={`${alert.type === 'warning' ? 'text-orange-800' :
                  alert.type === 'success' ? 'text-green-800' : 'text-blue-800'}`}>
                  {alert.msg}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Prices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" /> Market Prices (MSP)
            </h2>
            <span className="text-xs text-gray-400">₹ per quintal</span>
          </div>
          <div className="card">
            <div className="divide-y divide-gray-100">
              {marketPrices.map(({ crop, price, change, up }) => (
                <div key={crop} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Sprout size={16} className="text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">{crop}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{price}</div>
                    <div className={`text-xs font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
                      {up ? '↑' : '↓'} {change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crop Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Browse by Crop</h2>
            <Link href="/advisory" className="text-sm text-green-600 font-medium hover:underline flex items-center gap-1">
              All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {CROP_CATEGORIES.map(({ id, label, icon }) => (
              <Link key={id} href={`/chat?topic=${id}`}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-green-100 hover:border-green-300 hover:bg-green-50 transition-colors text-center">
                <span className="text-2xl">{icon}</span>
                <span className="text-xs text-gray-600 font-medium leading-tight">{label.split('&')[0].trim()}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Chats Placeholder */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle size={18} className="text-green-600" /> {t('recentQueries')}
            </h2>
            <Link href="/chat" className="text-sm text-green-600 font-medium hover:underline">
              {t('newChat')} →
            </Link>
          </div>
          <div className="card text-center py-8">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-gray-500 text-sm mb-3">{t('noHistory')}</p>
            <Link href="/chat" className="btn-primary inline-flex py-2.5 px-6">
              🤖 {t('startChat')}
            </Link>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
