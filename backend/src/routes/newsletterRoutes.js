import express from "express";
import {
  subscribe,
  verifyEmail,
  unsubscribe,
  getAdminStats,
  getSubscribers
} from "../controllers/newsletterController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
// Using rate limiting for security against bots
import rateLimit from "express-rate-limit";

const router = express.Router();

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 subscription requests per windowMs
  message: { success: false, message: "Too many subscription requests from this IP, please try again after 15 minutes" }
});

router.post("/subscribe", subscribeLimiter, subscribe);
router.get("/verify/:token", verifyEmail);
router.post("/unsubscribe", unsubscribe);

// Admin routes
router.get("/admin/stats", authMiddleware, getAdminStats);
router.get("/admin/subscribers", authMiddleware, getSubscribers);

export default router;
