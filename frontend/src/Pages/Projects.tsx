import React, { useState, useEffect } from "react";
import { Plus, Filter, Trash2, Edit2, ChevronRight } from "lucide-react";
import { projectAPI } from "../services/api";
import "../styles/ProjectsPage.css";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: "active" | "archived" | "completed";
  priority: "low" | "medium" | "high";
  progress: number;
  dueDate: string | null;
  color: string;
  category: string;
  tags: string[];
  createdAt: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: "",
    tags: "",
    budget: "",
    color: "#2894C7",
  });

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const filters: any = {};
        if (filterStatus !== "all") filters.status = filterStatus;
        if (filterPriority !== "all") filters.priority = filterPriority;
        filters.sort = sortBy;

        const data = await projectAPI.getAll(filters);
        setProjects(data.projects || []);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filterStatus, filterPriority, sortBy]);

  // Apply additional filtering on the client side
  useEffect(() => {
    let result = projects;

    result = result.sort((a, b) => {
      if (sortBy === "progress") {
        return b.progress - a.progress;
      } else if (sortBy === "due-date" && a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });

    setFilteredProjects(result);
  }, [projects, sortBy]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        priority: formData.priority,
        category: formData.category,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        tags: formData.tags.split(",").filter((t) => t.trim()),
        budget: formData.budget ? parseInt(formData.budget) : 0,
        color: formData.color,
      };

      if (editingProject) {
        await projectAPI.update(editingProject._id, payload);
      } else {
        await projectAPI.create(payload);
      }

      setFormData({
        name: "",
        description: "",
        priority: "medium",
        category: "",
        dueDate: "",
        tags: "",
        budget: "",
        color: "#2894C7",
      });
      setShowForm(false);
      setEditingProject(null);

      // Refresh projects
      const data = await projectAPI.getAll();
      setProjects(data.projects || []);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Handle edit
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      priority: project.priority,
      category: project.category,
      dueDate: project.dueDate ? new Date(project.dueDate).toISOString().split("T")[0] : "",
      tags: project.tags.join(", "),
      budget: project.budget.toString(),
      color: project.color,
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await projectAPI.delete(projectId);
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      name: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: "",
      tags: "",
      budget: "",
      color: "#2894C7",
    });
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: "text-red-600 bg-red-50",
      medium: "text-yellow-600 bg-yellow-50",
      low: "text-green-600 bg-green-50",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-blue-500",
      completed: "bg-green-500",
      archived: "bg-gray-400",
    };
    return colors[status] || colors.active;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">Manage all your projects in one place</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#2894C7] text-white px-6 py-3 rounded-lg hover:bg-[#1f6fa3] transition"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} />
          <h3 className="font-semibold text-slate-900">Filters & Sort</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
            <option value="due-date">Due Date</option>
            <option value="progress">Progress</option>
          </select>

          <div className="text-sm text-slate-600 flex items-center justify-center">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Projects list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2894C7]"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600 text-lg">No projects found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition"
              style={{ borderTopColor: project.color, borderTopWidth: "4px" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">{project.name}</h3>
                  {project.category && (
                    <p className="text-sm text-slate-500">{project.category}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit2 size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              {project.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(
                    project.priority
                  )}`}
                >
                  {project.priority.toUpperCase()}
                </span>
                <span className="text-xs px-2 py-1 rounded-full text-white" style={{ backgroundColor: getStatusColor(project.status) }}>
                  {project.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-600">Progress</span>
                  <span className="text-xs font-semibold text-slate-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-[#2894C7] h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
                {project.dueDate && (
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                )}
                <button className="flex items-center gap-1 text-[#2894C7] hover:font-semibold transition">
                  View <ChevronRight size={14} />
                </button>
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
              {editingProject ? "Edit Project" : "Create New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  placeholder="Enter project name"
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
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                    placeholder="e.g., Design, Development"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Budget
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2894C7]"
                    placeholder="0"
                  />
                </div>
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
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
