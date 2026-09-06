import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundFX from "./BackgroundFX";
import { useLanguage } from "../i18n/LanguageContext";

export default function WelcomeSection({ onContinue }) {
  const { t } = useLanguage();
  const [lineIndex, setLineIndex] = useState(0);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const lines = t.welcome.lines;

  useEffect(() => {
    setLineIndex(0);
    setShowHeadline(false);
    setShowCta(false);
  }, [t]);

  useEffect(() => {
    if (lineIndex < lines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 1500);
      return () => clearTimeout(t);
    } else {
      const t1 = setTimeout(() => setShowHeadline(true), 400);
      const t2 = setTimeout(() => setShowCta(true), 1800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [lineIndex, lines.length]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--blush) 100%)" }}
    >
      <BackgroundFX density={12} />

      <div className="relative z-10 max-w-xl">
        <AnimatePresence mode="wait">
          {lineIndex < lines.length && (
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-2xl md:text-4xl text-[var(--ink)]"
            >
              {lines[lineIndex]}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHeadline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <h1 className="font-display text-5xl md:text-7xl text-[var(--plum)] mb-4">
                {t.welcome.headline}
              </h1>
              <p className="text-[var(--ink-soft)] text-base md:text-lg mb-10">
                {t.welcome.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCta && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
              className="relative rounded-full px-9 py-4 text-white font-medium text-lg tracking-wide shadow-[0_16px_40px_-10px_rgba(201,123,153,0.65)]"
              style={{ background: "linear-gradient(135deg, var(--rose-deep), var(--gold))" }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: ["0 0 0 0 rgba(201,123,153,0.5)", "0 0 0 14px rgba(201,123,153,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="relative">{t.welcome.cta}</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
