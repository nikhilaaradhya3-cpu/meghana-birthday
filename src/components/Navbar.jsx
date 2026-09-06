import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../i18n/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const links = t.nav.links;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-5 md:px-8 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between rounded-full bg-white/60 backdrop-blur-md border border-white/50 px-5 py-2.5 shadow-sm">
        <span className="font-display italic text-[var(--plum)] text-sm md:text-base">
          {t.nav.tagline}
        </span>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-wider text-[var(--ink-soft)] hover:text-[var(--rose-deep)] transition"
            >
              {l.label}
            </a>
          ))}
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            className="text-[var(--ink)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl bg-white/85 backdrop-blur-md border border-white/50 shadow-sm p-4 flex flex-col gap-3"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--ink-soft)] hover:text-[var(--rose-deep)] transition"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
