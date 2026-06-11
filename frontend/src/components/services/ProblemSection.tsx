import React from "react";
import { motion } from "framer-motion";
import type { ServiceProblem } from "../../types/service";
import SectionBadge from "./SectionBadge";
import { fadeUp, scrollViewport } from "../../utils/animations";

interface ProblemSectionProps {
  problems: ServiceProblem[];
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ problems }) => {
  if (!problems || problems.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      {/* Decorative accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-primary), transparent)" }}
      />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge variant="danger">Common Challenges</SectionBadge>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="heading-2"
          >
            Sound Familiar?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            style={{ color: "var(--color-text-muted)" }}
            className="text-lg mt-4"
          >
            These are the most common obstacles we see businesses struggling with. We know how to solve them.
          </motion.p>
        </div>

        <div className={`grid gap-6 ${problems.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl p-8 cursor-default overflow-hidden"
                style={{
                  background: "var(--color-glass)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid var(--color-glass-border)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.06), transparent)" }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(239,68,68,0.12)" }}
                >
                  {Icon && <Icon style={{ color: "#ef4444" }} size={26} />}
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
                  {problem.title}
                </h3>
                <p className="leading-relaxed text-[0.95rem]" style={{ color: "var(--color-text-muted)" }}>
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
