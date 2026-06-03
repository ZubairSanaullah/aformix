import "./env.js";
import nodemailer from "nodemailer";

const mailHost = process.env.MAIL_HOST;
const mailPort = Number(process.env.MAIL_PORT || 587);
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;

if (!mailHost || !mailUser || !mailPass) {
  console.warn("⚠️ Mail configuration is missing. Please set MAIL_HOST, MAIL_USER, and MAIL_PASS in your .env.");
}

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: mailPort === 465,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

transporter.verify().then(() => {
  console.log("✅ Mail transporter configured");
}).catch((error) => {
  console.warn("⚠️ Mail transporter verification failed:", error.message);
});

export default transporter;
