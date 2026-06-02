import { useEffect } from "react";

const useReveal = (selector = ".reveal", rootMargin = "0px 0px -8% 0px") => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (!elements.length) return;

    // Fallback: if IntersectionObserver is unavailable, reveal everything
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Safety: reveal any elements already in viewport on mount
    requestAnimationFrame(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      });
    });

    return () => observer.disconnect();
  }, [selector, rootMargin]);
};

export default useReveal;
