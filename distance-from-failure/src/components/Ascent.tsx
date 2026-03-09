import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';

interface AscentProps {
  onComplete: () => void;
}

const fragments = [
  { id: 1, label: "[ tool capsule ]", text: "I left architecture for an AI incubator because it felt safer.", top: '150vh', left: '25%' },
  { id: 2, label: "[ founder speech shard ]", text: "I learned new tools, joined founder conversations.", top: '280vh', left: '65%' },
  { id: 3, label: "[ data strip ]", text: "But I avoided choosing one problem...", top: '400vh', left: '35%' },
  { id: 4, label: "[ luminous scaffold ]", text: "...and building a real project.", top: '520vh', left: '60%' },
];

export default function Ascent({ onComplete }: AscentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // 1. 模拟向上延伸的视差效果
  const towerScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const towerOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const sunScale = useTransform(smoothProgress, [0, 1], [0.8, 1.5]);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-[#e94e58] overflow-hidden">
      
      {/* 背景：复刻图片中的暖色调天空 */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#ff6b6b] via-[#f06292] to-[#880e4f] z-0" />
      
      {/* 太阳/发光背景 */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-200 blur-[100px] opacity-40 z-5"
        style={{ scale: sunScale }}
      />
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-orange-400 blur-[60px] opacity-60 z-5"
        style={{ scale: sunScale }}
      />

      {/* 2. 核心白塔：参考图片中的分段圆柱体 */}
      <motion.div 
        className="fixed inset-0 flex justify-center items-end z-10 pointer-events-none"
        style={{ opacity: towerOpacity }}
      >
        <motion.div 
          className="relative w-32 md:w-48 h-full bg-white shadow-[0_0_50px_rgba(255,255,255,0.8)]"
          style={{ scaleX: towerScale }}
        >
          {/* 塔的分段线 */}
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-full h-[1px] bg-black/10" 
              style={{ bottom: `${i * 2.5}%` }}
            />
          ))}
          {/* 塔的垂直纹理 */}
          <div className="absolute inset-0 flex justify-around opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-black" />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 3. 星光点点 (白色粒子) */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 8px 2px rgba(255,255,255,0.8)',
              y: useTransform(smoothProgress, [0, 1], [0, -Math.random() * 500])
            }}
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity }}
          />
        ))}
      </div>

      {/* 4. 浮动的碎片交互 (带文字) */}
      <div className="relative z-30">
        {fragments.map((frag, i) => (
          <FragmentItem key={frag.id} frag={frag} index={i} scrollProgress={smoothProgress} />
        ))}
      </div>

      {/* 5. 标题和按钮 */}
      <div className="fixed top-12 left-0 w-full flex flex-col items-center z-50 pointer-events-none">
        <h2 className="text-2xl serif italic font-light text-white drop-shadow-lg">Ascending the Structure...</h2>
      </div>

      <motion.div 
        className="fixed bottom-12 left-0 w-full flex justify-center z-50"
        style={{ opacity: useTransform(smoothProgress, [0.98, 1], [0, 1]) }}
      >
        <button onClick={onComplete} className="px-10 py-4 border-2 border-white text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-[#880e4f] transition-all shadow-lg">
          Reach the Peak
        </button>
      </motion.div>
    </div>
  );
}

function FragmentItem({ frag, index, scrollProgress }: { frag: any; index: number; scrollProgress: any; key?: any }) {
  const [isHovered, setIsHovered] = useState(false);
  // 让碎片随着滚动向上飞过
  const scrollY = useTransform(scrollProgress, [0, 1], ['0vh', '-400vh']);

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ top: frag.top, left: frag.left, y: scrollY }}
    >
      <motion.div
        className="relative w-16 h-16 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ 
          y: [0, -15, 0],
          rotate: [45, 50, 45]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
      >
        {/* 发光背景 */}
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full group-hover:bg-yellow-200/40 transition-colors" />
        
        {/* 核心方块 */}
        <motion.div
          className="absolute inset-0 border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            borderColor: isHovered ? '#fbbf24' : '#ffffff',
            boxShadow: isHovered ? '0 0 30px rgba(251,191,36,0.8)' : '0 0 20px rgba(255,255,255,0.5)'
          }}
        >
          <div className="w-2 h-2 bg-white" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute top-20 w-80 p-6 bg-white/10 backdrop-blur-xl border border-white/30 text-white shadow-2xl rounded-sm"
          >
            <p className="text-lg serif italic leading-relaxed font-light">
              {frag.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

