import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import {
  CalendarDays,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
};

type LeadProfile = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: "Startup" | "Ecommerce" | "Agency" | "Enterprise" | "SaaS" | "Mobile App";
  country: string;
  businessSize: "1-10" | "11-50" | "51-200" | ">200";
  monthlyRevenue: "< $10K" | "$10K-$50K" | "$50K-$150K" | ">$150K";
  projectBudget: "<$5K" | "$5K-$15K" | "$15K-$50K" | ">$50K";
  timeline: "1-3 months" | "3-6 months" | "6-12 months" | "Flexible";
  goals: string;
  currentChallenges: string;
  preferredContactMethod: "Email" | "Phone" | "WhatsApp" | "Slack" | "Other";
};

const initialLeadProfile: LeadProfile = {
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "Startup",
  country: "",
  businessSize: "1-10",
  monthlyRevenue: "< $10K",
  projectBudget: "<$5K",
  timeline: "1-3 months",
  goals: "",
  currentChallenges: "",
  preferredContactMethod: "Email",
};

const SERVICE_RECOMMENDATIONS: Record<string, string> = {
  Startup: "Branding, Website Development, SEO, CRM Integration, and MVP Automation.",
  Ecommerce: "Automation, CRM, Marketing Automation, Conversion Optimization, and Secure Checkout.",
  Agency: "AI Agents, Workflow Automation, Client Portal Development, and White-label SaaS.",
  Enterprise: "Custom SaaS, Systems Integrations, Cloud Infrastructure, and Compliance-ready Platforms.",
  SaaS: "API Development, Growth Automation, Product-led Design, and Scalable Infrastructure.",
  "Mobile App": "Mobile UX, Cross-platform App Development, API Connectivity, and Analytics Automation.",
};

const leadScoreFactors = {
  budget: { "<$5K": 10, "$5K-$15K": 25, "$15K-$50K": 50, ">$50K": 80 },
  timeline: { "1-3 months": 50, "3-6 months": 35, "6-12 months": 20, "Flexible": 15 },
  businessSize: { "1-10": 15, "11-50": 35, "51-200": 55, ">200": 80 },
};

const createMessageId = (() => {
  let counter = 0;
  return () => `orbit-${++counter}`;
})();

const friendlyGreeting = `Welcome to Aformix 👋
I'm Orbit AI, your AI Growth Partner. Tell me what you're building and I’ll guide you through the best services, connect your team, and book a discovery call.`;

const OrbitAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "lead" | "booking">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "orbit-1",
      role: "assistant",
      content: friendlyGreeting,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "success" | "error">("idle");
  const [leadProfile, setLeadProfile] = useState<LeadProfile>(initialLeadProfile);
  const [formStatus, setFormStatus] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const orbitTheme = {
    panel: isLight
      ? "border-slate-200/40 bg-white/90 text-slate-900 shadow-[0_32px_90px_rgba(15,23,42,0.18)]"
      : "border-white/10 bg-[rgba(15,23,42,0.94)] text-white shadow-[0_32px_90px_rgba(0,0,0,0.35)]",
    surface: isLight
      ? "border-slate-200/40 bg-slate-100/90 text-slate-900 shadow-slate-200/10"
      : "border-white/10 bg-white/5 text-white shadow-black/10",
    input: isLight
      ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
      : "border-white/10 bg-slate-950/70 text-white placeholder:text-slate-400",
    buttonSurface: isLight
      ? "bg-slate-900 text-white border-slate-200"
      : "bg-primary text-white border-transparent",
    tabActive: isLight
      ? "bg-slate-900 text-white"
      : "bg-white/10 text-white",
    tabInactive: isLight
      ? "bg-slate-100 text-slate-700"
      : "bg-white/5 text-slate-300",
    panelHeading: isLight
      ? "border-slate-200/30 bg-white/90 text-slate-900"
      : "border-white/10 text-white",
    bubbleButton: isLight
      ? "border-slate-200/30 bg-slate-900 text-white shadow-[0_30px_60px_rgba(15,23,42,0.18)]"
      : "border-white/15 bg-linear-to-br from-primary to-secondary text-white shadow-[0_30px_60px_rgba(0,0,0,0.35)]",
  };

  const recommendation = useMemo(() => {
    return SERVICE_RECOMMENDATIONS[leadProfile.industry] ?? SERVICE_RECOMMENDATIONS.Startup;
  }, [leadProfile.industry]);

  const orbitTransition = { type: "spring" as const, stiffness: 280, damping: 24, mass: 0.8 };

  const leadScore = useMemo(() => {
    const budgetScore = leadScoreFactors.budget[leadProfile.projectBudget as keyof typeof leadScoreFactors.budget] || 0;
    const timelineScore = leadScoreFactors.timeline[leadProfile.timeline as keyof typeof leadScoreFactors.timeline] || 0;
    const sizeScore = leadScoreFactors.businessSize[leadProfile.businessSize as keyof typeof leadScoreFactors.businessSize] || 0;
    const score = Math.min(100, budgetScore + timelineScore + sizeScore + 5);
    return score;
  }, [leadProfile]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      if (messages.length === 1) {
        setMessages((prev) => [
          ...prev,
          {
            id: `orbit-welcome`,
            role: "assistant",
            content: `Need a website, automation, or AI solution? I can qualify your project, recommend services, and book the right discovery call.`,
          },
        ]);
      }
    }, 600);
    return () => window.clearTimeout(timer);
  }, [isOpen, messages.length]);

  const latestMessage = messages[messages.length - 1];

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setActiveTab("chat");
    setStatus("idle");
  };

  const handleMinimize = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const addMessage = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const conversationWindow = [...messages, userMessage].slice(-8);
    setInputValue("");
    setStatus("typing");

    try {
      const response = await fetch("/api/orbit/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content, conversation: conversationWindow }),
      });

      const text = await response.text();
      let data: { response?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.warn("Orbit AI response was not valid JSON:", parseError);
      }

      const assistantText =
        data.response ||
        text ||
        "I’m processing your request and will respond shortly.";

      setMessages((prev) => [...prev, { id: createMessageId(), role: "assistant", content: assistantText }] );
      setStatus("success");
      if (assistantText.toLowerCase().includes("book")) {
        setActiveTab("booking");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Orbit AI is temporarily unavailable. Please try again or ask a quick question.";
      setErrorMessage(message);
      setStatus("error");
      setMessages((prev) => [
        ...prev,
        { id: createMessageId(), role: "assistant", content: message },
      ]);
    }
  };

  const handleLeadChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setLeadProfile((current) => ({ ...current, [name]: value }));
  };

  const handleLeadSubmit = async () => {
    if (!leadProfile.name || !leadProfile.email || !leadProfile.goals) {
      setErrorMessage("Name, email, and goals are required to continue.");
      setFormStatus("failed");
      return;
    }

    setFormStatus("saving");
    try {
      const response = await fetch("/api/orbit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadProfile, leadScore, source: "orbit-ai-widget" }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || "Unable to save lead.");
      }

      setFormStatus("saved");
      addMessage({
        id: `orbit-lead-${Date.now()}`,
        role: "assistant",
        content: `Thanks ${leadProfile.name}! I have captured your plan and created a lead profile for the Aformix team. I recommend ${recommendation}`,
      });
      setActiveTab("booking");
    } catch (error) {
      setFormStatus("failed");
      setErrorMessage(error instanceof Error ? error.message : "Failed to capture your lead.");
    }
  };

  const quickReplies = [
    "Show me your AI automation case studies",
    "I need a new website for my business",
    "Help me choose the right service mix",
    "Book a discovery call",
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            layoutId="orbit-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={orbitTransition}
            className={`fixed bottom-24 right-25 z-50 w-[min(420px,calc(100vw-2rem))] max-w-105 rounded-4xl border backdrop-blur-2xl ${orbitTheme.panel}`}
          >
            <div className={`flex items-center justify-between gap-4 border-b px-5 py-4 ${isLight ? "border-slate-200/40" : "border-white/10"}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/90">Orbit AI</p>
                  <h3 className="text-lg font-semibold text-white">Your AI Growth Partner</h3>
                </div>
              </div>
              <button
                onClick={handleMinimize}
                className={`flex h-10 w-10 items-center justify-center rounded-3xl border transition ${isLight ? "border-slate-200/40 bg-slate-100 text-slate-900 hover:bg-slate-200" : "border-white/10 bg-white/5 text-white hover:bg-white/10"}`}
                aria-label="Minimize Orbit AI chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-0 p-5">
              <div className="col-span-12 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className={`rounded-3xl px-3 py-2 text-sm font-semibold transition ${
                      activeTab === "chat" ? orbitTheme.tabActive : orbitTheme.tabInactive
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("lead")}
                    className={`rounded-3xl px-3 py-2 text-sm font-semibold transition ${
                      activeTab === "lead" ? orbitTheme.tabActive : orbitTheme.tabInactive
                    }`}
                  >
                    Lead Capture
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("booking")}
                    className={`rounded-3xl px-3 py-2 text-sm font-semibold transition ${
                      activeTab === "booking" ? orbitTheme.tabActive : orbitTheme.tabInactive
                    }`}
                  >
                    Book Call
                  </button>
                </div>

                {activeTab === "chat" && (
                  <div className="space-y-4">
                    <div className={`max-h-105 overflow-y-auto rounded-[28px] border p-4 shadow-inner ${orbitTheme.surface}`}>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`rounded-3xl p-4 mb-4 max-w-[90%] ${
                            message.role === "assistant"
                              ? isLight
                                ? "bg-slate-100/90 text-slate-900"
                                : "bg-slate-900/80 text-slate-100"
                              : isLight
                              ? "bg-slate-200 text-slate-900 self-end"
                              : "bg-white/10 text-white self-end"
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm leading-6">{message.content}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-2">
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map((reply) => (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => handleQuickReply(reply)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                              isLight
                                ? "border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200"
                                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                            }`}
                          >
                            {reply}
                          </button>
                        ))}
                      </div>

                      <div className={`relative flex items-center gap-3 rounded-[28px] border px-4 py-3 shadow-lg ${isLight ? "border-slate-200 bg-slate-100 text-slate-900 shadow-slate-200/20" : "border-white/10 bg-slate-950/70 text-white shadow-black/20"}`}>
                        <input
                          value={inputValue}
                          onChange={(event) => setInputValue(event.target.value)}
                          onKeyDown={(event) => event.key === "Enter" && handleSend()}
                          placeholder="Ask Orbit a question..."
                          className={`w-full text-sm outline-none ${orbitTheme.input}`}
                        />
                        <button
                          onClick={handleSend}
                          className={`${orbitTheme.buttonSurface} rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-95`}
                          aria-label="Send message"
                        >
                          <Send size={16} />
                        </button>
                      </div>

                      <div className={`flex items-center justify-between text-[0.78rem] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        <span>{status === "typing" ? "Orbit is thinking..." : "Instant recommendations powered by AI."}</span>
                        <span>{latestMessage.role === "assistant" ? "Ready to help." : "Awaiting your message."}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "lead" && (
                  <div className={`space-y-4 rounded-[28px] border p-4 shadow-inner ${orbitTheme.surface}`}>
                    <div className="grid gap-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Name</span>
                          <input
                            type="text"
                            name="name"
                            value={leadProfile.name}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                            placeholder="Full name"
                          />
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Email</span>
                          <input
                            type="email"
                            name="email"
                            value={leadProfile.email}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                            placeholder="name@company.com"
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Company</span>
                          <input
                            type="text"
                            name="company"
                            value={leadProfile.company}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                            placeholder="Aformix"
                          />
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Industry</span>
                          <select
                            name="industry"
                            value={leadProfile.industry}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                          >
                            <option>Startup</option>
                            <option>Ecommerce</option>
                            <option>Agency</option>
                            <option>Enterprise</option>
                            <option>SaaS</option>
                            <option>Mobile App</option>
                          </select>
                        </label>
                      </div>

                      <label className="space-y-2 text-sm text-slate-300">
                        <span>What are the primary goals for this project?</span>
                        <textarea
                          name="goals"
                          rows={3}
                          value={leadProfile.goals}
                          onChange={handleLeadChange}
                          className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                          placeholder="Improve conversions, automate lead capture, launch a new product, etc."
                        />
                      </label>

                      <label className="space-y-2 text-sm text-slate-300">
                        <span>Current challenges</span>
                        <textarea
                          name="currentChallenges"
                          rows={2}
                          value={leadProfile.currentChallenges}
                          onChange={handleLeadChange}
                          className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                          placeholder="We need faster onboarding, better funnel analytics, and stronger brand presence."
                        />
                      </label>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Budget</span>
                          <select
                            name="projectBudget"
                            value={leadProfile.projectBudget}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                          >
                            <option>{"<$5K"}</option>
                            <option>{"$5K-$15K"}</option>
                            <option>{"$15K-$50K"}</option>
                            <option>{">$50K"}</option>
                          </select>
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Timeline</span>
                          <select
                            name="timeline"
                            value={leadProfile.timeline}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                          >
                            <option>1-3 months</option>
                            <option>3-6 months</option>
                            <option>6-12 months</option>
                            <option>Flexible</option>
                          </select>
                        </label>
                        <label className="space-y-2 text-sm text-slate-300">
                          <span>Preferred contact</span>
                          <select
                            name="preferredContactMethod"
                            value={leadProfile.preferredContactMethod}
                            onChange={handleLeadChange}
                            className={`w-full rounded-2xl border px-4 py-3 outline-none ${orbitTheme.input}`}
                          >
                            <option>Email</option>
                            <option>WhatsApp</option>
                            <option>Phone</option>
                            <option>Slack</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">Lead score</p>
                          <p>{leadScore} / 100</p>
                        </div>
                        <div className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                          {leadScore >= 80 ? "Hot" : leadScore >= 50 ? "Warm" : "Cold"}
                        </div>
                      </div>
                      <p className="mt-3 text-slate-400">Recommended services: {recommendation}</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={handleLeadSubmit}
                        className="btn-primary w-full text-center sm:w-auto"
                        disabled={formStatus === "saving"}
                      >
                        {formStatus === "saving" ? "Saving lead..." : "Capture My Lead"}
                      </button>
                      <span className="text-xs text-slate-400">Orbit automatically shares the lead with Aformix CRM backend.</span>
                    </div>

                    {formStatus === "failed" && (
                      <p className="text-sm text-red-300">{errorMessage}</p>
                    )}
                    {formStatus === "saved" && (
                      <p className="text-sm text-emerald-300">Lead captured successfully. A discovery call is ready to be booked.</p>
                    )}
                  </div>
                )}

                {activeTab === "booking" && (
                  <div className={`space-y-4 rounded-[28px] border p-6 shadow-inner ${orbitTheme.surface}`}>
                    <div className="flex items-center gap-4 rounded-3xl bg-linear-to-r from-primary/20 to-secondary/20 p-4 text-white">
                      <div className="rounded-3xl bg-white/10 p-3">
                        <CalendarDays size={24} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-primary/90">Discovery Call</p>
                        <h4 className="text-lg font-semibold">Book a 15-minute growth session</h4>
                        <p className="text-slate-300 text-sm">Orbit recommends a live consultation when your project shows high intent.</p>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                      <p className="text-sm text-slate-300">Suggested booking slot:</p>
                      <div className="space-y-2 rounded-3xl bg-slate-950/90 p-4">
                        <p className="text-base font-semibold text-white">Next available discovery call</p>
                        <p className="text-sm text-slate-400">Choose a time that works best for your team.</p>
                      </div>
                    </div>

                    <a
                      href="https://calendly.com/aformix/discovery-call"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-flex items-center justify-center gap-2 w-full rounded-3xl px-5 py-3 text-center font-semibold"
                    >
                      Book with Calendly <Rocket size={16} />
                    </a>

                    <p className="text-xs text-slate-500">
                      The Aformix team will also receive a summary of the conversation so the first call is ready to move fast.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && !isMinimized && (
          <motion.button
            layout
            layoutId="orbit-panel"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={orbitTransition}
            onClick={handleOpen}
            className={`fixed bottom-8 right-20 z-50 flex h-20 w-20 items-center justify-center rounded-full border transition focus:outline-none ${orbitTheme.bubbleButton}`}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open Orbit AI assistant"
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <MessageCircle size={28} className="drop-shadow-lg" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMinimized && !isOpen && (
          <motion.div
            layout
            layoutId="orbit-panel"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={orbitTransition}
            className={`fixed bottom-8 right-20 z-50 flex min-w-62.5 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-3xl border px-4 py-3 ${orbitTheme.panel}`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/20">
              <MessageCircle size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-current">Orbit is minimized</p>
              <p className="text-xs text-slate-300">Resume your project qualification anytime.</p>
            </div>
            <button
              type="button"
              onClick={handleOpen}
              className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrbitAI;
