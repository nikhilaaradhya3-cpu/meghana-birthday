import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export default function SpecialThings() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 md:py-28 px-6" style={{ background: "var(--lavender)" }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl md:text-5xl text-center text-[var(--ink)] mb-14"
      >
        {t.specialThings.title}
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {t.specialThings.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_10px_30px_-12px_rgba(138,90,114,0.3)] p-7 text-center"
          >
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h3 className="font-display text-xl text-[var(--plum)] mb-2">{item.title}</h3>
            <p className="text-[var(--ink-soft)] text-sm leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
