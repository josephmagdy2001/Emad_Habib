import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emadImage from '/assets/emad.png'; // تأكد من مسار المجلد لديك
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const emadImageRef = useRef<HTMLDivElement>(null);
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
      // Image parallax
      gsap.to(emadImageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text reveal
      gsap.from(".about-content > *", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        }
      });

      // Stats animation
      gsap.from(".stat-item", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = t('about.stats', { returnObjects: true }) as any[];

  return (
    <section id="about" ref={containerRef} className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side - Positioned on the left */}
          <div ref={emadImageRef} className="flex-1 relative w-full">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white">
              <img
                src={emadImage}
                alt="Founder"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-8 right-8 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-slate-100 hidden md:block transform hover:scale-110 transition-transform">
              <div className="text-5xl font-extrabold text-primary mb-1">15+</div>
              <div className="text-slate-600 font-bold uppercase tracking-tighter text-sm">{t('about.experience')}</div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 about-content">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {(t('about.values', { returnObjects: true }) as string[]).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary" size={24} />
                  <span className="text-lg font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 stats-container">
              {stats.map((stat, index) => (
                <div key={index} className="text-center stat-item">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scalloped Animated Divider / Mobile Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="hidden md:block overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-900"
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
