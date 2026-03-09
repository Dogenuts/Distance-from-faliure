import React from 'react';
import { motion } from 'motion/react';

interface HomeProps {
  onStart: () => void;
}

export default function Home({ onStart }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <motion.span 
            className="text-xs uppercase tracking-[0.3em] text-ink/40 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Interactive Story
          </motion.span>
          <h1 className="text-5xl md:text-7xl serif font-light tracking-tight text-ink">
            Distance from Failure
          </h1>
          <p className="text-sm md:text-base text-ink/60 font-light italic serif">
            an interactive story about mistake, movement, and proof
          </p>
        </div>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 border border-ink/10 rounded-full text-xs uppercase tracking-[0.3em] text-ink hover:bg-ink hover:text-bg-paper transition-all duration-500"
        >
          Enter Story
        </motion.button>
      </motion.div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center">
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-widest text-ink/30"
        >
          mouse moves → faint glow / particles
        </motion.div>
      </div>
    </div>
  );
}
