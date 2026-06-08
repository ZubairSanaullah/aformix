import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    industry: {
      type: String,
      enum: ["Startup", "Ecommerce", "Agency", "Enterprise", "SaaS", "Mobile App", "Other"],
      default: "Startup",
    },
    country: { type: String, trim: true },
    businessSize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", ">200", "Unknown"],
      default: "1-10",
    },
    monthlyRevenue: {
      type: String,
      enum: ["< $10K", "$10K-$50K", "$50K-$150K", ">$150K", "Unknown"],
      default: "< $10K",
    },
    projectBudget: {
      type: String,
      enum: ["< $5K", "$5K-$15K", "$15K-$50K", ">$50K", "Unknown"],
      default: "< $5K",
    },
    timeline: {
      type: String,
      enum: ["1-3 months", "3-6 months", "6-12 months", "Flexible", "Unknown"],
      default: "1-3 months",
    },
    goals: { type: String, trim: true },
    currentChallenges: { type: String, trim: true },
    preferredContactMethod: {
      type: String,
      enum: ["Email", "Phone", "WhatsApp", "Slack", "Other"],
      default: "Email",
    },
    source: { type: String, default: "orbit-ai-widget" },
    leadScore: { type: Number, default: 0, min: 0, max: 100 },
    serviceRecommendations: { type: String },
    status: {
      type: String,
      enum: ["new", "qualified", "booked", "nurture", "closed"],
      default: "new",
    },
    conversation: {
      type: [
        {
          role: { type: String, enum: ["user", "assistant", "system"], required: true },
          content: { type: String, trim: true, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
