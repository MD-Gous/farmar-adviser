'use client';

import { useState, useEffect, useCallback } from 'react';
import { t, TranslationKey } from '@/lib/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && ['en', 'hi', 'kn'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = useCallback((lang: string) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  }, []);

  const translate = useCallback(
    (key: TranslationKey) => t(key, language),
    [language]
  );

  return { language, changeLanguage, t: translate };
};
