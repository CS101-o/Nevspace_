import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  //{ code: 'ar', name: 'Arabic', flag: '🇦🇪' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    if (lng === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
    
    closeDropdown();
  };

  // Get current language details
  const currentLanguage = languages.find(
    lang => lang.code === i18n.language
  ) || languages[0];

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white text-opacity-90 hover:text-opacity-100 
                 transition-colors duration-300 px-3 py-2 rounded-full 
                 bg-white/10 hover:bg-white/20"
        aria-label="Change language"
      >
        <Globe size={16} />
        <span className="text-sm mr-1">{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0"
            onClick={closeDropdown}
          />
          <div className={`absolute mt-2 w-48 bg-[rgb(0,1,45)]/95 backdrop-blur-sm 
                         border border-white/10 rounded-md shadow-lg py-1 z-10
                         ${i18n.language === 'ar' ? 'left-0' : 'right-0'}`}>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  i18n.language === language.code
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                } ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <span className="mr-2">{language.flag}</span>
                {language.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;