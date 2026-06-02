import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Divider from "./Divider";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="reveal min-h-screen flex flex-col items-center justify-center pt-32 overflow-hidden relative w-full text-center"
    >
      {/* Aurora Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px] -z-10 animate-glow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] -z-10 animate-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#020617_70%)] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col justify-center items-center">
        <h1 className="heading-2 animate-text mb-10">
          Transforming Ideas
          <br />
          <span className="gradient-text">Into Intelligent Products</span>
        </h1>

        <p className="text-xl md:text-2xl text-white animate-text mb-14 max-w-2xl leading-relaxed">
          Aformix is a modern development company specializing in high-performance web applications, SaaS platforms, and custom digital solutions designed for businesses worldwide.
        </p>

        <div className="flex flex-wrap justify-center gap-6 animate-text mb-20">
          <a href="#contact">
            <button className="btn-primary flex items-center gap-2 group cursor-pointer">
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button></a>
          <button className="btn-outline">Our Methodology</button>
        </div>

        {/* Illustration Canvas / Dummy Picture */}
        <div className="w-full mx-auto rounded-3xl glass-effect p-3 mt-8 sm:mt-12 md:mt-16 relative group overflow-hidden border border-white/10 shadow-2xl animate-text h-[min(68vh,780px)]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10 pointer-events-none rounded-3xl"></div>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
            alt="Illustration Placeholder"
            className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        </div>
      </div>
      <Divider />
    </section>
  );
};

export default Hero;
