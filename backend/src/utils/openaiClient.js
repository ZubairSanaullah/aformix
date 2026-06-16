import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "https://aformix.com", // Optional, for including your app on openrouter.ai rankings.
        "X-Title": "Aformix", // Optional. Shows in rankings on openrouter.ai.
      }
    })
  : null;

export default openai;
