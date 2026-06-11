import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router";

interface ServiceCTAProps {
  headline?: string;
  description?: string;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  headline = "Ready to Transform Your Business?",
  description = "Get in touch today to discuss your project requirements and receive a custom proposal within 24 hours.",
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden p-10 md:p-16"
          style={{
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 60%, #00BFDE 100%)",
          }}
        >
          {/* Light shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)" }}
          />

          {/* Decorative circles */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              🚀 Let's Get Started
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              {headline}
            </h2>

            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
                  style={{ background: "white", color: "var(--color-primary)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
                >
                  <Calendar size={20} />
                  Book a Free Consultation
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to="/contact">
                <button
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.35)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <MessageSquare size={20} />
                  Request a Proposal
                </button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10" style={{ color: "rgba(255,255,255,0.7)" }}>
              {["Free Consultation", "No Hidden Fees", "Reply Within 24hrs", "100% Satisfaction"].map((trust) => (
                <span key={trust} className="flex items-center gap-1.5 text-sm font-medium">
                  <span className="text-white">✓</span> {trust}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;
