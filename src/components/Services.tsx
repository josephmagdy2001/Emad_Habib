import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Grid, MapPin, Layers, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
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

      // Background elements animation
      gsap.to(".services-bg-blob", {
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1
      });

      // Cards staggered animation
      gsap.fromTo(".service-card", 
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Refresh ScrollTrigger after a short delay to ensure layout is ready
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // Title animation
      gsap.from(".services-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const icons = [
    <Map className="text-secondary" size={40} />,
    <Grid className="text-secondary" size={40} />,
    <MapPin className="text-secondary" size={40} />,
    <Layers className="text-secondary" size={40} />,
    <GraduationCap className="text-secondary" size={40} />,
  ];

  const services = t('services.items', { returnObjects: true }) as any[];

  return (
    <section id="services" ref={containerRef} className="relative py-24 bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="services-bg-blob absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="services-bg-blob absolute bottom-0 left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-20">
        <div className="text-center mb-20 services-title">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
            >
              <div className="mb-8 p-5 bg-slate-50 rounded-2xl inline-block group-hover:bg-secondary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                {icons[index % icons.length]}
              </div>
              <h3 className="text-2xl font-bold mb-5 text-primary group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>
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
              d="M0,120 C60,120 60,0 120,0 C180,0 180,120 240,120 C300,120 300,0 360,0 C420,0 420,120 480,120 C540,120 540,0 600,0 C660,0 660,120 720,120 C780,120 780,0 840,0 C900,0 900,120 960,120 C1020,120 1020,0 1080,20 C1140,20 1140,120 1200,120 V120 H0 Z"
            ></path>
          </svg>
        </div>
        <div className="block md:hidden h-1 w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30" />
      </div>
    </section>
  );
}
