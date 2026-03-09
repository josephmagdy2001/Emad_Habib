import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const waveRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // Floating balls animation
    const ctx = gsap.context(() => {
      gsap.to(".hero-ball", {
        y: "random(-100, 100)",
        x: "random(-50, 50)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1628158088791-89567a8e84ec?q=80&w=2070&auto=format&fit=crop',
      title: t('hero.slides.0.title'),
      description: t('hero.slides.0.description'),
    },
    {
      image: 'https://images.unsplash.com/photo-1554035042-34f354352d97?q=80&w=2070&auto=format&fit=crop',
      title: t('hero.slides.1.title'),
      description: t('hero.slides.1.description'),
    },
    {
      image: 'https://images.unsplash.com/photo-1654643353201-8123d31163db?q=80&w=2070&auto=format&fit=crop',
      title: t('hero.slides.2.title'),
      description: t('hero.slides.2.description'),
    },
  ];

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Background Animated Balls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="hero-ball absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="hero-ball absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="hero-ball absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-referrer"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 text-slate-200">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#services"
                      className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-all flex items-center gap-2 group"
                    >
                      {t('hero.cta')}
                      {isRtl ? (
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      )}
                    </a>
                    <a
                      href="#contact"
                      className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg transition-all"
                    >
                      {t('nav.contact')}
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scalloped Animated Divider / Mobile Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="hidden md:block overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[80px] fill-white"
          >
            <path 
              ref={waveRef}
              d="M0,120 C60,120 60,0 120,0 C180,0 180,120 240,120 C300,120 300,0 360,0 C420,0 420,120 480,120 C540,120 540,0 600,0 C660,0 660,120 720,120 C780,120 780,0 840,0 C900,0 900,120 960,120 C1020,120 1020,0 1080,0 C1140,0 1140,120 1200,120 V120 H0 Z"
            ></path>
          </svg>
        </div>
        <div className="block md:hidden h-1 w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
      </div>
    </section>
  );
}
