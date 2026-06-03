import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
};

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const accessToken = req.cookies?.accessToken || authHeader.split(" ")[1];

  if (!accessToken) {
    res.status(401);
    return next(new Error("Authentication required. Please login to access this resource."));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password -otp -otpExpiry");

    if (!user) {
      res.status(401);
      return next(new Error("Invalid session. User not found."));
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        res.status(401);
        return next(new Error("Session expired. Please login again."));
      }

      try {
        const refreshPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
        const user = await User.findById(refreshPayload.id).select("-password -otp -otpExpiry");

        if (!user) {
          res.status(401);
          return next(new Error("Invalid refresh session. Please login again."));
        }

        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "15m",
        });

        res.cookie("accessToken", newAccessToken, {
          ...cookieOptions,
          maxAge: 15 * 60 * 1000,
        });

        req.user = user;
        return next();
      } catch (refreshError) {
        res.status(401);
        return next(new Error("Refresh token expired or invalid. Please login again."));
      }
    }

    res.status(401);
    return next(new Error("Authentication failed. Please login again."));
  }
};
