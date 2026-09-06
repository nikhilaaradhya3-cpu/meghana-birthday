import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundFX from "./BackgroundFX";
import { useLanguage } from "../i18n/LanguageContext";

export default function BirthdayLetter() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <section
      id="letter"
      className="relative w-full py-24 md:py-32 px-6 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--champagne), var(--rose-light))" }}
    >
      <BackgroundFX density={10} />

      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-8">
                {t.letter.eyebrow}
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="rounded-full px-8 py-3.5 text-white font-medium tracking-wide shadow-[0_14px_35px_-10px_rgba(201,123,153,0.6)]"
                style={{ background: "linear-gradient(135deg, var(--rose-deep), var(--gold))" }}
              >
                {t.letter.openButton}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-[24px] bg-white/85 backdrop-blur-lg border border-white/70 shadow-[0_25px_60px_-20px_rgba(138,90,114,0.4)] p-8 md:p-12"
            >
              <p className="font-display text-xl md:text-2xl text-[var(--plum)] mb-5">
                {t.letter.salutation}
              </p>
              <div className="text-[var(--ink-soft)] text-base md:text-lg leading-relaxed whitespace-pre-line mb-6">
                {t.letter.message}
              </div>
              <p className="font-display italic text-lg text-[var(--ink)]">{t.letter.signoff}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
