import React from "react";
import { Star, Zap, Shield, Crown, Smile } from "lucide-react";

const WhyChooseUs: React.FC = () => {
  const perks = [
    { icon: Crown, title: "Premium Quality", desc: "Top-tier code quality following industry best practices." },
    { icon: Zap, title: "Rapid Performance", desc: "Zero-latency experiences for your end users." },
    { icon: Shield, title: "Ironclad Security", desc: "Built with a security-first mindset from the ground up." },
    { icon: Smile, title: "Client Focused", desc: "Transparent communication and dedicated support." }
  ];

  return (
    <section className="section-padding relative overflow-hidden w-full">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-secondary font-black tracking-widest uppercase mb-4 block">The Aformix Edge</span>
            <h2 className="heading-2 text-left mb-8">Why Industry Leaders <br /> Trust <span className="gradient-text">Our Expertise</span></h2>
            <p className="text-slate-400 text-xl leading-relaxed mb-12">
              We don't just deliver projects; we build long-term partnerships. Our methodology is designed to ensure your product isn't just successful at launch, but remains scalable for years.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {perks.map((perk, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <perk.icon size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">{perk.title}</h4>
                  <p className="text-slate-500 text-sm">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="card-premium !p-2 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=1000&auto=format&fit=crop" 
                className="w-full rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="Analytics Dashboard" 
              />
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 glass-effect p-8 rounded-3xl animate-float shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">4.9/5</div>
                    <div className="text-xs text-slate-500 uppercase font-black">Average Rating</div>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="Client" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-white">+50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
