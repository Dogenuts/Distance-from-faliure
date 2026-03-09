import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Chapter } from './types';

// Components
import Home from './components/Home';
import Prologue from './components/Prologue';
import Ascent from './components/Ascent';
import Recovery from './components/Recovery';
import Bridge from './components/Bridge';
import End from './components/End';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<Chapter>('home');
  const containerRef = useRef<HTMLDivElement>(null);

  const nextChapter = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    window.scrollTo(0, 0);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-bg-paper selection:bg-accent-gold/30">
      {/* Painterly Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="painterly-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="wait">
        {currentChapter === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Home onStart={() => nextChapter('prologue')} />
          </motion.div>
        )}

        {currentChapter === 'prologue' && (
          <motion.div
            key="prologue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Prologue onComplete={() => nextChapter('ascent')} />
          </motion.div>
        )}

        {currentChapter === 'ascent' && (
          <motion.div
            key="ascent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Ascent onComplete={() => nextChapter('recovery')} />
          </motion.div>
        )}

        {currentChapter === 'recovery' && (
          <motion.div
            key="recovery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Recovery onComplete={() => nextChapter('bridge')} />
          </motion.div>
        )}

        {currentChapter === 'bridge' && (
          <motion.div
            key="bridge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Bridge onComplete={() => nextChapter('end')} />
          </motion.div>
        )}

        {currentChapter === 'end' && (
          <motion.div
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <End onRestart={() => nextChapter('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Background Particles (Global) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-gold/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5
            }}
            animate={{
              y: [null, '-10%', '110%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
    </div>
  );
}
