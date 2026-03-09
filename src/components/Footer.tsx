import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="text-xl font-bold">{t('company_name')}</span>
          </div>
          
          <div className="text-slate-400 text-sm text-center md:text-right">
            <div>{t('footer.rights')}</div>
            <div className="mt-2 text-slate-300 font-medium">{t('footer.supervision')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
