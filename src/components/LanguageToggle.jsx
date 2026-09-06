import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full bg-white/70 backdrop-blur-md border border-white/60 p-1 shadow-sm ${className}`}
    >
      {[
        { code: "en", label: "EN" },
        { code: "kn", label: "ಕನ್ನಡ" },
      ].map((opt) => {
        const active = lang === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLang(opt.code)}
            className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200"
            style={{
              color: active ? "white" : "var(--ink-soft)",
              background: active
                ? "linear-gradient(135deg, var(--rose-deep), var(--gold))"
                : "transparent",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
