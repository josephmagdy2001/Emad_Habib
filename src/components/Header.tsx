import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LangSwitcher from './LangSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: t('nav.home'), href: isHomePage ? '#' : '/' },
    { name: t('nav.services'), href: isHomePage ? '#services' : '/#services' },
    { name: t('nav.projects'), href: isHomePage ? '#projects' : '/#projects' },
    { name: t('nav.about'), href: isHomePage ? '#about' : '/#about' },
    { name: t('nav.careers'), href: isHomePage ? '#careers' : '/#careers' },
    { name: t('nav.contact'), href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white py-3 shadow-md border-b border-slate-100`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* الشعار - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
            G
          </div>
          <span className="text-xl font-bold text-primary truncate max-w-[150px] md:max-w-none">
            {t('company_name')}
          </span>
        </Link>

        {/* الروابط وأدوات التحكم */}
        <div className="flex items-center gap-2 md:gap-8">
          
          {/* زر اللغة - يظهر الآن في الموبايل والديسكتوب */}
          <div className="flex items-center">
            <LangSwitcher />
          </div>

          {/* روابط الديسكتوب فقط */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium transition-colors hover:text-secondary text-slate-700 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* زر القائمة للموبايل فقط */}
          <button
            className="md:hidden text-primary p-2 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة للموبايل (بدون زر اللغة لأننا نقلناه للأعلى) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold text-slate-700 hover:text-primary transition-colors py-2 border-b border-slate-50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}