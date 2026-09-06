import { createContext, useContext, useState } from "react";
import content from "./content";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("birthday-site-lang") || "en";
    } catch {
      return "en";
    }
  });

  function changeLang(next) {
    setLang(next);
    try {
      localStorage.setItem("birthday-site-lang", next);
    } catch {
      // ignore (e.g. private browsing)
    }
  }

  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
