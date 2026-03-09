import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// استيراد التنسيقات
import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  // 1. إدارة حالة البيانات
  const [testimonialsData, setTestimonialsData] = useState<any[]>([]);

  useEffect(() => {
    const items = t('testimonials.items', { returnObjects: true });
    if (Array.isArray(items)) {
      setTestimonialsData(items.slice(0, 6)); // تأكد من جلب كل الآراء المتاحة
    }
  }, [t, i18n.language]);

  // 2. تحريكات GSAP
  useLayoutEffect(() => {
    if (testimonialsData.length === 0) return;

    const ctx = gsap.context(() => {
      if (waveRef.current) {
        gsap.to(waveRef.current, {
          duration: 2,
          attr: { d: "M0,120 C60,120 60,20 120,20 C180,20 180,120 240,120 C300,120 300,20 360,20 C420,20 420,120 480,120 C540,120 540,20 600,20 C660,20 660,120 720,120 C780,120 780,20 840,20 C900,20 900,120 960,120 C1020,120 1020,20 1080,20 C1140,20 1140,120 1200,120 V120 H0 Z" },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      // تحريك العنوان والحاوية
      gsap.from(".testimonials-title", { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: ".testimonials-title", start: "top 90%" } });
      gsap.from(".testimonials-container", { scale: 0.9, opacity: 0, duration: 1.2, scrollTrigger: { trigger: ".testimonials-container", start: "top 85%" } });
    }, containerRef);

    return () => ctx.revert();
  }, [testimonialsData]);

  if (testimonialsData.length === 0) return null;

  return (
    <section ref={containerRef} className="py-32 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-32">
        <div className="text-center mb-24 testimonials-title">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('testimonials.title')}</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto testimonials-container">
          {/* إضافة key={testimonialsData.length} تجبر Swiper على إعادة التحميل فور جاهزية البيانات */}
          <Swiper
            key={`${i18n.language}-${testimonialsData.length}`}
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={50}
            loop={testimonialsData.length > 1}
            className="pb-24 testimonials-swiper"
          >
            {testimonialsData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center py-12">
                  <div className={`testimonial-card relative bg-white p-10 md:p-16 flex flex-col md:flex-row items-end md:items-center gap-8 w-full max-w-[700px] shadow-2xl ${isRtl ? 'rtl-card' : ''}`}>
                    
                    <span className="quote-box open absolute top-0 left-0 w-12 h-12 bg-[#000080] flex items-center justify-center text-white text-4xl font-serif">“</span>
                    <span className="quote-box close absolute bottom-0 right-0 w-12 h-12 bg-[#000080] flex items-center justify-center text-white text-4xl font-serif">”</span>

                    <div className="flex-1 z-10 text-right">
                      <p className="text-[#000080] font-bold text-xl md:text-2xl leading-tight mb-6 italic">
                        {item.quote}
                      </p>
                    </div>

                    <div className="w-full md:w-2/5 flex flex-col items-center md:items-end gap-6 relative z-10">
                      <div className="relative transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                        <div className="paperclip absolute -top-[15%] right-[30%] z-20 pointer-events-none" />
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&size=120`} 
                          alt={item.name}
                          className="border-[10px] border-white shadow-md w-24 h-24 md:w-32 md:h-32 object-cover"
                        />
                      </div>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <span className="block font-bold text-lg md:text-xl text-[#000080] before:content-['\2014'] before:mr-2">
                          {item.name}
                        </span>
                        <span className="block text-sm font-bold text-[#000080]/70 uppercase tracking-wider mt-1">
                          {item.role}
                        </span>
                      </div>
                    </div>

                    <div className="speech-tail absolute -bottom-20 left-20 w-0 h-0 border-t-[70px] border-t-[#000080] border-r-[100px] border-r-transparent z-10" />
                    <div className="outer-frame absolute -top-8 left-6 w-[85%] h-[120%] border-8 border-[#000080] rounded-[50px] -z-10" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .testimonial-card { font-family: 'Montserrat', sans-serif; }
        .rtl-card { direction: rtl; text-align: right; }
        .rtl-card .quote-box.open { left: auto; right: 0; }
        .rtl-card .quote-box.close { right: auto; left: 0; }
        .rtl-card .speech-tail { left: auto; right: 5em; transform: scaleX(-1); }
        .rtl-card .outer-frame { left: auto; right: 1.5em; }
        .rtl-card .text-right { text-align: right; }
        .testimonials-swiper .swiper-pagination-bullet-active { background: #000080 !important; width: 25px; border-radius: 5px; }
        .paperclip { border: 2px solid #222; border-right: none; height: 75px; width: 20px; border-radius: 25px; position: relative; }
        .paperclip::before { content: ""; position: absolute; top: -1px; right: 0; height: 10px; width: 16px; border: 2px solid #222; border-bottom: none; border-top-left-radius: 25px; border-top-right-radius: 25px; z-index: 99; }
        .paperclip::after { content: ""; position: absolute; bottom: -1px; right: 0; height: 40px; width: 16px; border: 2px solid #222; border-top: none; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px; z-index: 99; }
      ` }} />
    </section>
  );
}