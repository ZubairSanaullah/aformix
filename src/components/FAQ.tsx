import React, { useEffect, useRef, useState } from "react";
import { faqs } from "../constants";
import { ChevronDown } from "lucide-react";import Divider from "./Divider";
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(faqs.length).fill(false));
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => {
              if (prev[index]) return prev;
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" className="section-padding bg-slate-950/80 w-full">
      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 relative z-10">
          <h2 className="heading-2">Got Questions?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Transparent answers to help you navigate our process, timelines, and post-launch capabilities.
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isVisible = visibleItems[index];
            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-slate-950/30 transition-all duration-700 ease-out transform-gpu ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } hover:-translate-y-1 hover:shadow-[0_28px_90px_-50px_rgba(56,189,248,0.65)]`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="absolute inset-x-8 top-0 h-1 rounded-full" />
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative w-full px-8 md:px-10 py-8 flex items-center justify-between text-left"
                >
                  <span className={`text-xl md:text-2xl font-semibold transition-colors ${
                    isOpen ? "text-white" : "text-slate-200 group-hover:text-white"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "bg-cyan-500 text-slate-950 rotate-180 shadow-lg shadow-cyan-500/30" : "bg-slate-900 text-slate-400"
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-8 md:px-10 pb-10 pt-6 text-slate-300 text-lg leading-relaxed border-t border-white/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Divider /> */}
    </section>
  );
};

export default FAQ;
