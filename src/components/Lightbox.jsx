import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PhotoFrame from "./PhotoFrame";
import photos from "../data/photos";

export default function Lightbox({ index, onClose, onNavigate }) {
  const touchStartX = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        style={{ background: "rgba(30,20,26,0.92)" }}
        onClick={onClose}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta > 50) onNavigate(-1);
          if (delta < -50) onNavigate(1);
          touchStartX.current = null;
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-white/80 hover:text-white transition p-2"
        >
          <X className="w-7 h-7" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(-1);
          }}
          aria-label="Previous photo"
          className="absolute left-2 md:left-6 text-white/70 hover:text-white transition p-2"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="max-w-3xl w-full max-h-[80vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <PhotoFrame
            src={photo.src}
            id={photo.id}
            alt={photo.caption}
            className="max-h-[70vh] w-auto rounded-xl shadow-2xl"
            objectPosition="center"
          />
          <p className="text-white/80 font-display italic text-lg mt-4 text-center">
            {photo.caption}
          </p>
        </motion.div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(1);
          }}
          aria-label="Next photo"
          className="absolute right-2 md:right-6 text-white/70 hover:text-white transition p-2"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
