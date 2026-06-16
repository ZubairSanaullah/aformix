import openai from "../utils/openaiClient.js";

const buildAssistantSystemPrompt = () => `You are Orbit AI, the official Aformix assistant.
You deliver premium, business-focused responses and helpful information about Aformix. 
Keep advice anchored in web development, SaaS, branding, and growth systems.
If the user asks about Aformix services, offer concise but detailed reasoning for Website Development, SaaS Development, Branding, SEO, CRM Integration, or E-Commerce Development.`;

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
      model: "openai/gpt-4o-mini",
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

