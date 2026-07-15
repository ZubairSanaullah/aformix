import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createSchedule,
  getUserSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getScheduleStats,
  completeSchedule,
  getTodaySchedules,
  getUpcomingSchedules,
} from "../controllers/scheduleController.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Schedule CRUD routes
router.post("/", createSchedule);
router.get("/", getUserSchedules);
router.get("/stats", getScheduleStats);
router.get("/today", getTodaySchedules);
router.get("/upcoming", getUpcomingSchedules);
router.get("/:scheduleId", getScheduleById);
router.put("/:scheduleId", updateSchedule);
router.delete("/:scheduleId", deleteSchedule);

// Complete schedule
router.patch("/:scheduleId/complete", completeSchedule);

export default router;
