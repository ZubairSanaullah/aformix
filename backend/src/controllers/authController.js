import validator from "validator";
import User from "../models/User.js";
import transporter from "../config/mail.js";
import { createOtp, isOtpValid } from "../services/otpService.js";
import { otpVerificationTemplate, welcomeTemplate } from "../services/emailTemplates.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { publishLoginEvent } from "../events/authEvents.js";

const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 15 * 60 * 1000,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required.");
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address.");
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0 })) {
      res.status(400);
      throw new Error("Password must be at least 8 characters and include numbers.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("An account with this email already exists.");
    }

    const { otp, otpExpiry } = createOtp();

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      otp,
      otpExpiry,
    });

    const html = otpVerificationTemplate(user.name, otp);
    const text = `Welcome to Aformix, ${user.name}.\n\nYour secure OTP is: ${otp}\n\nThis code expires in 10 minutes. If you did not request this, please ignore this email.`;

    await transporter.sendMail({
      from: `"Aformix Support" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Verify Your Aformix Account",
      text,
      html,
    });

    res.status(201).json({
      message: "Registration successful. OTP sent to email.",
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400);
      throw new Error("Email and OTP are required.");
    }

    if (!validator.isEmail(email) || !validator.isNumeric(otp) || otp.length !== 6) {
      res.status(400);
      throw new Error("Please provide a valid email and 6-digit OTP.");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !isOtpValid(user, otp)) {
      res.status(400);
      throw new Error("Invalid or expired OTP. Please request a new code.");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Account verified successfully. You can now login." });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address.");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials.");
    }

    if (!user.isVerified) {
      res.status(403);
      throw new Error("Please verify your email before logging in.");
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      res.status(401);
      throw new Error("Invalid credentials.");
    }

    user.lastLogin = new Date();
    await user.save();

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    await publishLoginEvent(user);

    const html = welcomeTemplate(user.name);
    const text = `Hello ${user.name},

Welcome to Aformix.

We're excited to have you join a growing community of businesses, entrepreneurs, and innovators who believe great digital experiences create real business growth.

At Aformix, we don't just build websites—we create fast, scalable, and conversion-focused digital solutions designed to help brands stand out in an increasingly competitive online world.

Your account is now successfully activated, and you're ready to explore everything we have to offer.

What You Can Expect
✓ Modern and high-performance web solutions
✓ Secure and scalable development practices
✓ Professional support whenever you need assistance
✓ Continuous innovation and digital growth opportunities

Whether you're launching a new idea, upgrading your online presence, or scaling an existing business, we're here to help transform your vision into reality.

Stay Connected
Website: https://aformix.com
WhatsApp: +92 XXX XXXXXXX
Email: hello@aformix.com

Instagram: https://instagram.com/aformix
LinkedIn: https://linkedin.com/company/aformix
Facebook: https://facebook.com/aformix
X (Twitter): https://x.com/aformix

Need Assistance?
Our team is always available to answer questions, discuss projects, or help you get the most out of your experience with Aformix.
Simply reply to this email or reach out through WhatsApp for direct support.

Thank you for choosing Aformix.

We're looking forward to building something exceptional together.

Warm regards,
The Aformix Team

Building Digital Experiences That Drive Results.
© Aformix. All rights reserved.`;

    await transporter.sendMail({
      from: `"Aformix Team" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Welcome to Aformix 🚀",
      text,
      html,
    });

    res.json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("accessToken", "", {
      ...accessCookieOptions,
      maxAge: 0,
    });
    res.cookie("refreshToken", "", {
      ...refreshCookieOptions,
      maxAge: 0,
    });

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Authentication required.");
    }

    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
