import React from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Monitor,
  LayoutTemplate,
  Code2,
  Smartphone,
  Search,
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "UI/UX Design",
    description: "Beautiful, user-centric interfaces.",
    icon: <PenTool className="w-5 h-5" />,
  },
  {
    title: "Business Websites",
    description: "Corporate sites that convert.",
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    title: "Landing Pages",
    description: "High-converting single pages.",
    icon: <LayoutTemplate className="w-5 h-5" />,
  },
  {
    title: "Web Development",
    description: "Scalable modern web apps.",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    title: "App Development",
    description: "Native & cross-platform apps.",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    title: "SEO",
    description: "Rank higher on search engines.",
    icon: <Search className="w-5 h-5" />,
  },
  {
    title: "WordPress",
    description: "Custom themes & plugins.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Portfolio Websites",
    description: "Showcase your best work.",
    icon: <ImageIcon className="w-5 h-5" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const ServicePreview: React.FC = () => {
  return (
    <section className="px-6 pb-16 w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Our Capabilities</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Everything you need to succeed online.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative flex flex-col p-5 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-white/5 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {service.title}
              </h3>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 pl-14">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicePreview;
