import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

interface PrologueProps {
  onComplete: () => void;
}

export default function Prologue({ onComplete }: PrologueProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const [isNear, setIsNear] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check distance to the tower area (center-ish)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      
      // The user wants the blur to disappear when mouse is "near"
      setIsNear(dist < 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const lines = [
    "00. PROLOGUE",
    "The mistake I made was a pattern.",
    "I kept choosing distance from failure.",
    "I could see the tower.",
    "I just didn’t test the path."
  ];

  useEffect(() => {
    if (isNear && step < lines.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [isNear, step]);

  // Generate some random debris positions
  const debris = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 400 - 200,
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#E91E63]">
      {/* Sky Gradient (Rose-Red) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E91E63] via-[#D81B60] to-[#880E4F]" />

      {/* Mountains (Purple) */}
      <svg className="absolute bottom-0 w-full h-[60vh] preserve-3d" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
        <path 
          d="M0 800V600L200 450L450 550L700 350L1000 500L1250 400L1440 550V800H0Z" 
          fill="#4A148C" 
          className="opacity-80"
        />
        <path 
          d="M0 800V650L300 500L600 650L900 450L1200 600L1440 500V800H0Z" 
          fill="#311B92" 
        />
      </svg>

      {/* Valley Path (Pale Green) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh]">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
          <path 
            d="M200 0C150 100 50 250 0 400H400C350 250 250 100 200 0Z" 
            fill="#DCEDC8" 
            className="opacity-60"
          />
          <path 
            d="M200 0C180 100 120 250 100 400H300C280 250 220 100 200 0Z" 
            fill="#C5E1A5" 
          />
        </svg>
      </div>

      {/* Main Scene Container with Blur Filter */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ 
          filter: isNear ? 'blur(0px)' : 'blur(20px)',
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* The Green Tower */}
        <div className="relative w-48 h-[80vh] flex flex-col items-center justify-end pb-20">
          
          {/* Floating Debris */}
          {debris.map((d) => (
            <motion.div
              key={d.id}
              className="absolute bg-[#1B5E20] opacity-60"
              style={{
                width: d.size,
                height: d.size,
                left: `calc(50% + ${d.x}px)`,
                top: `calc(40% + ${d.y}px)`,
                rotate: d.rotation,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [d.rotation, d.rotation + 20, d.rotation],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: d.delay,
              }}
            />
          ))}

          {/* Tower Body (SVG for broken edges) */}
          <div className="relative w-24 h-full">
            <svg viewBox="0 0 100 500" className="w-full h-full drop-shadow-2xl">
              {/* Main Tower Structure */}
              <path 
                d="M30 500 L30 150 L25 140 L35 120 L30 100 L40 80 L35 50 L65 50 L60 80 L70 100 L65 120 L75 140 L70 150 L70 500 Z" 
                fill="#2E7D32" 
              />
              
              {/* Broken Top Detail */}
              <path 
                d="M35 50 L40 30 L45 45 L50 20 L55 40 L60 25 L65 50 Z" 
                fill="#1B5E20" 
              />

              {/* Parametric Windows/Details */}
              {[...Array(12)].map((_, i) => (
                <rect 
                  key={i}
                  x="45" 
                  y={100 + i * 30} 
                  width="10" 
                  height="15" 
                  fill="#1B5E20" 
                  opacity="0.4"
                />
              ))}

              {/* Vines (Hanging Lines) */}
              <path 
                d="M35 120 Q 20 180 30 250" 
                stroke="#1B5E20" 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="4 2"
              />
              <path 
                d="M65 180 Q 80 280 70 380" 
                stroke="#1B5E20" 
                strokeWidth="1" 
                fill="none" 
              />
              <path 
                d="M40 80 Q 10 150 25 220" 
                stroke="#1B5E20" 
                strokeWidth="0.8" 
                fill="none" 
              />
            </svg>

            {/* Internal Glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-transparent via-[#4CAF50]/10 to-transparent"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        <div className="mt-[40vh] space-y-8 text-center px-6">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: step > i ? 1 : 0, 
                y: step > i ? 0 : 20,
                filter: isNear ? 'blur(0px)' : 'blur(4px)'
              }}
              transition={{ duration: 1.2 }}
              className={`serif text-white drop-shadow-lg ${i === 0 ? 'text-sm uppercase tracking-[0.5em] mb-6 opacity-60' : 'text-xl md:text-2xl font-light italic'}`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Interaction Prompt */}
      <AnimatePresence>
        {!isNear && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 left-0 w-full flex justify-center z-40"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 animate-pulse">
              Approach the tower to reveal the path
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {step >= lines.length && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-16 left-0 w-full flex justify-center z-40"
        >
          <button
            onClick={onComplete}
            className="px-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] uppercase tracking-[0.4em] text-white hover:bg-white hover:text-[#4A148C] transition-all duration-500"
          >
            Continue
          </button>
        </motion.div>
      )}

      {/* Cursor Glow (Subtle) */}
      <motion.div
        className="fixed w-96 h-96 rounded-full bg-white/5 blur-[100px] pointer-events-none z-10"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
}
