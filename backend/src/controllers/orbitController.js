import validator from "validator";
import Lead from "../models/Lead.js";
import openai from "../utils/openaiClient.js";

const buildAssistantSystemPrompt = () => `You are Orbit AI, the official Aformix implementation assistant.
You deliver premium, business-focused responses. Always ask clarifying questions for high-value leads, reveal service recommendations, and keep advice anchored in AI automation, web development, SaaS, branding, and growth systems.
If the user asks about Aformix services, offer concise but detailed reasoning for Website Development, AI Automation, SaaS Development, Branding, SEO, or CRM Integration.
Mention Calendly booking only when the lead is qualified and has explicit interest in a call.`;

const normalizeConversation = (conversation = []) => {
  if (!Array.isArray(conversation)) return [];
  return conversation.slice(-10).map((message) => ({
    role: message.role === "assistant" ? "assistant" : message.role === "user" ? "user" : "system",
    content: String(message.content || "").trim(),
  }));
};

export const chat = async (req, res, next) => {
  try {
    const { query, conversation } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400);
      throw new Error("A valid query string is required.");
    }

    const conversationWindow = normalizeConversation(conversation);
    const systemPrompt = buildAssistantSystemPrompt();

    if (!openai) {
      return res.json({
        response:
          "Orbit AI is ready to help. Add OPENAI_API_KEY to the backend environment to unlock intelligent responses, RAG retrieval, and lead qualification support.",
      });
    }

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationWindow,
        { role: "user", content: query },
      ],
      temperature: 0.2,
      max_tokens: 700,
      top_p: 0.95,
    };

    const response = await openai.chat.completions.create(payload);
    const assistantMessage = response?.choices?.[0]?.message?.content?.trim();

    if (!assistantMessage) {
      res.status(502);
      throw new Error("Unable to generate a response from the AI provider.");
    }

    res.json({ response: assistantMessage });
  } catch (error) {
    next(error);
  }
};

export const captureLead = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      industry,
      country,
      businessSize,
      monthlyRevenue,
      projectBudget,
      timeline,
      goals,
      currentChallenges,
      preferredContactMethod,
      source,
      leadScore,
    } = req.body;

    if (!name || !email || !goals) {
      res.status(400);
      throw new Error("Name, email, and goals are required to capture the lead.");
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address.");
    }

    const serviceRecommendations = (() => {
      const mapping = {
        Startup: "Branding, Website Development, SEO, CRM Integration, and MVP Automation.",
        Ecommerce: "Automation, CRM, Marketing Automation, Conversion Optimization, and Secure Checkout.",
        Agency: "AI Agents, Workflow Automation, White-label SaaS, and Process Optimization.",
        Enterprise: "Custom SaaS, Integrations, Infrastructure, Security, and Analytics Automation.",
        SaaS: "API Development, Growth Automation, Product-led Design, and Scalable Infrastructure.",
        "Mobile App": "Mobile UX, Cross-platform App Development, API Connectivity, and Analytics Automation.",
      };
      return mapping[industry] || mapping.Startup;
    })();

    const lead = await Lead.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: String(phone || "").trim(),
      company: String(company || "").trim(),
      industry: industry || "Startup",
      country: String(country || "").trim(),
      businessSize: businessSize || "Unknown",
      monthlyRevenue: monthlyRevenue || "Unknown",
      projectBudget: projectBudget || "Unknown",
      timeline: timeline || "Unknown",
      goals: goals.trim(),
      currentChallenges: String(currentChallenges || "").trim(),
      preferredContactMethod: preferredContactMethod || "Email",
      source: source || "orbit-ai-widget",
      leadScore: Number(leadScore) || 0,
      serviceRecommendations,
      status: Number(leadScore) >= 80 ? "qualified" : "new",
    });

    res.status(201).json({ message: "Lead captured successfully.", leadId: lead._id, lead });
  } catch (error) {
    next(error);
  }
};
