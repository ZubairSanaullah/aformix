import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "CEO",
    company: "TechNova",
    review: "Aformix transformed our digital presence. Our conversion rates doubled within the first month of launching the new platform.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "GrowthStack",
    review: "Exceptional quality and communication. They understood our vision immediately and executed it perfectly. Highly recommended.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const SocialProof: React.FC = () => {
  return (
    <section className="px-6 pb-16 w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Trusted by Leaders</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Don't just take our word for it.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-4"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden"
          >
            {/* Quote watermark */}
            <div className="absolute -top-4 -right-4 text-slate-100 dark:text-slate-800/50 text-8xl font-serif leading-none pointer-events-none select-none">
              "
            </div>
            
            <div className="relative z-10">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 italic mb-6">
                "{testimonial.review}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SocialProof;
