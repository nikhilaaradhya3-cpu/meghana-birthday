import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";
import { useLanguage } from "../i18n/LanguageContext";

export default function CinematicSection() {
  const { t } = useLanguage();
  const photo = photos[12];

  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.12 }}
        viewport={{ once: true }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <PhotoFrame src={photo.src} id={photo.id} alt={photo.caption} focus={photo.focus} className="w-full h-full" />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(30,20,26,0.35), rgba(30,20,26,0.55))" }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display italic text-2xl md:text-4xl text-white mb-2"
        >
          {t.cinematic.line1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-display italic text-2xl md:text-4xl text-white"
        >
          {t.cinematic.line2}
        </motion.p>
      </div>
    </section>
  );
}
