import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["task", "meeting", "deadline", "reminder", "event"],
      default: "task",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    duration: {
      // in minutes
      type: Number,
      default: 30,
    },
    recurrence: {
      type: String,
      enum: ["once", "daily", "weekly", "monthly", "yearly"],
      default: "once",
    },
    recurrenceEnd: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    attendees: [
      {
        email: String,
        name: String,
        status: {
          type: String,
          enum: ["pending", "accepted", "declined"],
          default: "pending",
        },
      },
    ],
    reminders: [
      {
        type: String,
        enum: ["at-time", "5-minutes", "15-minutes", "30-minutes", "1-hour", "1-day"],
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    attachments: [
      {
        name: String,
        url: String,
      },
    ],
    notes: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#2894C7",
    },
    completedAt: {
      type: Date,
      default: null,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

scheduleSchema.index({ userId: 1, startTime: 1 });
scheduleSchema.index({ projectId: 1 });
scheduleSchema.index({ status: 1 });

export default mongoose.model("Schedule", scheduleSchema);
