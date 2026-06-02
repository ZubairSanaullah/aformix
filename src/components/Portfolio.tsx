import React, { useState } from "react";
import { projects } from "../constants";
import { ArrowUpRight } from "lucide-react";

const Portfolio: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="works" className="section-padding relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-primary font-black tracking-[0.35em] uppercase mb-4 inline-block">Our Portfolio</span>
          <h2 className="heading-2 mb-6">Recent Work That Drives Results</h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Explore a curated selection of projects built for growth, engagement, and polished digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {visibleProjects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <article
                key={project.id}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-slate-950/40 transition-all duration-500 ${
                  isFeatured ? "md:col-span-2 md:row-span-2 min-h-[560px]" : "min-h-[420px]"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex h-full flex-col justify-end">
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-slate-200 shadow-lg shadow-slate-950/20">
                    {project.category}
                  </div>
                  {isFeatured && (
                    <span className="mb-3 inline-flex text-xs uppercase tracking-[0.4em] text-primary">Featured project</span>
                  )}
                  <h3 className={`font-black text-white leading-tight ${isFeatured ? "text-4xl md:text-[3rem]" : "text-3xl"}`}>
                    {project.title}
                  </h3>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary hover:text-white"
                    >
                      View project
                      <ArrowUpRight size={18} />
                    </a>
                    <span className="text-slate-400 text-sm">
                      {isFeatured ? "Top case study" : "Project preview"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-center">Showing {visibleProjects.length} of {projects.length} projects.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowAllProjects((prev) => !prev)}
          >
            {showAllProjects ? "Show Less Projects" : "View All Projects"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
