import { motion } from "framer-motion";
import { CalendarDays, Clock3, Plus } from "lucide-react";
import { sampleSchedule } from "./schedulerUtils";

const SchedulerModule: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Scheduler</p>
            <p className="text-sm text-slate-500">Plan your day with time blocks and meetings.</p>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#2894C7] px-4 py-2 text-sm font-semibold text-white">
            <Plus size={14} />
            New block
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 md:col-span-2">
            <div className="flex items-center gap-2 text-[#2894C7]">
              <CalendarDays size={16} />
              <p className="text-sm font-semibold">Today</p>
            </div>

            <div className="mt-4 space-y-3">
              {sampleSchedule.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(item.start).toLocaleString()}</p>
                  </div>
                  <div className="rounded-full bg-slate-50 p-2 text-slate-600">
                    <Clock3 size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#2894C7] via-[#1DB5D8] to-[#5F72C7] p-4 text-white">
              <p className="text-sm font-semibold">Focus timer</p>
              <p className="mt-2 text-xl font-semibold">25:00</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Upcoming</p>
              <p className="mt-2 text-sm text-slate-500">Syncs and reviews for the week.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchedulerModule;
