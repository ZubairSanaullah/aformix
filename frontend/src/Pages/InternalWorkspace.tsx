import {
  Bell,
  Command,
  LayoutGrid,
  Search,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { workspaceModules } from "../constants/workspace";

const InternalWorkspace: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-28 md:pt-32">
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
                  <NavLink
                    key={module.id}
                    to={module.path}
                    end
                    className={({ isActive }) =>
                      `flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${isActive ? "bg-[#2894C7] text-white shadow-[0_10px_24px_rgba(40,148,199,0.2)]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`
                    }
                  >
                    <Icon size={16} />
                    {module.label}
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          <main className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InternalWorkspace;
