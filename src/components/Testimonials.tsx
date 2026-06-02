import React from "react";
import { testimonials } from "../constants";
import { Quote, Star } from "lucide-react";

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding relative w-full">
       <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-primary font-black tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="heading-2">Trusted by Global <br /> <span className="gradient-text">Innovators</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((t) => (
            <div key={t.id} className="card-premium flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-secondary mb-8">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <Quote className="text-primary opacity-20 mb-6" size={56} />
                <p className="text-2xl font-bold text-white leading-relaxed mb-10 italic">
                  "{t.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-2xl border border-white/10" />
                <div>
                  <h4 className="text-xl font-bold text-white">{t.name}</h4>
                  <p className="text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
