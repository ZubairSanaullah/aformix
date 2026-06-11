import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import type { HeroVariant } from "../../constants/serviceNav";
import { heroStagger, heroItem } from "../../utils/animations";
import ServiceHeroIllustration from "./ServiceHeroIllustration";

interface ServiceHeroProps {
  badge: string;
  headline: string;
  valueProposition?: string;
  description: string;
  heroVariant?: HeroVariant;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  headline,
  valueProposition,
  description,
  heroVariant = "code",
}) => {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(49,185,143,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(104,75,158,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,191,222,0.10) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1 variants={heroItem} className="heading-1 mb-4">
              {headline}
            </motion.h1>

            {valueProposition && (
              <motion.p
                variants={heroItem}
                className="text-xl md:text-2xl font-semibold mb-6 gradient-text"
              >
                {valueProposition}
              </motion.p>
            )}

            <motion.p
              variants={heroItem}
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ color: "var(--color-text-muted)" }}
            >
              {description}
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12"
            >
              <Link to="/contact">
                <button className="btn-primary flex items-center gap-2 group text-base px-8 py-4">
                  Get a Free Proposal
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button
                className="btn-outline text-base px-8 py-4"
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Features
              </button>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="hidden lg:flex flex-col items-start gap-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — unique illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="hidden md:block"
          >
            <ServiceHeroIllustration variant={heroVariant} />
          </motion.div>
        </div>

        {/* Mobile scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex lg:hidden flex-col items-center gap-2 mt-4"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
