import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LAUNCH_DATE } from '../../hooks/useLaunchStatus';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownGate: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = LAUNCH_DATE - Date.now();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Background orbs
  const orbs = [
    { id: 1, size: 'w-64 h-64', color: 'bg-primary/20', top: '10%', left: '10%', delay: 0 },
    { id: 2, size: 'w-96 h-96', color: 'bg-secondary/20', top: '50%', left: '80%', delay: 1 },
    { id: 3, size: 'w-72 h-72', color: 'bg-accent/20', top: '80%', left: '20%', delay: 2 }
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#0a0a1a] flex items-center justify-center font-sans">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Orbs */}
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute ${orb.size} ${orb.color} rounded-full blur-[80px] pointer-events-none z-0`}
          style={{ top: orb.top, left: orb.left, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-1 mb-6 border rounded-full border-primary/30 bg-primary/10 backdrop-blur-md">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">
              Launching June 22, 2026
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-xl leading-tight">
            A New Era of Digital <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Innovation Begins
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto">
            Aformix is preparing something extraordinary.
          </p>
        </motion.div>

        {/* Countdown Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 w-full max-w-4xl"
        >
          {[
            { label: 'Days', value: formatNumber(timeLeft.days) },
            { label: 'Hours', value: formatNumber(timeLeft.hours) },
            { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
            { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
          ].map((item) => (
            <div 
              key={item.label}
              className="flex flex-col items-center justify-center p-6 border rounded-3xl bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              
              <motion.span 
                key={item.value}
                initial={{ opacity: 0.5, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {item.value}
              </motion.span>
              <span className="text-sm md:text-base font-medium tracking-widest uppercase text-primary/80">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownGate;
