import { useEffect, useState } from "react";
import shared from "../data/shared";
import { useLanguage } from "../i18n/LanguageContext";

function getTimeLeft() {
  const target = new Date(`${shared.birthday}T00:00:00`);
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const { t } = useLanguage();
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-6 py-3 text-white font-display text-lg md:text-xl">
        {t.hero.todayLabel}
      </div>
    );
  }

  const units = [
    { label: t.hero.units.days, value: time.days },
    { label: t.hero.units.hours, value: time.hours },
    { label: t.hero.units.minutes, value: time.minutes },
    { label: t.hero.units.seconds, value: time.seconds },
  ];

  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <p className="text-white/75 text-xs md:text-sm tracking-[0.2em] uppercase">
        {t.hero.countdownLabel}
      </p>
      <div className="flex gap-3 md:gap-4">
        {units.map((u) => (
          <div
            key={u.label}
            className="w-16 md:w-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 py-2.5 text-center"
          >
            <div className="font-display text-xl md:text-2xl text-white tabular-nums">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-white/70">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
