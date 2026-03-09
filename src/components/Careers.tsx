import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, Upload, Send, CheckCircle } from "lucide-react";

export default function Careers() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // محاكاة عملية إرسال (تأخير بسيط لمدة ثانية لإعطاء تجربة مستخدم واقعية)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // إظهار رسالة النجاح فوراً
      setIsSubmitted(true);

      // إعادة تصفير الفورم بعد 5 ثوانٍ إذا أردت إتاحته مرة أخرى
      setTimeout(() => {
        setIsSubmitted(false);
        setFileName(null);
        setFile(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(isRtl ? "حدث خطأ ما." : "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const specialties = [
    {
      value: "land_surveyor",
      label: t("careers.form.specialties.land_surveyor"),
    },
    {
      value: "gis_specialist",
      label: t("careers.form.specialties.gis_specialist"),
    },
    {
      value: "cad_engineer",
      label: t("careers.form.specialties.cad_engineer"),
    },
    {
      value: "total_station_operator",
      label: t("careers.form.specialties.total_station_operator"),
    },
    {
      value: "assistant_surveyor",
      label: t("careers.form.specialties.assistant_surveyor"),
    },
  ];

  return (
    <section
      id="careers"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full mb-4"
          >
            <Briefcase size={20} />
            <span className="font-bold uppercase tracking-wider text-sm">
              {t("nav.careers")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-primary mb-6"
          >
            {t("careers.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            {t("careers.subtitle")}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {t("careers.form.success")}
                </h3>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-center font-medium border border-red-100">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {t("careers.form.name")}
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {t("careers.form.email")}
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {t("careers.form.phone")}
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      {t("careers.form.specialty")}
                    </label>
                    <select
                      required
                      name="specialty"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all appearance-none"
                    >
                      <option value="">
                        {isRtl ? "-- اختر التخصص --" : "-- Select Specialty --"}
                      </option>
                      {specialties.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t("careers.form.cv")}
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full px-6 py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-secondary transition-colors">
                      <Upload className="text-slate-400" size={32} />
                      <span className="text-slate-500 font-medium">
                        {fileName ||
                          (isRtl
                            ? "اضغط هنا لرفع الملف"
                            : "Click here to upload file")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    {t("careers.form.message")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 text-lg ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {isLoading
                    ? isRtl
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : t("careers.form.submit")}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
