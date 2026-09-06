// ============================================================
//  PHOTO DATA
//  Each entry's `src` points to /public/images/photoNN.webp.
//  `orientation` drives masonry/collage sizing.
//  `focus` is the crop anchor point (percentage x/y) so square and
//  circular crops stay centered on her face instead of cutting it
//  off — computed automatically, safe to nudge by hand if a specific
//  photo ever looks off.
//  Edit `caption` freely — keep it short, warm, and specific.
// ============================================================

const orientations = {
  "01": "portrait", "02": "portrait", "03": "portrait", "04": "portrait",
  "05": "portrait", "06": "portrait", "07": "portrait", "08": "landscape",
  "09": "portrait", "10": "portrait", "11": "portrait", "12": "square",
  "13": "portrait", "14": "portrait", "15": "portrait", "16": "square",
  "17": "portrait", "18": "portrait", "19": "portrait", "20": "portrait",
  "21": "portrait", "22": "portrait", "23": "portrait", "24": "portrait",
  "25": "portrait",
};

const focusPoints = {
  "01": { x: 52.4, y: 38.6 }, "02": { x: 50.5, y: 26.9 },
  "03": { x: 51.7, y: 33.3 }, "04": { x: 53.7, y: 20.0 },
  "05": { x: 50, y: 25 },     "06": { x: 59.8, y: 25.2 },
  "07": { x: 50, y: 25 },     "08": { x: 50, y: 25 },
  "09": { x: 52.4, y: 25.5 }, "10": { x: 47.8, y: 52 },
  "11": { x: 50.5, y: 40.9 }, "12": { x: 55.8, y: 42.3 },
  "13": { x: 45, y: 52 },     "14": { x: 57.2, y: 26.3 },
  "15": { x: 50, y: 25 },     "16": { x: 52.9, y: 27.4 },
  "17": { x: 49.4, y: 20.5 }, "18": { x: 46.5, y: 45.4 },
  "19": { x: 50, y: 25 },     "20": { x: 58.9, y: 38.9 },
  "21": { x: 67.8, y: 40.9 }, "22": { x: 50, y: 25 },
  "23": { x: 35, y: 45 },     "24": { x: 64.6, y: 31.3 },
  "25": { x: 58.8, y: 43.3 },
};

const starterCaptions = [
  "That smile deserves its own celebration.",
  "Golden hour looked good on you.",
  "A little confidence, a little chaos.",
  "Caught mid-laugh, exactly as she is.",
  "This one's a favorite.",
  "Some pictures simply speak for themselves.",
  "Effortless, as always.",
  "The kind of moment worth keeping.",
  "Unapologetically herself.",
  "A quiet kind of beautiful.",
  "Just look at that energy.",
  "One for the memory wall.",
  "Simple. Radiant. Her.",
  "Worth a second look.",
  "This is her, unfiltered.",
  "A moment that deserved a photo.",
  "The smile that started it all.",
  "Pure, easy happiness.",
  "One of the good ones.",
  "Timeless, honestly.",
  "That's the look.",
  "Captured at just the right second.",
  "Her, in her element.",
  "Still smiling about this one.",
  "Saved the best for last.",
];

const photos = Array.from({ length: 25 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: n,
    src: `/images/photo${n}.webp`,
    title: "Meghana",
    caption: starterCaptions[i],
    orientation: orientations[n],
    focus: focusPoints[n],
  };
});

export default photos;
