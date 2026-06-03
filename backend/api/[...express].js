import app from "../src/app.js";
import connectDatabase from "../src/config/db.js";

let isDbConnected = false;

export default async function handler(req, res) {
  if (!isDbConnected) {
    try {
      await connectDatabase();
      isDbConnected = true;
    } catch (error) {
      console.error("Database connection failed", error);
    }
  }
  
  // Strip the /_/backend prefix added by Vercel rewrites/experimentalServices
  if (req.url && req.url.startsWith('/_/backend')) {
    req.url = req.url.replace('/_/backend', '');
  }
  
  return app(req, res);
}
