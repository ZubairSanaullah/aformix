import crypto from "crypto";
import Subscriber from "../models/Subscriber.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../services/emailService.js";

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Check if subscriber exists
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      if (subscriber.status === "subscribed") {
        return res.status(400).json({ success: false, message: "Email is already subscribed" });
      }
      if (subscriber.status === "pending") {
        // Resend verification
        const sent = await sendVerificationEmail(subscriber.email, subscriber.verificationToken);
        if (sent) {
            return res.status(200).json({ success: true, message: "Verification email resent. Please check your inbox." });
        }
        return res.status(500).json({ success: false, message: "Failed to send verification email" });
      }
      if (subscriber.status === "unsubscribed") {
        // Resubscribe flow
        subscriber.status = "pending";
        subscriber.verificationToken = crypto.randomBytes(32).toString("hex");
        subscriber.unsubscribeToken = crypto.randomBytes(32).toString("hex");
        await subscriber.save();

        await sendVerificationEmail(subscriber.email, subscriber.verificationToken);
        return res.status(200).json({ success: true, message: "Welcome back! Please check your email to verify your subscription." });
      }
    }

    // New subscriber
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const unsubscribeToken = crypto.randomBytes(32).toString("hex");

    subscriber = await Subscriber.create({
      email,
      source: source || "footer",
      verificationToken,
      unsubscribeToken,
    });

    await sendVerificationEmail(subscriber.email, subscriber.verificationToken);

    res.status(201).json({ success: true, message: "Successfully subscribed. Please check your email to verify." });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Verify email
// @route   GET /api/newsletter/verify/:token
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const subscriber = await Subscriber.findOne({ verificationToken: token });

    if (!subscriber) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification token" });
    }

    if (subscriber.status === "subscribed") {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}?verified=already`);
    }

    subscriber.status = "subscribed";
    subscriber.subscribedAt = Date.now();
    subscriber.verificationToken = undefined; // Clear token after use
    await subscriber.save();

    // Send welcome email after verification
    await sendWelcomeEmail(subscriber.email, subscriber.unsubscribeToken);

    // Redirect to frontend with success param
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}?verified=true`);
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribe = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "Unsubscribe token is required" });
    }

    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });

    if (!subscriber) {
      return res.status(400).json({ success: false, message: "Invalid unsubscribe token" });
    }

    if (subscriber.status === "unsubscribed") {
      return res.status(400).json({ success: false, message: "Already unsubscribed" });
    }

    subscriber.status = "unsubscribed";
    subscriber.unsubscribedAt = Date.now();
    await subscriber.save();

    res.status(200).json({ success: true, message: "Successfully unsubscribed" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get newsletter stats
// @route   GET /api/newsletter/admin/stats
// @access  Private (Admin)
export const getAdminStats = async (req, res) => {
  try {
    const totalSubscribers = await Subscriber.countDocuments();
    const activeSubscribers = await Subscriber.countDocuments({ status: "subscribed" });
    const unsubscribed = await Subscriber.countDocuments({ status: "unsubscribed" });
    const pending = await Subscriber.countDocuments({ status: "pending" });

    // Growth over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSubscribers = await Subscriber.countDocuments({
      status: "subscribed",
      subscribedAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        totalSubscribers,
        activeSubscribers,
        unsubscribed,
        pending,
        recentSubscribers
      }
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get subscribers list
// @route   GET /api/newsletter/admin/subscribers
// @access  Private (Admin)
export const getSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const query = {};
    if (req.query.status) {
        query.status = req.query.status;
    }
    if (req.query.search) {
        query.email = { $regex: req.query.search, $options: 'i' };
    }

    const total = await Subscriber.countDocuments(query);
    const subscribers = await Subscriber.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: subscribers.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: subscribers
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
