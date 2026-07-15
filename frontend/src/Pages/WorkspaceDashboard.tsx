import React, { useState, useEffect } from "react";
import { LayoutGrid, Sparkles, CalendarRange, CheckSquare, BookOpen } from "lucide-react";
import { projectAPI, scheduleAPI } from "../services/api";

interface DashboardStats {
  projects: {
    total: number;
    active: number;
  };
  schedules: {
    total: number;
    pending: number;
  };
  tasks: number;
  meetings: number;
}

const WorkspaceDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    projects: { total: 0, active: 0 },
    schedules: { total: 0, pending: 0 },
    tasks: 0,
    meetings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch project stats
        const projectData = await projectAPI.getAll();
        const projects = projectData.projects || [];
        const activeProjects = projects.filter((p: any) => p.status === "active").length;

        // Fetch schedule stats
        const scheduleData = await scheduleAPI.getAll();
        const schedules = scheduleData.schedules || [];
        const pendingSchedules = schedules.filter((s: any) => s.status === "pending").length;
        const meetings = schedules.filter((s: any) => s.type === "meeting").length;
        const tasks = schedules.filter((s: any) => s.type === "task").length;

        setStats({
          projects: {
            total: projects.length,
            active: activeProjects,
          },
          schedules: {
            total: schedules.length,
            pending: pendingSchedules,
          },
          tasks,
          meetings,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Workspace Home</p>
            <p className="text-sm text-slate-500">Your starting place for the Aformix OS.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-3 text-[#2894C7]">
            <LayoutGrid size={20} />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Projects",
              value: `${stats.projects.active} active`,
              total: stats.projects.total,
              icon: Sparkles,
            },
            {
              label: "Tasks",
              value: `${stats.tasks} pending`,
              total: stats.schedules.total,
              icon: CheckSquare,
            },
            {
              label: "Meetings",
              value: `${stats.meetings} upcoming`,
              total: stats.meetings,
              icon: CalendarRange,
            },
            { label: "Docs", value: "8 bookmarks", icon: BookOpen },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-[#2894C7]">
                  <Icon size={18} />
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                </div>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "📋", label: "New Project", link: "/workspace/projects" },
            { icon: "📅", label: "New Schedule", link: "/workspace/scheduler" },
            { icon: "✓", label: "New Task", link: "/workspace/tasks" },
            { icon: "📝", label: "Take Notes", link: "/workspace/notes" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.link}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-slate-700 text-center">{action.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Stats Overview */}
      {!loading && (
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-2">Project Distribution</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-700">Active Projects</span>
                  <span className="font-semibold text-slate-900">{stats.projects.active}/{stats.projects.total}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${stats.projects.total > 0 ? (stats.projects.active / stats.projects.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Schedule Status</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-700">Pending Tasks</span>
                  <span className="font-semibold text-slate-900">{stats.schedules.pending}/{stats.schedules.total}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{
                      width: `${stats.schedules.total > 0 ? (stats.schedules.pending / stats.schedules.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WorkspaceDashboard;
