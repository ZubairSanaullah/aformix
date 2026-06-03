import { generateOTP } from "../utils/generateOTP.js";

export const createOtp = () => {
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  return { otp, otpExpiry };
};

export const isOtpValid = (user, otp) => {
  if (!user || !user.otp || !user.otpExpiry) {
    return false;
  }

  const isOtpMatch = user.otp === otp;
  const isNotExpired = user.otpExpiry > new Date();

  return isOtpMatch && isNotExpired;
};
