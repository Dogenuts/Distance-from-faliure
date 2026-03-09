import React, { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';

interface BridgeProps {
  onComplete: () => void;
}

const segments = [
  { id: 1, label: "stone", source: "original discipline", text: "Not a leap." },
  { id: 2, label: "voice", source: "oral history", text: "A way forward." },
  { id: 3, label: "page", source: "publishing", text: "I learned that growth" },
  { id: 4, label: "module", source: "prototype", text: "is not avoiding risk..." },
  { id: 5, label: "feedback", source: "response loop", text: "...but managing it through action." },
];

export default function Bridge({ onComplete }: BridgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  
  // Camera movement - moving forward into the scene
  const cameraZ = useTransform(smoothProgress, [0, 1], [0, -4000]);
  const skyBrightness = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#FFD54F] overflow-hidden">
      {/* 1. ATMOSPHERIC BACKGROUND (Yellow Fog Sky) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#FFD54F] via-[#FFE082] to-[#F48FB1]" />
      
      {/* Volume Fog Layers */}
      <motion.div 
        className="fixed inset-0 z-1 opacity-40 pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 70%)',
          scale: useTransform(smoothProgress, [0, 1], [1, 1.5]),
          filter: 'blur(60px)'
        }}
      />
      
      {/* Drifting Mist */}
      <motion.div 
        className="fixed inset-0 z-2 opacity-30 pointer-events-none"
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ 
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          filter: 'blur(100px)'
        }}
      />

      {/* 2. DEAD TREES (Pencil Line Art) */}
      <div className="fixed inset-0 z-5 pointer-events-none flex justify-between px-10 opacity-20">
        <TreeSide side="left" />
        <TreeSide side="right" />
      </div>

      {/* 3. THE BRIDGE SCENE (3D Space) */}
      <div className="fixed inset-0 z-10 flex items-center justify-center perspective-[800px]">
        <motion.div 
          style={{ 
            translateZ: cameraZ,
            rotateX: 25,
            transformStyle: 'preserve-3d'
          }}
          className="relative w-full h-full flex flex-col items-center justify-start pt-[95vh]"
        >
          {segments.map((seg, i) => (
            <BridgeSegment 
              key={seg.id} 
              seg={seg} 
              index={i} 
              progress={smoothProgress} 
            />
          ))}
        </motion.div>
      </div>

      {/* 4. ABYSS FOREGROUND */}
      <div className="fixed bottom-0 left-0 w-full h-[40vh] z-20 bg-gradient-to-t from-[#1A0519] via-[#2D0C2C]/80 to-transparent pointer-events-none" />

      {/* 5. GRAIN OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

      {/* Chapter Header */}
      <motion.div 
        className="fixed top-16 left-0 w-full flex flex-col items-center z-50 pointer-events-none"
        style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0, 1]) }}
      >
        <span className="text-[12px] uppercase tracking-[0.6em] text-[#880E4F]/60 mb-3 font-medium">03. THE BRIDGE FORMS</span>
        <h2 className="text-4xl md:text-5xl serif italic font-light text-[#880E4F] drop-shadow-sm">managing risk through action</h2>
      </motion.div>

      {/* Completion Button */}
      <motion.div 
        className="fixed bottom-16 left-0 w-full flex justify-center z-50"
        style={{ 
          opacity: useTransform(smoothProgress, [0.95, 1], [0, 1]),
          pointerEvents: useTransform(smoothProgress, p => p > 0.95 ? 'auto' : 'none')
        }}
      >
        <button
          onClick={onComplete}
          className="px-10 py-3 border border-[#880E4F]/20 rounded-full text-[10px] uppercase tracking-[0.5em] text-[#880E4F] hover:bg-[#880E4F] hover:text-white transition-all duration-500 bg-white/10 backdrop-blur-md"
        >
          Reach the Horizon
        </button>
      </motion.div>
    </div>
  );
}

interface BridgeSegmentProps {
  seg: (typeof segments)[0];
  index: number;
  progress: any;
}

