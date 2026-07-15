import Project from "../models/Project.js";
import Schedule from "../models/Schedule.js";
import mongoose from "mongoose";

// Create a new project
export const createProject = async (req, res, next) => {
  try {
    const { name, description, priority, category, dueDate, tags, budget, color } = req.body;
    const userId = req.user.id;

    if (!name || name.trim().length === 0) {
      res.status(400);
      throw new Error("Project name is required.");
    }

    const project = await Project.create({
      userId,
      name: name.trim(),
      description: description?.trim() || "",
      priority: priority || "medium",
      category: category?.trim() || "",
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags || [],
      budget: budget || 0,
      color: color || "#2894C7",
    });

    res.status(201).json({
      message: "Project created successfully.",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Get all projects for a user
export const getUserProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status, priority, sort } = req.query;

    const filter = { userId };

    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }

    let query = Project.find(filter);

    if (sort === "recent") {
      query = query.sort({ createdAt: -1 });
    } else if (sort === "oldest") {
      query = query.sort({ createdAt: 1 });
    } else if (sort === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      query = query.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === "due-date") {
      query = query.sort({ dueDate: 1 });
    }

    const projects = await query;

    res.status(200).json({
      message: "Projects retrieved successfully.",
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400);
      throw new Error("Invalid project ID.");
    }

    const project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    // Get associated schedules
    const schedules = await Schedule.find({ projectId });

    res.status(200).json({
      message: "Project retrieved successfully.",
      project,
      schedules,
    });
  } catch (error) {
    next(error);
  }
};

// Update a project
export const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400);
      throw new Error("Invalid project ID.");
    }

    // Allowed fields to update
    const allowedUpdates = [
      "name",
      "description",
      "status",
      "priority",
      "category",
      "dueDate",
      "tags",
      "budget",
      "progress",
      "color",
      "completedDate",
    ];

    const updateData = {};
    allowedUpdates.forEach((field) => {
      if (field in updates) {
        if (field === "tags" && Array.isArray(updates[field])) {
          updateData[field] = updates[field];
        } else if (field === "dueDate" || field === "completedDate") {
          updateData[field] = updates[field] ? new Date(updates[field]) : null;
        } else if (typeof updates[field] === "string") {
          updateData[field] = updates[field].trim();
        } else {
          updateData[field] = updates[field];
        }
      }
    });

    const project = await Project.findOneAndUpdate(
      { _id: projectId, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    res.status(200).json({
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a project
export const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400);
      throw new Error("Invalid project ID.");
    }

    const project = await Project.findOneAndDelete({ _id: projectId, userId });

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    // Also delete associated schedules
    await Schedule.deleteMany({ projectId });

    res.status(200).json({
      message: "Project deleted successfully.",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Get project statistics
export const getProjectStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const stats = await Project.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          archived: {
            $sum: {
              $cond: [{ $eq: ["$status", "archived"] }, 1, 0],
            },
          },
          avgProgress: { $avg: "$progress" },
          totalBudget: { $sum: "$budget" },
        },
      },
    ]);

    res.status(200).json({
      message: "Project statistics retrieved successfully.",
      stats: stats[0] || {
        total: 0,
        active: 0,
        completed: 0,
        archived: 0,
        avgProgress: 0,
        totalBudget: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Add collaborator to project
export const addCollaborator = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { email } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400);
      throw new Error("Invalid project ID.");
    }

    if (!email || !email.includes("@")) {
      res.status(400);
      throw new Error("Valid email is required.");
    }

    const project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    // In a real app, you'd fetch the user by email from the database
    // For now, we'll just add the email
    const User = mongoose.model("User");
    const collaborator = await User.findOne({ email });

    if (!collaborator) {
      res.status(404);
      throw new Error("User with this email not found.");
    }

    if (project.collaborators.includes(collaborator._id)) {
      res.status(400);
      throw new Error("User is already a collaborator on this project.");
    }

    project.collaborators.push(collaborator._id);
    await project.save();

    res.status(200).json({
      message: "Collaborator added successfully.",
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Remove collaborator from project
export const removeCollaborator = async (req, res, next) => {
  try {
    const { projectId, collaboratorId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(collaboratorId)) {
      res.status(400);
      throw new Error("Invalid project or collaborator ID.");
    }

    const project = await Project.findOne({ _id: projectId, userId });

    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    project.collaborators = project.collaborators.filter(
      (id) => id.toString() !== collaboratorId
    );
    await project.save();

    res.status(200).json({
      message: "Collaborator removed successfully.",
      project,
    });
  } catch (error) {
    next(error);
  }
};
