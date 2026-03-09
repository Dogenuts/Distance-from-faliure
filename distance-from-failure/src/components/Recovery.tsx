import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';

interface RecoveryProps {
  onComplete: () => void;
}

const recoverySteps = [
  { 
    id: 1, 
    label: "[ 1. heritage projects ]", 
    text: "I began to recover through heritage projects...", 
    type: 'stone',
    top: '150vh', left: '30%', 
  },
  { 
    id: 2, 
    label: "[ 2. oral history interviews ]", 
    text: "...oral history interviews, publishing...", 
    type: 'capsule',
    top: '300vh', left: '70%', 
  },
  { 
    id: 3, 
    label: "[ 3. weekly experiments ]", 
    text: "...and weekly experiments — one tool, one user, one round of feedback.", 
    type: 'panes',
    top: '450vh', left: '25%', 
  },
  { 
    id: 4, 
    label: "[ peak: complete value proving ]", 
    text: "Publishing, lecturing, and creating. Scaled architectural insights and founder stories to 100K+ viral impact.", 
    type: 'peak',
    top: '600vh', left: '60%', 
  }
];

export default function Recovery({ onComplete }: RecoveryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Transition effects
  const bgOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0.3]);
  const sceneScale = useTransform(smoothProgress, [0.9, 1], [1, 0.95]);
  const sceneBlur = useTransform(smoothProgress, [0.95, 1], [0, 10]);

  // Twinkling stars
  const stars = useMemo(() => [...Array(120)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5
  })), []);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-[#d1a3c4] overflow-hidden">
      
      {/* 1. BACKGROUND: Pink-Purple Gradient & Twinkling Stars */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-[#b388aa] via-[#d1a3c4] to-[#f5d5e5] z-0"
        style={{ opacity: bgOpacity }}
      >
        {stars.map(star => (
          <motion.div 
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{ 
              top: star.top, 
              left: star.left, 
              width: star.size, 
              height: star.size,
              boxShadow: '0 0 4px rgba(255,255,255,0.8)'
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </motion.div>

      {/* 2. THE VINE: Connecting the components */}
      <motion.div 
        className="fixed inset-0 z-10 pointer-events-none flex justify-center"
        style={{ scale: sceneScale, filter: `blur(${sceneBlur}px)` }}
      >
        <svg viewBox="0 0 1000 1000" className="h-full w-auto opacity-40">
          <motion.path
            d="M500,0 Q550,200 450,400 T500,800 T450,1200"
            fill="none"
            stroke="#15803d"
            strokeWidth="2"
            strokeDasharray="10 5"
            style={{
              pathLength: useTransform(smoothProgress, [0, 1], [0, 1.5])
            }}
          />
          {/* Small leaves along the vine */}
          {[...Array(15)].map((_, i) => (
            <motion.circle
              key={i}
              cx={480 + Math.sin(i) * 30}
              cy={i * 80}
              r="3"
              fill="#166534"
              style={{
                opacity: useTransform(smoothProgress, [i * 0.06, i * 0.06 + 0.05], [0, 1])
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* 3. RECOVERY OBJECTS */}
      <motion.div 
        className="relative z-20"
        style={{ scale: sceneScale }}
      >
        {recoverySteps.map((step, i) => (
          <RecoveryItem key={step.id} step={step} index={i} scrollProgress={smoothProgress} />
        ))}
      </motion.div>

      {/* 4. NAVIGATION / PROGRESS */}
      <motion.div 
        className="fixed top-12 left-12 z-50 pointer-events-none"
        style={{ opacity: useTransform(smoothProgress, [0.9, 0.95], [1, 0]) }}
      >
        <h2 className="text-3xl md:text-4xl serif italic text-black/70 drop-shadow-sm">Recovery Phase</h2>
        <p className="text-[10px] uppercase tracking-[0.5em] text-black/40 mt-2">Connecting the fragments of memory</p>
      </motion.div>

      {/* 5. COMPLETION BUTTON */}
      <motion.div 
        className="fixed bottom-12 left-0 w-full flex justify-center z-50"
        style={{ 
          opacity: useTransform(smoothProgress, [0.98, 1], [0, 1]),
          pointerEvents: useTransform(smoothProgress, p => p > 0.98 ? 'auto' : 'none'),
          y: useTransform(smoothProgress, [0.98, 1], [20, 0])
        }}
      >
        <button
          onClick={onComplete}
          className="px-12 py-4 border-2 border-black/20 rounded-full text-[11px] uppercase tracking-[0.6em] text-black hover:bg-black hover:text-white transition-all bg-white/20 backdrop-blur-xl shadow-2xl"
        >
          Form the Bridge
        </button>
      </motion.div>
    </div>
  );
}

function RecoveryItem({ step, index, scrollProgress }: { step: any; index: number; scrollProgress: any; key?: any }) {
  const [isHovered, setIsHovered] = useState(false);
  // Objects fly up as we scroll
  const y = useTransform(scrollProgress, [0, 1], ['0vh', '-400vh']);

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ top: step.top, left: step.left, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center cursor-pointer group"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          y: [0, -10, 0]
        }}
        transition={{ 
          scale: { type: 'spring', stiffness: 300, damping: 15 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full group-hover:bg-white/40 transition-colors" />
        
        {/* Detailed SVG Objects */}
        <div className="relative z-10 w-full h-full">
          {step.type === 'stone' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <path d="M20,30 L80,25 L85,75 L15,80 Z" fill="#94a3b8" stroke="#1e293b" strokeWidth="1" />
              <path d="M20,30 L40,15 L90,20 L80,25" fill="#cbd5e1" stroke="#1e293b" strokeWidth="1" />
              <path d="M90,20 L85,70 L85,75 L80,25" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
              {/* Moss/Vines */}
              <path d="M30,80 Q25,50 45,30" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
              <circle cx="45" cy="30" r="2" fill="#be123c" />
            </svg>
          )}

          {step.type === 'capsule' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <rect x="20" y="35" width="60" height="30" rx="15" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
              <rect x="30" y="42" width="40" height="16" rx="8" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1" />
              <motion.circle 
                cx="50" cy="50" r="4" 
                fill="#60a5fa" 
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
              />
              <path d="M70,50 L85,50" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}

          {step.type === 'panes' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              {[...Array(5)].map((_, i) => (
                <rect 
                  key={i}
                  x={20 + i * 4} 
                  y={20 + i * 6} 
                  width="50" 
                  height="40" 
                  fill="rgba(255,255,255,0.1)" 
                  stroke="white" 
                  strokeWidth="0.5" 
                  className="backdrop-blur-sm"
                />
              ))}
              <line x1="30" y1="30" x2="60" y2="60" stroke="white" strokeWidth="0.2" opacity="0.5" />
            </svg>
          )}

          {step.type === 'peak' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <path d="M50,10 L90,90 L10,90 Z" fill="none" stroke="white" strokeWidth="1" />
              <path d="M50,10 L50,90 M10,90 L90,90" stroke="white" strokeWidth="0.5" opacity="0.5" />
              <circle cx="50" cy="10" r="3" fill="white" />
              {[...Array(8)].map((_, i) => (
                <line 
                  key={i}
                  x1="50" y1="10" 
                  x2={10 + i * 11.4} y2="90" 
                  stroke="white" 
                  strokeWidth="0.2" 
                  opacity="0.3" 
                />
              ))}
            </svg>
          )}
        </div>

        {/* Label */}
        <div className="absolute -bottom-8 whitespace-nowrap text-[9px] uppercase tracking-[0.4em] text-black/50 font-mono">
          {step.label}
        </div>
      </motion.div>

      {/* Narrative Text */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.9 }}
            className="absolute left-full ml-12 w-80 p-8 bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-sm z-50 pointer-events-none"
          >
            <h4 className="text-lg serif italic text-black/80 mb-3">{step.label}</h4>
            <p className="text-base serif italic leading-relaxed font-light text-black/60">
              {step.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