const BridgeSegment: React.FC<BridgeSegmentProps> = ({ seg, index, progress }) => {
  const start = index * 0.18;
  const end = start + 0.25;
  
  const segmentOpacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const segmentY = useTransform(progress, [start, start + 0.1], [300, 0]);
  const segmentScale = useTransform(progress, [start, start + 0.1], [0.85, 1]);
  
  // Pulse glow effect on appearance
  const glowIntensity = useTransform(
    progress, 
    [start, start + 0.03, start + 0.08, start + 0.15], 
    [0, 1, 0.4, 0]
  );
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{ 
        opacity: segmentOpacity,
        y: segmentY,
        scale: segmentScale,
        translateZ: index * 700,
        transformStyle: 'preserve-3d',
        marginBottom: '250px'
      }}
      className="relative w-[600px] md:w-[900px] h-32 flex items-center justify-center group cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Embankment (Continuous Wall) */}
      <motion.div 
        className="absolute right-[95%] w-48 md:w-64 h-64 bg-[#E91E63] border-l-4 border-t-4 border-[#880E4F]/40"
        style={{ 
          transform: 'rotateY(60deg) translateZ(-20px)',
          clipPath: 'polygon(0% 0%, 100% 5%, 100% 95%, 0% 100%)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/rock.png')]" />
        {/* Abyss Depth Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#1A0519]" />
        {/* Top Edge Highlight */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
      </motion.div>

      {/* Right Embankment (Continuous Wall) */}
      <motion.div 
        className="absolute left-[95%] w-48 md:w-64 h-64 bg-[#E91E63] border-r-4 border-t-4 border-[#880E4F]/40"
        style={{ 
          transform: 'rotateY(-60deg) translateZ(-20px)',
          clipPath: 'polygon(0% 5%, 100% 0%, 100% 100%, 0% 95%)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/rock.png')]" />
        {/* Abyss Depth Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#1A0519]" />
        {/* Top Edge Highlight */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
      </motion.div>

      {/* Central Stone Slab (The Step) */}
      <motion.div 
        className="absolute inset-0 bg-[#F8BBD0] border-2 border-[#880E4F]/30 shadow-[0_20px_50px_rgba(136,14,79,0.3)]"
        style={{ 
          clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
          transformStyle: 'preserve-3d'
        }}
        animate={{ 
          backgroundColor: isHovered ? '#F48FB1' : '#F8BBD0',
          scale: isHovered ? 1.01 : 1,
          boxShadow: isHovered 
            ? '0 30px 60px rgba(136,14,79,0.4), 0 0 20px rgba(255,255,255,0.2)' 
            : '0 20px 50px rgba(136,14,79,0.3)'
        }}
      >
        {/* Step Front Face (Thickness / Riser) */}
        <div 
          className="absolute bottom-0 left-0 w-full h-12 bg-[#AD1457] origin-top border-t border-white/10"
          style={{ transform: 'rotateX(-90deg) translateY(100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>
        
        {/* Hand-Drawn Cracks & Texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M5 15 L25 18 L20 35 L35 38" stroke="#880E4F" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M85 12 L75 28 L92 32 L88 45" stroke="#880E4F" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M45 65 L55 68 L52 85 L65 88" stroke="#880E4F" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M15 80 L25 85 L22 95" stroke="#880E4F" strokeWidth="0.3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Generation Glow Pulse */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent"
          style={{ opacity: glowIntensity }}
        />
      </motion.div>

      {/* Narrative Text */}
      <div className="relative z-10 flex flex-col items-center px-12 text-center pointer-events-none">
        <motion.p 
          className="text-3xl md:text-5xl serif italic font-light text-[#880E4F] leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
          style={{ 
            textShadow: '0 0 1px rgba(136,14,79,0.2)'
          }}
          animate={{ 
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.02 : 1
          }}
        >
          {seg.text}
        </motion.p>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <span className="text-[12px] uppercase tracking-[0.5em] text-[#880E4F]/50 font-medium bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                {seg.label} / {seg.source}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

function TreeSide({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`h-full flex flex-col justify-around ${side === 'left' ? 'items-start' : 'items-end'}`}>
      {[...Array(3)].map((_, i) => (
        <motion.svg 
          key={i}
          width="120" 
          height="300" 
          viewBox="0 0 100 250"
          animate={{ rotate: side === 'left' ? [-1, 1, -1] : [1, -1, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          className="opacity-40"
        >
          <path 
            d="M50 250 Q 45 150 50 50 M50 200 L30 170 M50 150 L70 120 M50 100 L35 70 M50 80 L65 50" 
            stroke="#880E4F" 
            strokeWidth="1" 
            fill="none" 
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}
