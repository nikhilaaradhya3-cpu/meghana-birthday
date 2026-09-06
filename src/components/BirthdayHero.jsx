import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import Countdown from "./Countdown";
import photos from "../data/photos";
import shared from "../data/shared";
import { useLanguage } from "../i18n/LanguageContext";

export default function BirthdayHero() {
  const { t } = useLanguage();
  const hero = photos[0];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <PhotoFrame
          src={hero.src}
          id={hero.id}
          alt={`${shared.name} — birthday hero photo`}
          loading="eager"
          focus={hero.focus}
          className="w-full h-full"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(58,46,53,0.05) 0%, rgba(58,46,53,0.15) 55%, rgba(45,30,38,0.75) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-20 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl md:text-7xl text-white mb-3 drop-shadow-sm"
        >
          {t.hero.greetingPrefix} {shared.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-white/85 text-base md:text-xl max-w-xl mx-auto md:mx-0"
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="text-white/70 text-sm md:text-base italic mt-1 max-w-xl mx-auto md:mx-0"
        >
          {t.hero.subtitle2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 flex justify-center md:justify-start"
        >
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
}
