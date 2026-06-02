import React, { useState } from "react";
import { projects } from "../constants";
import { ArrowUpRight } from "lucide-react";

const Portfolio: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <section id="works" className="section-padding bg-slate-950/30 relative w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center mb-24 text-center">
          <span className="text-primary font-black tracking-widest uppercase mb-4 block">Our Portfolio</span>
          <h2 className="heading-2 mb-6">Selected Case Studies</h2>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed mb-6">
            Explore our portfolio of high-impact digital products built with precision, performance, and user-centric design at the core.
          </p>
          <button
            type="button"
            className="btn-outline"
            onClick={() => setShowAllProjects((prev) => !prev)}
          >
            {showAllProjects ? "Show Less Projects" : "View All Projects"}
          </button>
          <p className="text-slate-500 text-sm mt-4">
            Showing {visibleProjects.length} of {projects.length} projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5 h-[500px] md:h-[600px] shadow-2xl"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              
              <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="max-w-[70%]">
                    <div className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                      {project.category}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-15 h-15 rounded-[2rem] bg-white text-slate-950 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl group/btn"
                  >
                    <ArrowUpRight size={20} className="group-hover/btn:rotate-45 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
