import React from "react";
import { services } from "../constants";
import * as Icons from "lucide-react";

const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden w-full">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12 lg:px-24">
        <div className="mb-20">
          <h2 className="heading-2">World-Class Solutions</h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto text-lg">
            From custom architectures to enterprise-scale systems, we deliver technology that empowers your business to scale effortlessly.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = (Icons as any)[service.icon];
            return (
              <div key={service.id} className="card-premium group">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center mb-8 text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary transition-all duration-500 shadow-xl">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                
                {/* Decorative element */}
                <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 group-hover:text-primary transition-colors cursor-pointer uppercase">
                  Learn More <Icons.ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
