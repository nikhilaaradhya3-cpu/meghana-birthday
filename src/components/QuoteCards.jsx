import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";
import { useLanguage } from "../i18n/LanguageContext";

const quotePhotos = photos.slice(17, 22);

export default function QuoteCards() {
  const { t } = useLanguage();
  const quotes = t.quoteCards.quotes;

  return (
    <section className="w-full py-20 md:py-28 px-5 md:px-12 bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible snap-x snap-mandatory">
        {quotePhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative min-w-[220px] md:min-w-0 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_12px_30px_-12px_rgba(138,90,114,0.35)] snap-center"
          >
            <PhotoFrame src={photo.src} id={photo.id} alt={quotes[i]} focus={photo.focus} className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-white font-display italic text-lg">
              "{quotes[i]}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
