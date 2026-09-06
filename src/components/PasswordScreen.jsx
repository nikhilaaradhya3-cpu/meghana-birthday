import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import BackgroundFX from "./BackgroundFX";
import LanguageToggle from "./LanguageToggle";
import shared from "../data/shared";
import { useLanguage } from "../i18n/LanguageContext";

export default function PasswordScreen({ onUnlock }) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().toLowerCase() === shared.password.trim().toLowerCase()) {
      setError(false);
      setUnlocking(true);
      setTimeout(onUnlock, 1100);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2200);
    }
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, var(--blush) 0%, var(--lavender) 55%, var(--champagne) 100%)",
      }}
    >
      <BackgroundFX density={18} />

      <div className="absolute top-5 right-5 z-20">
        <LanguageToggle />
      </div>

      <AnimatePresence>
        {!unlocking && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-[28px] bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_-15px_rgba(138,90,114,0.35)] px-8 py-12 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--gold), var(--rose-deep))" }}
            >
              <Lock className="w-6 h-6 text-white" strokeWidth={1.75} />
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-2">
              {t.passwordScreen.title}
            </h1>
            <p className="text-[var(--ink-soft)] text-sm md:text-base mb-8 flex items-center justify-center gap-1.5">
              {t.passwordScreen.subtitleBefore}
              <span className="italic">{t.passwordScreen.subtitleItalic}</span>
              <Sparkles className="w-4 h-4" />
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.passwordScreen.placeholder}
                className="w-full text-center rounded-full border border-[var(--rose-deep)]/30 bg-white/80 px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 outline-none focus:ring-2 focus:ring-[var(--rose-deep)]/50 transition"
                autoFocus
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-[var(--plum)]"
                  >
                    {t.passwordScreen.error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full px-6 py-3.5 text-white font-medium tracking-wide shadow-[0_10px_30px_-8px_rgba(201,123,153,0.6)]"
                style={{ background: "linear-gradient(135deg, var(--rose-deep), var(--gold))" }}
              >
                {t.passwordScreen.button}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unlocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(252,231,243,0.95))" }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
