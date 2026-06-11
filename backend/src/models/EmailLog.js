import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    subscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriber",
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewsletterCampaign",
    },
    emailType: {
      type: String,
      enum: ["verification", "welcome", "campaign", "system"],
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "opened", "clicked", "bounced", "failed"],
      default: "sent",
    },
    subject: {
      type: String,
    },
    openedAt: {
      type: Date,
    },
    clickedAt: {
      type: Date,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

emailLogSchema.index({ subscriberId: 1 });
emailLogSchema.index({ campaignId: 1 });

const EmailLog = mongoose.model("EmailLog", emailLogSchema);

export default EmailLog;
