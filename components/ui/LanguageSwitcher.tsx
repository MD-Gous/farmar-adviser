'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  language: string;
  onChange: (lang: string) => void;
  compact?: boolean;
}

const languages = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌿' },
];

export default function LanguageSwitcher({ language, onChange, compact = false }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-green-200 bg-white hover:bg-green-50 transition-colors text-sm font-medium text-gray-700"
      >
        <Globe size={16} className="text-green-600" />
        <span>{current.flag}</span>
        {!compact && <span>{current.native}</span>}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { onChange(lang.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors
                  ${language === lang.code ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
              >
                <span>{lang.flag}</span>
                <div className="text-left">
                  <div className="font-medium">{lang.native}</div>
                  <div className="text-xs text-gray-400">{lang.label}</div>
                </div>
                {language === lang.code && (
                  <span className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
