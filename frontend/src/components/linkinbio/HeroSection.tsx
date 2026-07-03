import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-12 px-6 flex flex-col items-center text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <img
          src="/img/logo.png"
          alt="Aformix Logo"
          className="h-12 md:h-14 w-auto "
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight text-slate-900 dark:text-white"
      >
        Digital Products That <br className="hidden md:block" />
        <span className="gradient-text">Move Businesses Forward.</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
      >
        We build premium websites, web applications, mobile apps, and SEO solutions that help businesses grow and scale effortlessly.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
      >
        <a
          href="https://aformix.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
        >
          Visit Website
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="https://wa.me/+923019170936"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 dark:bg-transparent"
        >
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
