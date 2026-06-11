import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    status: {
      type: String,
      enum: ["pending", "subscribed", "unsubscribed"],
      default: "pending",
    },
    source: {
      type: String,
      default: "footer",
    },
    verificationToken: {
      type: String,
    },
    unsubscribeToken: {
      type: String,
    },
    subscribedAt: {
      type: Date,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast lookup
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ verificationToken: 1 });
subscriberSchema.index({ unsubscribeToken: 1 });

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
