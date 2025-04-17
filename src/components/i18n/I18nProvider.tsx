'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly
// Note: In a larger application, you might want to load these dynamically
import enCommon from '../../../public/locales/en/common.json';
import trCommon from '../../../public/locales/tr/common.json';
import arCommon from '../../../public/locales/ar/common.json';
import enContact from '../../../public/locales/en/contact.json';
import trContact from '../../../public/locales/tr/contact.json';
import arContact from '../../../public/locales/ar/contact.json';
import enAdvisors from '../../../public/locales/en/advisors.json';
import trAdvisors from '../../../public/locales/tr/advisors.json';
import arAdvisors from '../../../public/locales/ar/advisors.json';
import enTeams from '../../../public/locales/en/team.json'
import trTeams from '../../../public/locales/tr/team.json'
import arTeams from '../../../public/locales/ar/team.json'




// Initialize i18n instance
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        common: enCommon, 
        contact: enContact,
        advisors: enAdvisors,
        teams: enTeams
      },
      tr: { 
        common: trCommon, 
        contact: trContact,
        advisors: trAdvisors,
        teams: trTeams
      },
      ar: { 
        common: arCommon, 
        contact: arContact,
        advisors: arAdvisors,
        teams: arTeams
      }
    },
    fallbackLng: 'tr',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Create context to hold language state
interface I18nContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextProps>({
  language: 'tr',
  setLanguage: () => {},
  dir: 'ltr'
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(i18n.language || 'tr');
  const [dir, setDir] = useState<'ltr' | 'rtl'>(i18n.language === 'ar' ? 'rtl' : 'ltr');

  // Update language and handle RTL
  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    setDir(direction);
    
    // Update HTML attributes dynamically
    if (typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = lang;
      
      if (lang === 'ar') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  };

  // Set initial direction on mount
  useEffect(() => {
    setLanguage(i18n.language || 'tr');
    
    // Listen for language changes from i18next
    const handleLanguageChanged = (lang: string) => {
      setLanguageState(lang);
      setDir(lang === 'ar' ? 'rtl' : 'ltr');
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use translation context in client components
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Wrapper for useTranslation hook
export function useTranslation(namespace = 'common') {
  const { t, i18n } = useTranslationOrg(namespace);
  return { t, i18n };
}
