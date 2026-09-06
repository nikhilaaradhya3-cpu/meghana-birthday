import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import shared from "../data/shared";
import { useLanguage } from "../i18n/LanguageContext";

export default function MusicPlayer() {
  const { t } = useLanguage();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  if (!shared.musicEnabled) return null;

  const resolvedTrack =
    (typeof window !== "undefined" && window.__ASSET_MAP__ && window.__ASSET_MAP__[shared.musicTrack]) ||
    shared.musicTrack;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
      setStarted(true);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50">
      <audio ref={audioRef} src={resolvedTrack} loop />
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2.5 shadow-[0_10px_30px_-10px_rgba(138,90,114,0.5)] backdrop-blur-md border border-white/50"
        style={{ background: "rgba(255,255,255,0.85)" }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <motion.span
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: "linear" }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, var(--rose-deep), var(--gold))" }}
        >
          <Music2 className="w-4 h-4" />
        </motion.span>
        <span className="text-xs font-medium text-[var(--ink)] hidden sm:block">
          {t.musicPlayer.label}
        </span>
        {playing ? (
          <Pause className="w-4 h-4 text-[var(--ink)]" />
        ) : (
          <Play className="w-4 h-4 text-[var(--ink)]" />
        )}
      </motion.button>
      {!started && (
        <p className="text-[10px] text-[var(--ink-soft)] text-right mt-1.5 mr-1 max-w-[140px]">
          {t.musicPlayer.hint}
        </p>
      )}
    </div>
  );
}
