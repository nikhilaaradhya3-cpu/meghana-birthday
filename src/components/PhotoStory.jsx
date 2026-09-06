import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";
import { useLanguage } from "../i18n/LanguageContext";

const storyPhotos = photos.slice(13, 17);

export default function PhotoStory() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-[var(--blush)]">
      <div className="max-w-3xl mx-auto space-y-16 md:space-y-24">
        {storyPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}
          >
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-[0_15px_40px_-15px_rgba(138,90,114,0.4)] aspect-[4/5]">
              <PhotoFrame src={photo.src} id={photo.id} alt={photo.caption} focus={photo.focus} className="w-full h-full" />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="font-display text-2xl md:text-3xl text-[var(--plum)] italic">
                {t.photoStory.messages[i] || photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
