import React from 'react';
import { motion } from 'motion/react';

interface EndProps {
  onRestart: () => void;
}

export default function End({ onRestart }: EndProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-[#fdfcf8]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="max-w-2xl space-y-12"
      >
        <div className="space-y-6">
          <p className="text-xl md:text-2xl serif italic font-light text-ink/80 leading-relaxed">
            "The path was never something I had to find whole. <br />
            It was something I had to keep making."
          </p>
          <div className="w-12 h-px bg-ink/10 mx-auto" />
          <p className="text-sm text-ink/50 serif italic">
            At first, the path was something I was afraid to test. <br />
            In the end, the path is something I know how to build.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-ink/10 rounded-full text-xs uppercase tracking-[0.3em] text-ink hover:bg-ink hover:text-bg-paper transition-all duration-500"
          >
            Restart Story
          </motion.button>
          
          <div className="pt-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-ink/20">
              Distance from Failure — 2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
