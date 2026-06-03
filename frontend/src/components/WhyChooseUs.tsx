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
    <section className="reveal section-padding w-full" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <p className="text-primary font-black uppercase tracking-[0.35em] mb-4">Why Choose Us</p>
          <h2 className="heading-2">Simple, trusted solutions for your next project</h2>
          <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed text-lg">
            We keep the process clear and focused so you can move faster. Our team delivers reliable products with strong support and modern craftsmanship.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {perks.map((perk, i) => (
            <div key={i} className="card-premium p-8 transition hover:-translate-y-1 hover:border-primary">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <perk.icon size={26} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{perk.title}</h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default WhyChooseUs;
