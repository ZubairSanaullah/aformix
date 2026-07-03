import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="px-6 pb-20 w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="links-cta-card relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
      >
        {/* Background gradient effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary blur-[80px] rounded-full" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">
            Let's Build Something <span className="text-primary">Exceptional.</span>
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8 max-w-lg mx-auto">
            Ready to elevate your digital presence? We're here to help you turn your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/+923019170936"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-bold text-[var(--color-text)] bg-[var(--color-text)]/5 hover:bg-[var(--color-text)]/10 border border-[var(--color-border)] transition-colors backdrop-blur-md"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
