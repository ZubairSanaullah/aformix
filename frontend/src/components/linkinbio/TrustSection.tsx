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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Why Businesses Choose Aformix</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">We deliver results, not just code.</p>
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
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-colors"
          >
            <div className="flex-shrink-0 text-primary bg-primary/10 p-2 rounded-lg">
              {feature.icon}
            </div>
            <div className="flex items-center h-full">
              <h3 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
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
