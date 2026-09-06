import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";
import { useLanguage } from "../i18n/LanguageContext";

// First 12 photos, presented as a varied editorial masonry grid.
const showcasePhotos = photos.slice(0, 12);

// Card shape follows each photo's real orientation so nothing gets
// awkwardly cropped: portraits run tall, landscapes run wide, squares
// stay compact. A little alternating rotation keeps it feeling placed
// by hand rather than machine-generated.
const rotateCycle = [0, -1.5, 1.5, -1, 1, 0];

function spanFor(orientation) {
  if (orientation === "landscape") return "col-span-2 row-span-1";
  if (orientation === "square") return "row-span-1";
  return "row-span-2"; // portrait
}

export default function PhotoShowcase({ onOpen }) {
  const { t } = useLanguage();

  return (
    <section id="photos" className="relative w-full py-20 md:py-28 px-5 md:px-12 bg-[var(--cream)]">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-[var(--ink)] mb-3"
        >
          {t.showcase.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[var(--ink-soft)] text-base md:text-lg"
        >
          {t.showcase.subtitle}
        </motion.p>
      </div>

      <div className="hidden md:grid grid-cols-4 auto-rows-[160px] gap-4 max-w-6xl mx-auto">
        {showcasePhotos.map((photo, i) => {
          const span = spanFor(photo.orientation);
          const rotate = rotateCycle[i % rotateCycle.length];
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 5 }}
              style={{ rotate: `${rotate}deg` }}
              className={`relative rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(138,90,114,0.35)] cursor-pointer group ${span}`}
              onClick={() => onOpen(photos.indexOf(photo))}
            >
              <PhotoFrame src={photo.src} id={photo.id} alt={photo.caption} focus={photo.focus} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition duration-300 drop-shadow">
                {photo.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: clean vertical stack */}
      <div className="grid md:hidden grid-cols-1 gap-4 max-w-md mx-auto">
        {showcasePhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/5]"
            onClick={() => onOpen(photos.indexOf(photo))}
          >
            <PhotoFrame src={photo.src} id={photo.id} alt={photo.caption} focus={photo.focus} className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium drop-shadow">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
