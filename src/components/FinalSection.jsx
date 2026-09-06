import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Celebration from "./Celebration";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";
import shared from "../data/shared";
import { useLanguage } from "../i18n/LanguageContext";

const collagePhotos = [photos[2], photos[8], photos[15], photos[20], photos[24]];

export default function FinalSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setCelebrate(true), 900);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      id="surprise"
      className="relative w-full py-24 md:py-32 px-6 overflow-hidden text-center"
      style={{ background: "linear-gradient(180deg, #2D1E26 0%, #3A2438 60%, #4A2A3E 100%)" }}
    >
      <Celebration active={celebrate} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden ring-4 ring-[var(--gold)]/60 shadow-[0_0_60px_-5px_rgba(201,169,110,0.5)] mb-8"
        >
          <PhotoFrame src={photos[3].src} id={photos[3].id} alt={shared.name} focus={photos[3].focus} className="w-full h-full" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-6xl text-white mb-1"
        >
          {t.final.headline}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-3xl md:text-4xl mb-6"
          style={{ color: "var(--gold)" }}
        >
          {shared.name} ❤️
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-white/80 text-base md:text-lg leading-relaxed mb-4"
        >
          {t.final.body}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white font-display italic text-xl md:text-2xl"
        >
          {t.final.message}
        </motion.p>
      </div>

      {/* final animated photo collage */}
      <div className="relative z-10 max-w-3xl mx-auto mt-16 flex flex-wrap justify-center items-end gap-4">
        {collagePhotos.map((photo, i) => {
          const isLast = i === collagePhotos.length - 1;
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.35 }}
              className={`rounded-xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] ${
                isLast ? "w-40 h-52 md:w-56 md:h-72" : "w-24 h-32 md:w-32 md:h-40"
              }`}
            >
              <PhotoFrame src={photo.src} id={photo.id} alt={photo.caption} focus={photo.focus} className="w-full h-full" />
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: collagePhotos.length * 0.35 + 0.3 }}
        className="relative z-10 font-display italic text-2xl text-white/90 mt-10"
      >
        {t.final.closing}
      </motion.p>
    </section>
  );
}
