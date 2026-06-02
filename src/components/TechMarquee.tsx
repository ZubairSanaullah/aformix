import React from "react";
import { techStack } from "../constants";
import Divider from "./Divider";

const logoMap: Record<string, string> = {
  "HTML5": "html5",
  "CSS3": "css3",
  "JavaScript": "javascript",
  "React JS": "react",
  "TypeScript": "typescript",
  "GSAP": "greensock",
  "TailwindCSS": "tailwindcss",
  "Node.js": "nodedotjs",
  "Express": "express",
  "MongoDB": "mongodb",
  "WordPress": "wordpress",
  "Next.js": "nextdotjs",
  "Framer Motion": "framer",
  "Redux": "redux",
  "PostgreSQL": "postgresql",
};

const TechMarquee: React.FC = () => {
  return (
    <section className="reveal py-20 bg-slate-950 border-y border-white/5 overflow-hidden relative">
      <h1 className="heading-2 primary mb-10">
        Our Tech Stack
      </h1>
      {/* <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div> */}
      <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 items-center">
        {[...techStack, ...techStack, ...techStack].map((tech, index) => {
          const logoSlug = logoMap[tech];
          return (
            <div
              key={index}
              className="flex items-center justify-center group cursor-default select-none opacity-50 hover:opacity-100 transition-opacity duration-500 min-w-[80px]"
              title={tech}
            >
              {logoSlug ? (
                <img
                  src={`https://cdn.simpleicons.org/${logoSlug}/white`}
                  alt={`${tech} logo`}
                  className="h-12 w-12 md:h-16 md:w-16 object-contain group-hover:scale-110 transition-all duration-500"
                />
              ) : (
                <span className="text-2xl md:text-4xl font-black text-slate-500 group-hover:text-white transition-colors">{tech}</span>
              )}
            </div>
          );
        })}
      </div>
      <Divider />
    </section>
  );
};

export default TechMarquee;
