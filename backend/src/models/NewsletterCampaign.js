import mongoose from "mongoose";

const newsletterCampaignSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true, // HTML content
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "sending", "completed", "failed"],
      default: "draft",
    },
    scheduledAt: {
      type: Date,
    },
    sentAt: {
      type: Date,
    },
    targetAudience: {
      type: String,
      enum: ["all", "active"],
      default: "active",
    },
    stats: {
      totalSent: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      bounced: { type: Number, default: 0 },
      unsubscribed: { type: Number, default: 0 },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const NewsletterCampaign = mongoose.model("NewsletterCampaign", newsletterCampaignSchema);

export default NewsletterCampaign;
