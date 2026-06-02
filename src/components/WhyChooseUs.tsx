import React from "react";
import { Zap, Shield, Crown, Smile } from "lucide-react";
import Divider from "./Divider";

const WhyChooseUs: React.FC = () => {
  const perks = [
    { icon: Crown, title: "Premium Quality", desc: "Top-tier code quality following industry best practices." },
    { icon: Zap, title: "Rapid Performance", desc: "Zero-latency experiences for your end users." },
    { icon: Shield, title: "Ironclad Security", desc: "Built with a security-first mindset from the ground up." },
    { icon: Smile, title: "Client Focused", desc: "Transparent communication and dedicated support." }
  ];

  return (
    <section className="section-padding w-full bg-slate-950/80">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          <p className="text-secondary font-semibold uppercase tracking-[0.3em] mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Simple, trusted solutions for your next project</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We keep the process clear and focused so you can move faster. Our team delivers reliable products with strong support and modern craftsmanship.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {perks.map((perk, i) => (
            <div key={i} className="rounded-3xl bg-slate-900/95 border border-slate-800 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-primary">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <perk.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{perk.title}</h3>
              <p className="text-slate-400 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default WhyChooseUs;
