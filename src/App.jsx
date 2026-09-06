import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PasswordScreen from "./components/PasswordScreen";
import WelcomeSection from "./components/WelcomeSection";
import Navbar from "./components/Navbar";
import BirthdayHero from "./components/BirthdayHero";
import PhotoShowcase from "./components/PhotoShowcase";
import CinematicSection from "./components/CinematicSection";
import PhotoStory from "./components/PhotoStory";
import SpecialThings from "./components/SpecialThings";
import QuoteCards from "./components/QuoteCards";
import BirthdayLetter from "./components/BirthdayLetter";
import SurpriseCards from "./components/SurpriseCards";
import MemoryWall from "./components/MemoryWall";
import FinalSection from "./components/FinalSection";
import MusicPlayer from "./components/MusicPlayer";
import Lightbox from "./components/Lightbox";
import photos from "./data/photos";

const STAGE = { PASSWORD: "password", WELCOME: "welcome", SITE: "site" };

export default function App() {
  const [stage, setStage] = useState(STAGE.PASSWORD);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  function navigateLightbox(delta) {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return (i + delta + photos.length) % photos.length;
    });
  }

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {stage === STAGE.PASSWORD && (
          <PasswordScreen key="password" onUnlock={() => setStage(STAGE.WELCOME)} />
        )}
        {stage === STAGE.WELCOME && (
          <WelcomeSection key="welcome" onContinue={() => setStage(STAGE.SITE)} />
        )}
      </AnimatePresence>

      {stage === STAGE.SITE && (
        <>
          <Navbar />
          <BirthdayHero />
          <PhotoShowcase onOpen={setLightboxIndex} />
          <CinematicSection />
          <PhotoStory />
          <SpecialThings />
          <QuoteCards />
          <BirthdayLetter />
          <SurpriseCards />
          <MemoryWall />
          <FinalSection />
          <MusicPlayer />
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={navigateLightbox}
          />
        </>
      )}
    </div>
  );
}
