import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarRange,
  Clock3,
  Command,
  Compass,
  CreditCard,
  FolderOpen,
  LayoutGrid,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { activityFeed, priorities, stats, workspaceModules } from "../constants/workspace";
import ProjectsModule from "../features/projects/ProjectsModule";
import SchedulerModule from "../features/scheduler/SchedulerModule";
import NotesModule from "../features/notes/NotesModule";
import TasksModule from "../features/tasks/TasksModule";
import CRMModule from "../features/crm/CRMModule";
import ContentPlannerModule from "../features/content/ContentPlannerModule";

const InternalWorkspace: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8">
        <header className="rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#2894C7]">Aformix OS</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">Private command center</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <Command size={16} />
                Quick actions
              </button>
              <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <Search size={16} />
                Search everything
              </button>
              <button className="rounded-full bg-[#2894C7] p-2.5 text-white shadow-[0_8px_24px_rgba(40,148,199,0.24)]">
                <Bell size={16} />
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur">
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <div className="rounded-2xl bg-[#2894C7]/10 p-2 text-[#2894C7]">
                <LayoutGrid size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Orbit Workspace</p>
                <p className="text-xs text-slate-500">Private operating system</p>
              </div>
            </div>
            <nav className="space-y-1">
              {workspaceModules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${module.active ? "bg-[#2894C7] text-white shadow-[0_10px_24px_rgba(40,148,199,0.2)]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                  >
                    <Icon size={16} />
                    {module.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="space-y-6">
            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[28px] border border-slate-200 bg-linear-to-br from-[#2894C7] via-[#1DB5D8] to-[#5F72C7] p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/80">Today’s focus</p>
                    <h2 className="mt-2 text-3xl font-semibold">Build the premium internal workspace.</h2>
                  </div>
                  <div className="rounded-3xl border border-white/30 bg-white/15 p-3">
                    <Sparkles size={22} />
                  </div>
                </div>
                <p className="mt-4 max-w-xl text-sm text-white/80">
                  Everything is connected from projects and clients to finance, content, SEO, and daily execution.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2894C7]">
                    Open dashboard
                  </button>
                  <button className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white">
                    Create new project
                  </button>
                </div>
              </motion.div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Today’s schedule</p>
                    <p className="text-sm text-slate-500">A calm and structured day.</p>
                  </div>
                  <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                    <CalendarRange size={18} />
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { time: "09:30", title: "Client strategy sync" },
                    { time: "12:00", title: "Content workflow review" },
                    { time: "16:00", title: "Finance planning" },
                  ].map((item) => (
                    <div key={item.time} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                      <div className="rounded-full bg-white p-2 text-slate-500">
                        <Clock3 size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Today’s priorities</p>
                      <p className="text-sm text-slate-500">Momentum is building.</p>
                    </div>
                    <div className="rounded-full bg-[#2894C7]/10 p-2 text-[#2894C7]">
                      <TargetIcon />
                    </div>
                  </div>
                  <div className="mt-5 space-y-4">
                    {priorities.map((item) => (
                      <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <span className="text-xs text-slate-500">{item.pct}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-[#2894C7]" style={{ width: `${item.pct}%` }} />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{item.due}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Performance snapshot</p>
                      <p className="text-sm text-slate-500">Weekly momentum.</p>
                    </div>
                    <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
                        <p className="mt-1 text-xl font-semibold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.hint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Recent activity</p>
                    <p className="text-sm text-slate-500">Your operating rhythm.</p>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-semibold text-[#2894C7]">
                    View all <ArrowRight size={16} />
                  </button>
                </div>
                <div className="mt-5 space-y-3">
                  {activityFeed.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="rounded-2xl bg-[#2894C7]/10 p-2 text-[#2894C7]">
                        <Compass size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.detail}</p>
                      </div>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Finance pulse</p>
                      <p className="text-sm text-slate-500">Healthy cashflow.</p>
                    </div>
                    <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                      <CreditCard size={16} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-semibold text-slate-900">$18.4k</p>
                      <p className="text-sm text-slate-500">Outstanding invoices</p>
                    </div>
                    <div className="rounded-full bg-[#2894C7] px-3 py-1 text-sm font-semibold text-white">
                      +12.4%
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ProjectsModule />
            <SchedulerModule />
            <NotesModule />
            <TasksModule />
            <CRMModule />
            <ContentPlannerModule />

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Launch sequence</p>
                  <p className="text-sm text-slate-500">Next milestones for the private workspace.</p>
                </div>
                <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                  <FolderOpen size={16} />
                  Open module map
                </button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Module architecture", text: "Core shell, navigation, and data model." },
                  { title: "Experience design", text: "Premium layout, motion, and interaction system." },
                  { title: "Feature rollout", text: "Projects, tasks, notes, finance, and CRM." },
                ].map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                    <p className="mt-2 text-sm text-slate-500">{card.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

const TargetIcon = () => <Zap size={18} />;

export default InternalWorkspace;
