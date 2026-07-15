import React, { useState, useEffect } from "react";
import { Plus, Filter, Trash2, Edit2, CheckCircle2, Clock, MapPin, Users } from "lucide-react";
import { scheduleAPI } from "../services/api";
import "../styles/SchedulesPage.css";

interface Schedule {
  _id: string;
  title: string;
  description: string;
  type: "task" | "meeting" | "deadline" | "reminder" | "event";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: Array<{ email: string; name: string }>;
  tags: string[];
  color: string;
  projectId?: string;
  notes?: string;
  createdAt: string;
}

const SchedulesPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("earliest");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "task",
    priority: "medium",
    startTime: "",
    endTime: "",
    location: "",
    tags: "",
    color: "#2894C7",
    notes: "",
    attendees: "",
  });

  // Fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const filters: any = {};
        if (filterStatus !== "all") filters.status = filterStatus;
        if (filterType !== "all") filters.type = filterType;
        if (filterPriority !== "all") filters.priority = filterPriority;
        filters.sort = sortBy;

        const data = await scheduleAPI.getAll(filters);
        setSchedules(data.schedules || []);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [filterStatus, filterType, filterPriority, sortBy]);

  useEffect(() => {
    setFilteredSchedules(schedules);
  }, [schedules]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const attendeeList = formData.attendees
        .split(",")
        .map((email) => ({ email: email.trim(), name: email.trim(), status: "pending" }))
        .filter((a) => a.email.includes("@"));

      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        priority: formData.priority,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        location: formData.location,
        tags: formData.tags.split(",").filter((t) => t.trim()),
        color: formData.color,
        notes: formData.notes,
        attendees: attendeeList,
      };

      if (editingSchedule) {
        await scheduleAPI.update(editingSchedule._id, payload);
      } else {
        await scheduleAPI.create(payload);
      }

      setFormData({
        title: "",
        description: "",
        type: "task",
        priority: "medium",
        startTime: "",
        endTime: "",
        location: "",
        tags: "",
        color: "#2894C7",
        notes: "",
        attendees: "",
      });
      setShowForm(false);
      setEditingSchedule(null);

      // Refresh schedules
      const data = await scheduleAPI.getAll();
      setSchedules(data.schedules || []);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Handle edit
  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      title: schedule.title,
      description: schedule.description,
      type: schedule.type,
      priority: schedule.priority,
      startTime: new Date(schedule.startTime).toISOString().slice(0, 16),
      endTime: new Date(schedule.endTime).toISOString().slice(0, 16),
      location: schedule.location || "",
      tags: schedule.tags.join(", "),
      color: schedule.color,
      notes: schedule.notes || "",
      attendees: schedule.attendees?.map((a) => a.email).join(", ") || "",
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;

    try {
      await scheduleAPI.delete(scheduleId);
      setSchedules(schedules.filter((s) => s._id !== scheduleId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Handle complete
  const handleComplete = async (scheduleId: string) => {
    try {
      await scheduleAPI.complete(scheduleId);
      const data = await scheduleAPI.getAll();
      setSchedules(data.schedules || []);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSchedule(null);
    setFormData({
      title: "",
      description: "",
      type: "task",
      priority: "medium",
      startTime: "",
      endTime: "",
      location: "",
      tags: "",
      color: "#2894C7",
      notes: "",
      attendees: "",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      task: "📋",
      meeting: "👥",
      deadline: "⏰",
      reminder: "🔔",
      event: "📅",
    };
    return icons[type] || "📋";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: "text-red-600 bg-red-50 border-red-200",
      high: "text-orange-600 bg-orange-50 border-orange-200",
      medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
      low: "text-green-600 bg-green-50 border-green-200",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-slate-400",
      "in-progress": "bg-blue-500",
      completed: "bg-green-500",
      cancelled: "bg-red-400",
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Schedules & Tasks</h1>
          <p className="text-slate-600 mt-1">Manage your time and tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#2894C7] text-white px-6 py-3 rounded-lg hover:bg-[#1f6fa3] transition"
        >
          <Plus size={20} />
          New Schedule
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} />
          <h3 className="font-semibold text-slate-900">Filters & Sort</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="all">All Types</option>
            <option value="task">Task</option>
            <option value="meeting">Meeting</option>
            <option value="deadline">Deadline</option>
            <option value="reminder">Reminder</option>
            <option value="event">Event</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="earliest">Earliest</option>
            <option value="latest">Latest</option>
            <option value="priority">Priority</option>
          </select>

          <div className="text-sm text-slate-600 flex items-center justify-center">
            {filteredSchedules.length} item{filteredSchedules.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Schedules list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2894C7]"></div>
        </div>
      ) : filteredSchedules.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600 text-lg">No schedules found. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSchedules.map((schedule) => (
            <div
              key={schedule._id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition"
              style={{ borderLeftColor: schedule.color, borderLeftWidth: "4px" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(schedule.type)}</span>
                    <h3 className="font-semibold text-slate-900 text-lg">{schedule.title}</h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: getStatusColor(schedule.status) }}
                    >
                      {schedule.status}
                    </span>
                  </div>

                  {schedule.description && (
                    <p className="text-sm text-slate-600 mb-3">{schedule.description}</p>
                  )}

                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDateTime(schedule.startTime)}
                    </div>
                    {schedule.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {schedule.location}
                      </div>
                    )}
                    {schedule.attendees && schedule.attendees.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {schedule.attendees.length} attendee{schedule.attendees.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full border ${getPriorityColor(
                        schedule.priority
                      )}`}
                    >
                      {schedule.priority.toUpperCase()}
                    </span>
                    {schedule.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {schedule.status !== "completed" && schedule.status !== "cancelled" && (
                    <button
                      onClick={() => handleComplete(schedule._id)}
                      className="p-2 hover:bg-green-50 rounded-lg transition"
                      title="Mark as completed"
                    >
                      <CheckCircle2 size={16} className="text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(schedule._id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingSchedule ? "Edit Schedule" : "Create New Schedule"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="Enter schedule title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="Enter schedule description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  >
                    <option value="task">Task</option>
                    <option value="meeting">Meeting</option>
                    <option value="deadline">Deadline</option>
                    <option value="reminder">Reminder</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="e.g., Conference Room A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Attendees (comma-separated emails)
                </label>
                <input
                  type="text"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="email1@example.com, email2@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="Additional notes"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-10 w-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                    placeholder="#2894C7"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2894C7] text-white rounded-lg hover:bg-[#1f6fa3] transition"
                >
                  {editingSchedule ? "Update Schedule" : "Create Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulesPage;
