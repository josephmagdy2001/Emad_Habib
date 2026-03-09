import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Tag } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function ProjectDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';

  const projects = t('projects.items', { returnObjects: true }) as any[];
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) return null;

  const projectImages: Record<string, string> = {
    'land-surveying': 'https://images.unsplash.com/photo-1607134541550-2994abb8077b?q=80&w=2070&auto=format&fit=crop',
    'road-infrastructure': 'https://images.unsplash.com/photo-1607134541790-fbc00985b88e?q=80&w=2070&auto=format&fit=crop',
    'urban-planning': 'https://images.unsplash.com/photo-1667207591027-d4b9f03406ca?q=80&w=2070&auto=format&fit=crop',
    'coastal-boundary': 'https://images.unsplash.com/photo-1667207591431-0366faabde1a?q=80&w=2070&auto=format&fit=crop',
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src={projectImages[project.id] || projectImages['land-surveying']}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-secondary font-bold mb-6 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
                {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-secondary" />
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-secondary" />
                  <span>{isRtl ? 'البحر الأحمر، مصر' : 'Red Sea, Egypt'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-secondary" />
                  <span>2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full"
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                  <img
                    src={projectImages[project.id] || projectImages['land-surveying']}
                    alt={project.title}
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </motion.div>

              {/* Details Side */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                  {isRtl ? 'نظرة عامة على المشروع' : 'Project Overview'}
                </h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="space-y-6">
                  {project.details.map((detail: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-secondary transition-colors group"
                    >
                      <div className="mt-1">
                        <CheckCircle2 className="text-secondary group-hover:scale-110 transition-transform" size={28} />
                      </div>
                      <p className="text-lg font-semibold text-slate-700 leading-snug">
                        {detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
