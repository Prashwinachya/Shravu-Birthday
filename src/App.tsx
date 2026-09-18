import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import FinalReveal from './components/FinalReveal';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';

const RISHITHA_PHOTOS = [
  {
    url: '/photos/rishitha1.jpg',
    title: 'Radiant in Yellow ✨',
    caption: 'Bright smiles, festive elegance, and glowing moments.'
  },
  {
    url: '/photos/rishitha2.jpg',
    title: 'Burger Joy & Laughs 🍔😋',
    caption: 'Unfiltered candid happiness and pure foodie love.'
  },
  {
    url: '/photos/rishitha3.jpg',
    title: 'Capella Cafe Memories ☕🌸',
    caption: 'Chilled cafe afternoons and unforgettable college conversations.'
  }
];

function App() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className={`min-h-screen ${isRevealed ? '' : 'dreamy-bg'}`}>
      {!isRevealed && <FloatingHearts />}
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <IntroScreen key="intro" onNext={() => setIsRevealed(true)} />
        ) : (
          <FinalReveal key="reveal" photos={RISHITHA_PHOTOS} name="Rishitha" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
