import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Layout,
  Layers,
  Search,
  Zap,
  ShieldCheck
} from "lucide-react";

interface TrustFeature {
  title: string;
  icon: React.ReactNode;
}

const features: TrustFeature[] = [
  { title: "Business-focused solutions", icon: <TrendingUp className="w-5 h-5" /> },
  { title: "Modern UI/UX", icon: <Layout className="w-5 h-5" /> },
  { title: "Scalable development", icon: <Layers className="w-5 h-5" /> },
  { title: "SEO-first mindset", icon: <Search className="w-5 h-5" /> },
  { title: "Performance optimization", icon: <Zap className="w-5 h-5" /> },
  { title: "Long-term support", icon: <ShieldCheck className="w-5 h-5" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const TrustSection: React.FC = () => {
  return (
    <section className="px-6 pb-16 w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold links-section-title text-[var(--color-text)] mb-2">Why Businesses Choose Aformix</h2>
        <p className="links-section-subtitle text-[var(--color-text-muted)] text-sm">We deliver results, not just code.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 gap-3 sm:gap-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="trust-feature-card flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-4 rounded-xl bg-[var(--color-surface)]/80 border border-[var(--color-border)] hover:border-primary/30 transition-colors"
          >
            <div className="flex-shrink-0 text-primary bg-primary/10 p-2 rounded-lg">
              {feature.icon}
            </div>
            <div className="flex items-center h-full">
              <h3 className="trust-feature-title font-semibold text-sm sm:text-base text-[var(--color-text)]">
                {feature.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustSection;
