import { inngest } from "../config/inngest.js";

export const publishLoginEvent = async (user) => {
  if (!process.env.INNGEST_EVENT_KEY) {
    return null;
  }

  try {
    return await inngest.send({
      name: "aformix/auth.login",
      data: {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        loggedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.warn("⚠️ Inngest event failed:", error.message);
    return null;
  }
};
