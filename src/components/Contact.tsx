import React, { useRef, useEffect, useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { FaWhatsapp, FaEnvelope, FaFacebook, FaPaperPlane } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const { t } = useTranslation();
    const form = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState("idle"); // idle, sending, success, error

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Contact items animation
            gsap.from(".contact-item", {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-info",
                    start: "top 80%",
                }
            });

            // Form animation
            gsap.from(".contact-form", {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-form",
                    start: "top 80%",
                }
            });

            // Title animation
            gsap.from(".contact-title", {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".contact-title",
                    start: "top 90%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        if (!form.current) return;
        
        setStatus("sending");

        emailjs.sendForm(
            "service_7j5aynj", 
            "template_xcgysm9", 
            form.current, 
            "CC9QNsBNn3LM1uDw4"
        )
        .then(() => {
            setStatus("success");
            form.current?.reset();
            setTimeout(() => setStatus("idle"), 3000);
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        });
    };

    return (
        <section id="contact" ref={containerRef} className="py-20 bg-white text-gray-900 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                
                {/* الرأس - Header */}
                <div className="text-center mb-16 contact-title">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('contact.title')}</h2>
                    <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* الجانب الأيسر: معلومات التواصل */}
                    <div className="space-y-8 contact-info">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">{t('contact.info_title')}</h3>
                            <p className="text-gray-600">{t('contact.subtitle')}</p>
                        </div>

                        <div className="space-y-4">
                            <ContactItem 
                                icon={<FaEnvelope color="#2563eb" />} 
                                title={t('contact.email')} 
                                content="emadhabeb02@gmail.com" 
                                link="mailto:emadhabeb02@gmail.com"
                            />
                            <ContactItem 
                                icon={<FaEnvelope color="#2563eb" />} 
                                title={t('contact.email')} 
                                content="geo.redsea@yahoo.com" 
                                link="mailto:geo.redsea@yahoo.com"
                            />
                            <ContactItem 
                                icon={<FaWhatsapp color="#22c55e" />} 
                                title="WhatsApp / Phone" 
                                content="01228414356" 
                                link="https://wa.me/+201228414356"
                            />
                            <ContactItem 
                                icon={<FaFacebook color="#1877f2" />} 
                                title="Facebook" 
                                content="Emad Habeb Rezkalla" 
                                link="https://www.facebook.com/emadhabebRezkalla"
                            />
                        </div>
                    </div>

                    {/* الجانب الأيمن: نموذج المراسلة */}
                    <div className="contact-form bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder={t('contact.name')}
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 outline-none focus:border-blue-500 transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder={t('contact.email')}
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 outline-none focus:border-blue-500 transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder={t('contact.message')}
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                                    status === "sending" ? "bg-gray-400 cursor-not-allowed" : 
                                    status === "success" ? "bg-green-500 text-white" : 
                                    status === "error" ? "bg-red-500 text-white" : 
                                    "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                                }`}
                            >
                                {status === "sending" && t('contact.sending')}
                                {status === "success" && t('contact.success')}
                                {status === "error" && t('contact.error')}
                                {status === "idle" && (
                                    <>
                                        {t('contact.send')} <FaPaperPlane size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

// مكون صغير لعرض معلومات التواصل
interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    link: string;
}

function ContactItem({ icon, title, content, link }: ContactItemProps) {
    return (
        <a href={link} target="_blank" rel="noreferrer" className="contact-item flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</h4>
                <p className="text-gray-800 font-medium">{content}</p>
            </div>
        </a>
    );
}
