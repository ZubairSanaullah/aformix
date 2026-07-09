import { motion } from "framer-motion";
import { FolderKanban, Plus, Sparkles, Target, TrendingUp } from "lucide-react";
import { sortProjectsByPriority } from "./projectUtils";
import type { ProjectItem } from "./projectUtils";

const projects: ProjectItem[] = [
  {
    id: "orbit",
    title: "Orbit onboarding",
    priority: "Critical",
    progress: 82,
    owner: "You",
    due: "Today",
  },
  {
    id: "growth",
    title: "Growth website sprint",
    priority: "High",
    progress: 64,
    owner: "Mina",
    due: "Tomorrow",
  },
  {
    id: "crm",
    title: "Client CRM refresh",
    priority: "Medium",
    progress: 41,
    owner: "Isaac",
    due: "Next week",
  },
];

const ProjectsModule: React.FC = () => {
  const orderedProjects = sortProjectsByPriority(projects);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Projects</p>
            <p className="text-sm text-slate-500">Prioritized work across the Aformix ecosystem.</p>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#2894C7] px-4 py-2 text-sm font-semibold text-white">
            <Plus size={16} />
            New project
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-[#2894C7]">
              <FolderKanban size={16} />
              <p className="text-sm font-semibold">Pipeline overview</p>
            </div>
            <div className="mt-4 space-y-3">
              {orderedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-slate-200 bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{project.title}</p>
                      <p className="mt-1 text-xs text-slate-500">Owner · {project.owner}</p>
                    </div>
                    <span className="rounded-full bg-[#2894C7]/10 px-2.5 py-1 text-xs font-semibold text-[#2894C7]">
                      {project.priority}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-[#2894C7]" style={{ width: `${project.progress}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{project.due}</span>
                    <span>{project.progress}% complete</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-[#2894C7] via-[#1DB5D8] to-[#5F72C7] p-4 text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <p className="text-sm font-semibold">Momentum</p>
              </div>
              <p className="mt-4 text-3xl font-semibold">3 active projects</p>
              <p className="mt-2 text-sm text-white/80">You are pacing well across delivery and growth work.</p>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp size={16} />
                <p className="text-sm font-semibold text-slate-900">Weekly success</p>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="rounded-2xl bg-emerald-50 p-2 text-emerald-600">
                  <Target size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">2 milestones this week</p>
                  <p className="text-xs text-slate-500">One launch, one client review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsModule;
