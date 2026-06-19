import React from 'react';
import { motion } from 'framer-motion';

const PremiumLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative flex items-center justify-center w-40 h-40">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 rounded-full border border-primary/30 border-t-primary"
        />
        
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-4 rounded-full border border-white/10 border-b-white/50"
        />

        {/* Inner Glowing Orb */}
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 bg-primary rounded-full shadow-[0_0_30px_rgba(49,185,143,0.8)]"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-white/70 tracking-[0.2em] text-sm uppercase font-light"
      >
        Initializing Sequence
      </motion.p>
    </div>
  );
};

export default PremiumLoader;
