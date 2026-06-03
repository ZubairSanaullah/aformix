import React from "react";
import Divider from "./Divider";

const pricingPlans = [
  {
    title: "Starter",
    price: "$499",
    description: "Perfect for freelancers and small startups launching their first product.",
    features: [
      "Landing page design",
      "Responsive development",
      "Basic SEO setup",
      "2 rounds of revisions",
    ],
    cta: "Book Starter",
  },
  {
    title: "Growth",
    price: "$1,299",
    description: "Ideal for growing teams that need reliable product design and scalable builds.",
    features: [
      "Custom UI/UX",
      "Full-stack implementation",
      "Performance optimization",
      "3 months support",
    ],
    cta: "Book Growth",
    featured: true,
  },
  {
    title: "Enterprise",
    price: "$2,499",
    description: "Advanced solutions for enterprise-level systems with ongoing support.",
    features: [
      "Platform architecture",
      "API integrations",
      "Security & compliance",
      "Dedicated project manager",
    ],
    cta: "Book Enterprise",
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="reveal section-padding relative overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-70 -z-10"></div>
      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12 lg:px-24">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-primary">Pricing plans</p>
          <h2 className="heading-2">Flexible packages for every stage</h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            Choose the right plan for your business and get the support you need to build, launch, and scale with confidence.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`card-premium p-8 border border-glass-border ${plan.featured ? "scale-[1.02] border-primary shadow-[0_30px_80px_rgba(39,184,144,0.12)]" : ""}`}
            >
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                {plan.title}
              </span>
              <div className="mt-8">
                <p className="text-5xl font-black tracking-tight">{plan.price}</p>
                <p className="mt-4 text-slate-400 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className="btn-primary mt-10 w-full">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default Pricing;
