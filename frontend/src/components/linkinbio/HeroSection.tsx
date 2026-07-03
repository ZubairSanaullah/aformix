import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const HeroSection: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("dark"); // system -> dark
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <section className="relative pt-20 pb-12 px-6 flex flex-col items-center text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={cycleTheme}
        aria-label="Toggle theme"
        className="link-page-theme-btn"
      >
        <ThemeIcon className="w-4 h-4" />
        <span className="link-page-theme-label">
          {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Auto"}
        </span>
      </motion.button>

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
        className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight links-section-title text-slate-900"
      >
        Digital Products That <br className="hidden md:block" />
        <span className="gradient-text">Move Businesses Forward.</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-lg links-section-subtitle text-slate-600 max-w-2xl mx-auto mb-10"
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
          className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5"
        >
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
