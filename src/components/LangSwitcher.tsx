import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium"
    >
      <Languages size={18} />
      <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
