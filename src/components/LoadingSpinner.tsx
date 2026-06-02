import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Divider from "./Divider";

const LoadingSpinner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(logoRef.current, {
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary"
    >
      <div className="flex flex-col items-center">
        <div
          ref={logoRef}
          className="text-4xl font-bold text-accent mb-4"
        >
          AFORMIX
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-accent animate-progress"></div>
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }
      `}</style>
      <Divider />
    </div>
  );
};

export default LoadingSpinner;
