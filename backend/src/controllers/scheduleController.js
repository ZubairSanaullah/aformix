import Schedule from "../models/Schedule.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";

// Create a new schedule/task
export const createSchedule = async (req, res, next) => {
  try {
    const {
      title,
      description,
      type,
      priority,
      startTime,
      endTime,
      projectId,
      location,
      attendees,
      reminders,
      tags,
      color,
      recurrence,
      recurrenceEnd,
    } = req.body;
    const userId = req.user.id;

    if (!title || title.trim().length === 0) {
      res.status(400);
      throw new Error("Schedule title is required.");
    }

    if (!startTime || !endTime) {
      res.status(400);
      throw new Error("Start time and end time are required.");
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      res.status(400);
      throw new Error("End time must be after start time.");
    }

    // Verify project exists if provided
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      const project = await Project.findOne({ _id: projectId, userId });
      if (!project) {
        res.status(404);
        throw new Error("Project not found.");
      }
    }

    const duration = Math.round((end - start) / (1000 * 60));

    const schedule = await Schedule.create({
      userId,
      projectId: projectId && mongoose.Types.ObjectId.isValid(projectId) ? projectId : null,
      title: title.trim(),
      description: description?.trim() || "",
      type: type || "task",
      priority: priority || "medium",
      startTime: start,
      endTime: end,
      duration,
      recurrence: recurrence || "once",
      recurrenceEnd: recurrenceEnd ? new Date(recurrenceEnd) : null,
      location: location?.trim() || "",
      attendees: attendees || [],
      reminders: reminders || [],
      tags: tags || [],
      color: color || "#2894C7",
    });

    res.status(201).json({
      message: "Schedule created successfully.",
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

// Get all schedules for a user
export const getUserSchedules = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status, priority, type, projectId, startDate, endDate, sort } = req.query;

    const filter = { userId };

    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (type) {
      filter.type = type;
    }
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      filter.projectId = projectId;
    }

    if (startDate || endDate) {
      filter.startTime = {};
      if (startDate) {
        filter.startTime.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.startTime.$lte = new Date(endDate);
      }
    }

    let query = Schedule.find(filter).populate("projectId", "name color");

    if (sort === "earliest") {
      query = query.sort({ startTime: 1 });
    } else if (sort === "latest") {
      query = query.sort({ startTime: -1 });
    } else if (sort === "priority") {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      query = query.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      query = query.sort({ startTime: 1 }); // default: earliest first
    }

    const schedules = await query;

    res.status(200).json({
      message: "Schedules retrieved successfully.",
      count: schedules.length,
      schedules,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single schedule by ID
export const getScheduleById = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
      res.status(400);
      throw new Error("Invalid schedule ID.");
    }

    const schedule = await Schedule.findOne({ _id: scheduleId, userId }).populate(
      "projectId",
      "name color"
    );

    if (!schedule) {
      res.status(404);
      throw new Error("Schedule not found.");
    }

    res.status(200).json({
      message: "Schedule retrieved successfully.",
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

// Update a schedule
export const updateSchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
      res.status(400);
      throw new Error("Invalid schedule ID.");
    }

    const allowedUpdates = [
      "title",
      "description",
      "status",
      "type",
      "priority",
      "startTime",
      "endTime",
      "location",
      "attendees",
      "reminders",
      "tags",
      "color",
      "notes",
      "recurrence",
      "recurrenceEnd",
      "completedAt",
    ];

    const updateData = {};
    allowedUpdates.forEach((field) => {
      if (field in updates) {
        if (
          field === "startTime" ||
          field === "endTime" ||
          field === "recurrenceEnd" ||
          field === "completedAt"
        ) {
          updateData[field] = updates[field] ? new Date(updates[field]) : null;
        } else if (
          field === "attendees" ||
          field === "reminders" ||
          field === "tags"
        ) {
          updateData[field] = Array.isArray(updates[field]) ? updates[field] : [];
        } else if (typeof updates[field] === "string") {
          updateData[field] = updates[field].trim();
        } else {
          updateData[field] = updates[field];
        }
      }
    });

    // If updating times, recalculate duration
    if (updateData.startTime && updateData.endTime) {
      const duration = Math.round(
        (new Date(updateData.endTime) - new Date(updateData.startTime)) /
          (1000 * 60)
      );
      updateData.duration = duration;
    }

    const schedule = await Schedule.findOneAndUpdate(
      { _id: scheduleId, userId },
      updateData,
      { new: true, runValidators: true }
    ).populate("projectId", "name color");

    if (!schedule) {
      res.status(404);
      throw new Error("Schedule not found.");
    }

    res.status(200).json({
      message: "Schedule updated successfully.",
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a schedule
export const deleteSchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
      res.status(400);
      throw new Error("Invalid schedule ID.");
    }

    const schedule = await Schedule.findOneAndDelete({ _id: scheduleId, userId });

    if (!schedule) {
      res.status(404);
      throw new Error("Schedule not found.");
    }

    res.status(200).json({
      message: "Schedule deleted successfully.",
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

// Get schedule statistics
export const getScheduleStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const stats = await Schedule.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
          "in-progress": {
            $sum: {
              $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
            },
          },
          byType: {
            $push: {
              type: "$type",
              count: 1,
            },
          },
        },
      },
    ]);

    res.status(200).json({
      message: "Schedule statistics retrieved successfully.",
      stats: stats[0] || {
        total: 0,
        pending: 0,
        "in-progress": 0,
        completed: 0,
        cancelled: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Complete a schedule
export const completeSchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
      res.status(400);
      throw new Error("Invalid schedule ID.");
    }

    const schedule = await Schedule.findOneAndUpdate(
      { _id: scheduleId, userId },
      {
        status: "completed",
        completedAt: new Date(),
      },
      { new: true }
    ).populate("projectId", "name color");

    if (!schedule) {
      res.status(404);
      throw new Error("Schedule not found.");
    }

    res.status(200).json({
      message: "Schedule marked as completed.",
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

// Get today's schedules
export const getTodaySchedules = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const schedules = await Schedule.find({
      userId,
      startTime: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .sort({ startTime: 1 })
      .populate("projectId", "name color");

    res.status(200).json({
      message: "Today's schedules retrieved successfully.",
      count: schedules.length,
      schedules,
    });
  } catch (error) {
    next(error);
  }
};

// Get upcoming schedules
export const getUpcomingSchedules = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { days } = req.query;
    const daysToShow = parseInt(days) || 7;

    const now = new Date();
    const future = new Date(now);
    future.setDate(future.getDate() + daysToShow);

    const schedules = await Schedule.find({
      userId,
      startTime: {
        $gte: now,
        $lt: future,
      },
      status: { $in: ["pending", "in-progress"] },
    })
      .sort({ startTime: 1 })
      .populate("projectId", "name color")
      .limit(50);

    res.status(200).json({
      message: "Upcoming schedules retrieved successfully.",
      count: schedules.length,
      schedules,
    });
  } catch (error) {
    next(error);
  }
};
