import "./env.js";
import mongoose from "mongoose";

let cached = global.__mongooseConnection;
if (!cached) {
  cached = global.__mongooseConnection = { conn: null, promise: null };
}

const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables. Add it in Vercel Dashboard → Settings → Environment Variables.");
  }

  // Return cached connection if already connected AND the connection is actually open
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    
    // Globally disable buffering to fail fast instead of hanging for 10s
    mongoose.set("bufferCommands", false);

    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,  // Fail fast if can't reach server
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,          // Give enough time for slow operations
      bufferCommands: false,           // Disable buffering
    }).then((m) => {
      console.log("✅ MongoDB connected successfully");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset so next invocation retries
    throw error;
  }

  return cached.conn;
};

export default connectDatabase;
