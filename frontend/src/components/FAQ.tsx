import React, { useEffect, useRef, useState } from "react";
import { faqs } from "../constants";
import { ChevronDown } from "lucide-react";

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
    <section id="faq" className="reveal section-padding w-full">
      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 relative z-10">
          <h2 className="heading-2">Got Questions?</h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
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
                className={`group relative overflow-hidden rounded-[2rem] border border-[var(--color-glass-border)] glass-effect shadow-xl transition-all duration-700 ease-out transform-gpu ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } hover:-translate-y-1`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="absolute inset-x-8 top-0 h-1 rounded-full" />
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="relative w-full px-8 md:px-10 py-8 flex items-center justify-between text-left"
                >
                  <span className={`text-xl md:text-2xl font-semibold transition-colors ${
                    isOpen ? "text-[var(--color-text)]" : "text-[var(--color-text)] group-hover:text-[var(--color-text)]"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen ? "bg-primary text-white rotate-180 shadow-lg shadow-primary/30" : "glass-effect text-[var(--color-text-muted)]"
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-8 md:px-10 pb-10 pt-6 text-[var(--color-text-muted)] text-lg leading-relaxed border-t border-[var(--color-glass-border)]">
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
