import React from "react";
import { testimonials } from "../constants";
import { Quote, Star } from "lucide-react";
import Divider from "./Divider";

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding relative w-full">
       <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-primary font-black tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="heading-2">Trusted by Global <br /> <span className="gradient-text">Innovators</span></h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="card-premium bg-slate-950/80 border border-white/10 shadow-2xl shadow-black/20 p-8 rounded-[2rem] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
              <div>
                <div className="flex gap-1 text-secondary mb-6">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <Quote className="text-primary opacity-15 mb-6" size={52} />
                <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-10 italic">
                  "{t.content}"
                </p>
              </div>
              <div className="mt-4">
                <p className="text-base text-slate-300 mb-2">— {t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default Testimonials;
