import React, { useState } from "react";
import { faqs } from "../constants";
import { ChevronDown, Sparkles } from "lucide-react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-slate-950/50 w-full">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>Information Hub</span>
          </div>
          <h2 className="heading-2">Got Questions?</h2>
          <p className="text-slate-500 text-lg">Transparent answers to help you navigate our process and technology.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group rounded-[2rem] transition-all duration-500 border ${
                  isOpen ? "bg-slate-900 border-primary/30 shadow-2xl" : "bg-slate-950/30 border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left"
                >
                  <span className={`text-xl font-bold transition-colors ${isOpen ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "bg-primary text-white rotate-180" : "bg-slate-900 text-slate-500"
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-10 pb-10 text-slate-400 text-lg leading-relaxed border-t border-white/5 pt-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
