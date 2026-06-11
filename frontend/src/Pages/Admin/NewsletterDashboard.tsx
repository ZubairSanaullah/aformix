import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserCheck, FaUserMinus, FaChartLine } from "react-icons/fa";

interface Stats {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribed: number;
  pending: number;
  recentSubscribers: number;
}

const NewsletterDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming auth token is stored here
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/newsletter/admin/stats`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.data);
        } else {
          setError("Failed to fetch dashboard stats.");
        }
      } catch (err) {
        setError("Network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-[var(--color-text)]">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Newsletter Dashboard</h1>
          <p className="text-[var(--color-text-muted)]">Monitor and manage your Aformix Insider Network.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Stat Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[var(--color-text-muted)] font-medium">Total Subscribers</h3>
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <FaUsers />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--color-text)]">{stats?.totalSubscribers}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[var(--color-text-muted)] font-medium">Active</h3>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <FaUserCheck />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--color-text)]">{stats?.activeSubscribers}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[var(--color-text-muted)] font-medium">Unsubscribed</h3>
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <FaUserMinus />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--color-text)]">{stats?.unsubscribed}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[var(--color-text-muted)] font-medium">Last 30 Days</h3>
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                <FaChartLine />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--color-text)]">+{stats?.recentSubscribers}</p>
          </motion.div>
        </div>

        {/* Placeholder for Subscriber List / Campaigns */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Recent Activity</h2>
          <div className="text-center py-12 border-2 border-dashed border-[var(--color-border)] rounded-xl">
            <p className="text-[var(--color-text-muted)] mb-2">More management features coming soon.</p>
            <p className="text-sm text-[var(--color-text-muted)]">Includes subscriber list, campaign sender, and advanced analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDashboard;
