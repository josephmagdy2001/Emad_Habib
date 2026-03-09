import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wave animation
      if (waveRef.current) {
        gsap.to(waveRef.current, {
          duration: 2,
          attr: { d: "M0,120 C60,120 60,20 120,20 C180,20 180,120 240,120 C300,120 300,20 360,20 C420,20 420,120 480,120 C540,120 540,20 600,20 C660,20 660,120 720,120 C780,120 780,20 840,20 C900,20 900,120 960,120 C1020,120 1020,20 1080,20 C1140,20 1140,120 1200,120 V120 H0 Z" },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Title animation
      gsap.from(".projects-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 90%",
        }
      });

      // Projects grid animation
      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projectImages = [
    'https://images.unsplash.com/photo-1682063631532-b865521538fa?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526593740665-f57a5d42dd0a?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1654643353343-27b4e11b10d6?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545186070-de624ed19875?q=80&w=2070&auto=format&fit=crop',
  ];

  const projects = t('projects.items', { returnObjects: true }) as any[];

  return (
    <section id="projects" ref={containerRef} className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10 pb-20">
        <div className="text-center mb-20 projects-title">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            {t('projects.subtitle')}
          </p>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/project/${project.id}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="project-card group relative bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl aspect-[16/10]"
              >
                <img
                  src={projectImages[index % projectImages.length]}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="px-4 py-1.5 bg-secondary text-white text-sm font-bold rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-lg line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {project.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="flex items-center gap-2 text-white font-bold hover:text-secondary transition-colors">
                      <ExternalLink size={20} />
                      {isRtl ? 'عرض التفاصيل' : 'View Details'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scalloped Animated Divider / Mobile Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="hidden md:block overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-50"
          >
            <path 
              ref={waveRef}
              d="M0,120 C60,120 60,0 120,0 C180,0 180,120 240,120 C300,120 300,0 360,0 C420,0 420,120 480,120 C540,120 540,0 600,0 C660,0 660,120 720,120 C780,120 780,0 840,0 C900,0 900,120 960,120 C1020,120 1020,0 1080,0 C1140,0 1140,120 1200,120 V120 H0 Z"
            ></path>
          </svg>
        </div>
        <div className="block md:hidden h-1 w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30" />
      </div>
    </section>
  );
}
