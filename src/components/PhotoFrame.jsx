import { useState } from "react";

// Rotates through a small set of soft gradient combinations so
// placeholders feel varied rather than repetitive, until real
// photos are dropped into /public/images/.
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #FCE7F3 0%, #F5E9FF 100%)",
  "linear-gradient(135deg, #FFF8E7 0%, #FCE7F3 100%)",
  "linear-gradient(135deg, #F5E9FF 0%, #FFF5F8 100%)",
  "linear-gradient(135deg, #FFEFF6 0%, #F3E8FF 100%)",
];

export default function PhotoFrame({
  src,
  alt = "Birthday memory",
  id = "00",
  className = "",
  loading = "lazy",
  onClick,
  // Face-aware crop anchor, e.g. { x: 52.4, y: 38.6 } — from photos.js.
  // Falls back to a slight upward bias, which suits most portrait shots.
  focus,
  objectPosition,
}) {
  const [failed, setFailed] = useState(false);
  const idx = parseInt(id, 10) || 0;
  const gradient = PLACEHOLDER_GRADIENTS[idx % PLACEHOLDER_GRADIENTS.length];
  const resolvedPosition =
    objectPosition || (focus ? `${focus.x}% ${focus.y}%` : "center 25%");

  // When embedded as a self-contained bundle (e.g. inside Streamlit),
  // window.__ASSET_MAP__ maps a path like "/images/photo01.webp" to an
  // inlined base64 data URI. Falls through to the plain path everywhere
  // else (npm run dev, Vercel/Netlify/GitHub Pages).
  const resolvedSrc =
    (typeof window !== "undefined" && window.__ASSET_MAP__ && window.__ASSET_MAP__[src]) || src;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center select-none ${className}`}
        style={{ background: gradient }}
        onClick={onClick}
        role={onClick ? "button" : undefined}
      >
        <div className="text-center px-4">
          <div
            className="font-display italic text-[var(--plum)] opacity-60"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.8rem)" }}
          >
            photo{id}.webp
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--plum)] opacity-40 mt-1">
            add photo
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      onClick={onClick}
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: "cover", objectPosition: resolvedPosition }}
    />
  );
}
