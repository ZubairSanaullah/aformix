import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ServiceSolution } from "../../types/service";

interface SolutionSectionProps {
  solution: ServiceSolution;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ solution }) => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          {/* Left – text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ background: "rgba(49,185,143,0.12)", color: "var(--color-primary)", border: "1px solid rgba(49,185,143,0.25)" }}
            >
              Our Approach
            </div>

            <h2 className="heading-2 text-left mb-6">{solution.title}</h2>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--color-text-muted)" }}>
              {solution.description}
            </p>

            <ul className="space-y-4">
              {solution.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(49,185,143,0.15)" }}
                  >
                    <CheckCircle2 style={{ color: "var(--color-primary)" }} size={16} />
                  </div>
                  <span className="font-medium" style={{ color: "var(--color-text)" }}>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right – abstract visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden"
              style={{ border: "1px solid var(--color-glass-border)" }}
            >
              {/* Layered gradient background */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(49,185,143,0.12), rgba(104,75,158,0.12), rgba(0,191,222,0.08))" }}
              />
              {/* Animated orbs */}
              <motion.div
                className="absolute"
                style={{ width: 220, height: 220, borderRadius: "50%", top: "10%", left: "10%", background: "radial-gradient(circle, rgba(49,185,143,0.35), transparent 70%)", filter: "blur(40px)" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute"
                style={{ width: 200, height: 200, borderRadius: "50%", bottom: "10%", right: "10%", background: "radial-gradient(circle, rgba(104,75,158,0.35), transparent 70%)", filter: "blur(40px)" }}
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.div
                className="absolute"
                style={{ width: 150, height: 150, borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(0,191,222,0.25), transparent 70%)", filter: "blur(30px)" }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              />

              {/* Center icon grid */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 opacity-50">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-xl"
                      style={{ background: "var(--color-glass)", border: "1px solid var(--color-glass-border)" }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
