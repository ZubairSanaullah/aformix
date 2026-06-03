import dotenv from "dotenv";

dotenv.config();

const requiredVariables = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
  "CLIENT_URL",
  "MAIL_HOST",
  "MAIL_PORT",
  "MAIL_USER",
  "MAIL_PASS",
  "INNGEST_EVENT_KEY",
  "INNGEST_SIGNING_KEY",
];

const missing = requiredVariables.filter((key) => !process.env[key]);

if (missing.length) {
  console.warn(`⚠️ Missing environment variables: ${missing.join(", ")}`);
}

export default null;
