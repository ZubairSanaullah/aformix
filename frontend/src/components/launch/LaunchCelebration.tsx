import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LaunchCelebration: React.FC = () => {
  const [phase, setPhase] = useState<number>(1);

  useEffect(() => {
    // Phase 1: 0 - 0.8s
    // Phase 2: 0.8 - 1.5s
    // Phase 3: 1.5 - 2.5s
    // Phase 4: 2.5 - 3.5s
    // Phase 5: 3.5 - 4.0s
    const timers = [
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 3500)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Generate random particles
  const particles = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth,
    y: (Math.random() - 0.5) * window.innerHeight,
    scale: Math.random() * 2 + 0.5,
    delay: Math.random() * 0.2
  })), []);

  // Generate confetti
  const confetti = useMemo(() => Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 1,
    color: ['#FFD700', '#FF6347', '#4682B4', '#32CD32', '#FF69B4'][Math.floor(Math.random() * 5)]
  })), []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center"
    >
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-4xl font-bold tracking-widest text-white"
          >
            AFORMIX
          </motion.div>
        )}

        {phase >= 2 && phase < 5 && (
          <motion.div key="particles" className="absolute inset-0 z-0">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: p.x, y: p.y, scale: p.scale, opacity: 0 }}
                transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)]"
              />
            ))}
          </motion.div>
        )}

        {phase >= 3 && phase < 5 && (
          <motion.div
            key="text"
            initial={{ opacity: 0, scale: 0.5, y: 50, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="z-10 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_30px_rgba(49,185,143,0.8)]">
              AFORMIX IS LIVE
            </h1>
          </motion.div>
        )}

        {phase >= 4 && phase < 5 && (
          <motion.div key="confetti" className="absolute inset-0 z-20 pointer-events-none">
            {confetti.map((c) => (
              <motion.div
                key={c.id}
                initial={{ y: -50, x: c.x, opacity: 1, rotate: 0 }}
                animate={{ y: window.innerHeight + 50, rotate: 360, opacity: 0 }}
                transition={{ duration: c.duration, delay: c.delay, ease: "linear" }}
                style={{ backgroundColor: c.color }}
                className="absolute top-0 w-3 h-8"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LaunchCelebration;
