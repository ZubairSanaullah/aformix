import nodemailer from "nodemailer";
import { getWelcomeEmailTemplate, getVerificationEmailTemplate } from "../utils/emailTemplates.js";

// Setup nodemailer transporter
// Using general SMTP config so user can hook it up with Resend, SendGrid, or any other SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.resend.com",
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE === 'true' || true,
    auth: {
      user: process.env.SMTP_USER || "resend",
      pass: process.env.SMTP_PASS || "your_smtp_password",
    },
  });
};

const defaultSender = process.env.EMAIL_FROM || "Aformix Insider <newsletter@aformix.com>";
const websiteUrl = process.env.CLIENT_URL || "https://aformix.com";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = createTransporter();
    const verifyUrl = `${process.env.API_URL || "http://localhost:5000"}/api/newsletter/verify/${verificationToken}`;
    
    const mailOptions = {
      from: defaultSender,
      to: email,
      subject: "Action Required: Verify your Aformix Subscription",
      html: getVerificationEmailTemplate(verifyUrl),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

export const sendWelcomeEmail = async (email, unsubscribeToken) => {
  try {
    const transporter = createTransporter();
    const unsubscribeUrl = `${websiteUrl}/unsubscribe?token=${unsubscribeToken}`;
    
    const mailOptions = {
      from: defaultSender,
      to: email,
      subject: "Welcome to Aformix 🚀",
      html: getWelcomeEmailTemplate(unsubscribeUrl, websiteUrl),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
};
