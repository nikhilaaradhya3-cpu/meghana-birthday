import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";
import { useLanguage } from "../i18n/LanguageContext";

const wallPhotos = photos.slice(22, 25);
const rotations = [-4, 3, -2];

export default function MemoryWall() {
  const { t } = useLanguage();

  return (
    <section id="memories" className="w-full py-20 md:py-28 px-6" style={{ background: "var(--rose-light)" }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl md:text-5xl text-center text-[var(--ink)] mb-14"
      >
        {t.memoryWall.title}
      </motion.h2>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-10">
        {wallPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            className="bg-white p-3 pb-8 shadow-[0_15px_35px_-12px_rgba(138,90,114,0.4)] w-56"
          >
            <div className="aspect-square overflow-hidden">
              <PhotoFrame src={photo.src} id={photo.id} alt={photo.caption} focus={photo.focus} className="w-full h-full" />
            </div>
            <p className="font-display italic text-center text-sm text-[var(--ink-soft)] mt-3">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
