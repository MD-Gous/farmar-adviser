'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { User, Phone, MapPin, Globe, Bell, Shield, LogOut, ChevronRight, Save, Edit3, X } from 'lucide-react';
import toast from 'react-hot-toast';

const languages = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌿' },
];

const states = ['Andhra Pradesh', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    village: user?.village || '',
    district: user?.district || '',
    state: user?.state || '',
  });

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-3xl font-bold text-white">{initials}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-xs">🌾</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
          {user.village && (
            <div className="flex items-center justify-center gap-1 mt-1 text-sm text-green-700">
              <MapPin size={14} />
              <span>{user.village}{user.district ? `, ${user.district}` : ''}</span>
            </div>
          )}
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden mb-4">
          <div className="flex items-center justify-between px-5 py-4 border-b border-green-50">
            <h2 className="font-bold text-gray-900">Personal Information</h2>
            <button
              onClick={() => setEditing(!editing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                editing ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {editing ? <><X size={14} /> Cancel</> : <><Edit3 size={14} /> Edit</>}
            </button>
          </div>

          <div className="p-5 space-y-4">
            {editing ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Village</label>
                    <input
                      value={form.village}
                      onChange={e => setForm({...form, village: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">District</label>
                    <input
                      value={form.district}
                      onChange={e => setForm({...form, district: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">State</label>
                  <select
                    value={form.state}
                    onChange={e => setForm({...form, state: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none text-sm bg-white"
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  <Save size={16} /> Save Changes
                </button>
              </>
            ) : (
              <>
                {[
                  { icon: User, label: 'Name', value: user.name },
                  { icon: Phone, label: 'Phone', value: user.phone || 'Not set' },
                  { icon: MapPin, label: 'Village', value: user.village || 'Not set' },
                  { icon: MapPin, label: 'District', value: user.district || 'Not set' },
                  { icon: MapPin, label: 'State', value: user.state || 'Not set' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{label}</div>
                      <div className={`text-sm font-medium ${value === 'Not set' ? 'text-gray-400 italic' : 'text-gray-900'}`}>{value}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 mb-4">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={18} className="text-green-600" /> Language Preference
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => { changeLanguage(lang.code); toast.success(`Language changed to ${lang.label}`); }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  language === lang.code
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-xs font-semibold">{lang.native}</span>
                {language === lang.code && <div className="w-2 h-2 bg-green-500 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden mb-4">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Manage alerts and reminders', href: '/dashboard' },
            { icon: Shield, label: 'Privacy & Security', desc: 'Account security settings', href: '/dashboard' },
          ].map(({ icon: Icon, label, desc, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-4 px-5 py-4 border-b border-green-50 last:border-none hover:bg-green-50 transition-colors"
            >
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                <Icon size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </a>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border-2 border-red-200 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} /> {t('logout')}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Farmers Adviser v1.0 · Digital Krishi Officer
        </p>
      </div>
    </AppLayout>
  );
}
