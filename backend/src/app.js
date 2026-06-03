import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { serve } from "inngest/express";
import inngest from "./config/inngest.js";

const app = express();

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
});

// More lenient limiter for signup
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 signup attempts per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many signup attempts from this IP, please try again later.",
  },
  skip: (req) => req.method !== "POST" || req.path !== "/register",
});

// Stricter limiter for login (brute force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts, please try again later.",
  },
  skip: (req) => req.method !== "POST" || req.path !== "/login",
});

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
const clientOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

app.use(
  cors({
    origin: clientOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", signupLimiter, loginLimiter, authRoutes);
app.use("/api/", apiLimiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Aformix backend is running." });
});

// Inngest webhook handler
app.use("/api/inngest", serve({ client: inngest }));

app.use(errorHandler);

export default app;
