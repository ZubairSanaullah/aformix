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
  
  return app(req, res);
}
