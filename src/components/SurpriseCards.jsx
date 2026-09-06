import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

function FlipCard({ label, reveal, delay }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      className="relative h-44 [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center text-center px-4 shadow-[0_10px_28px_-10px_rgba(138,90,114,0.35)] [backface-visibility:hidden]"
          style={{ background: "linear-gradient(135deg, var(--rose-light), var(--lavender))" }}
        >
          <span className="font-display text-lg text-[var(--plum)]">{label}</span>
        </div>
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center text-center px-5 shadow-[0_10px_28px_-10px_rgba(138,90,114,0.35)] [transform:rotateY(180deg)] [backface-visibility:hidden] text-white"
          style={{ background: "linear-gradient(135deg, var(--rose-deep), var(--gold))" }}
        >
          <span className="font-display italic text-base md:text-lg">{reveal}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SurpriseCards() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-[var(--cream)]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl md:text-5xl text-center text-[var(--ink)] mb-3"
      >
        {t.surprise.title}
      </motion.h2>
      <p className="text-center text-[var(--ink-soft)] mb-12">{t.surprise.subtitle}</p>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {t.surprise.cards.map((card, i) => (
          <FlipCard key={card.label} label={card.label} reveal={card.reveal} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
