# Orbit AI — Enterprise Chatbot Architecture for Aformix

## 1. Executive Summary

Orbit AI is designed as the premium, enterprise-level AI assistant for the Aformix website. It is not a simple widget — it is a branded growth companion that owns lead qualification, discovery, service recommendation, booking, and intelligent customer engagement.

Orbit AI delivers:
- Premium glassmorphism chat UI with floating motion
- AI-first lead capture and qualification workflows
- Intelligent service recommendation engine
- RAG-ready knowledge retrieval architecture
- CRM integration and meeting booking orchestration
- Automated visitor analytics and conversion tracking
- Secure production-ready backend with rate limiting and validation

---

## 2. System Architecture

### 2.1 High-Level Architecture

1. Frontend: React + Vite + TypeScript
   - `OrbitAI` floating assistant component
   - Glassmorphism UI, motion, and responsive mobile experiences
   - Lead capture wizard, chat experience, and booking suggestions
2. Backend: Node.js + Express + MongoDB
   - Orbit chatbot API routes for `chat` and `lead`
   - Lead storage, score calculation, service recommendations
   - Rate limiting, validation, CORS, Helmet
3. AI Layer: OpenAI + LangChain-ready patterns
   - Instructions for Orbit persona, lead scoring, and service discovery
   - Cloud-hosted embedding and vector search stub for future RAG
4. CRM & booking integrations
   - Calendly booking link embedded in UI
   - CRM sync placeholders for HubSpot, Salesforce, Zoho, Airtable, Notion, GoHighLevel
5. Analytics & monitoring
   - Visitor tracking via frontend events
   - Backend conversation and lead event capture
   - Future integration with PostHog / Sentry

### 2.2 Component Boundaries

- `frontend/src/components/OrbitAI.tsx` — UI, state machine, qualification wizard, chat panel
- `backend/src/routes/orbitRoutes.js` — `POST /api/orbit/chat`, `POST /api/orbit/lead`
- `backend/src/controllers/orbitController.js` — AI conversation handler and lead ingestion
- `backend/src/models/Lead.js` — lead schema and qualification model
- `backend/src/utils/openaiClient.js` — OpenAI client adapter

### 2.3 Request Flow

1. Visitor opens Orbit AI bubble in browser
2. UI launches chat panel and prompts a premium greeting
3. User enters a question or begins the discovery wizard
4. Frontend sends query to `/api/orbit/chat`
5. Backend uses OpenAI or fallback response to answer
6. Orbit captures lead details through the wizard
7. Backend stores lead in MongoDB and optionally syncs to CRM
8. Booking CTA offers Calendly slot
9. Metrics are emitted for analytics and conversion tracking

---

## 3. Database Schema

### 3.1 Lead Document (`Lead`)

Field | Type | Description
--- | --- | ---
`name` | String | Full lead name
`email` | String | Lead email
`phone` | String | Phone or WhatsApp
`company` | String | Company or brand name
`industry` | String | Industry segment
`country` | String | Country of origin
`businessSize` | String | Team size / company size
`monthlyRevenue` | String | Revenue range
`projectBudget` | String | Budget range
`timeline` | String | Delivery timeline
`goals` | String | Primary business goals
`currentChallenges` | String | Pain points
`preferredContactMethod` | String | Email / Phone / WhatsApp / Slack
`source` | String | `orbit-ai-widget` or campaign source
`leadScore` | Number | 0-100 scoring
`serviceRecommendations` | String | Recommendation summary
`status` | String | `new`, `qualified`, `booked`, `nurture`, `closed`
`conversation` | Array | Conversation history for RAG / analytics
`metadata` | Object | Capture extra context, UTM tags, session ids

### 3.2 RAG Knowledge Base (Recommended)

- `documents` collection: raw service copy, case studies, pricing data
- `vectors` collection: embedding vectors for semantic search
- `chat_sessions` collection: visitor context, summarization, follow-ups
- `analytics` collection: chat events, lead conversions, message categories

---

## 4. Folder Structure

```
frontend/
  src/
    components/
      OrbitAI.tsx
    styles/
      design-system.css
    App.tsx
backend/
  src/
    controllers/
      orbitController.js
    models/
      Lead.js
    routes/
      orbitRoutes.js
    utils/
      openaiClient.js
    app.js
    server.js
    config/
      db.js
      env.js
```

### 4.1 Frontend Extensions

- `OrbitAI.tsx` is the central assistant shell.
- It should be rendered once in `App.tsx` so Orbit is available across the site.
- The component is mobile-first, with floating bubble and full-panel chat.

### 4.2 Backend Extensions

- New `orbitRoutes` and `orbitController` enable AI chat and lead capture.
- Model-based lead storage enables analytics, qualification, and CRM syncing.

---

## 5. API Design

### `POST /api/orbit/chat`

Request body:
```json
{
  "query": "I need a new website for my fintech startup",
  "conversation": [
    { "role": "user", "content": "My current site is slow." }
  ]
}
```

Response body:
```json
{
  "response": "Orbit AI: For a fintech business, I recommend a scalable website, payment automation, secure SaaS workflows, and a discovery call to review compliance requirements."
}
```

### `POST /api/orbit/lead`

Request body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "company": "BrightBank",
  "industry": "Enterprise",
  "projectBudget": ">$50K",
  "timeline": "1-3 months",
  "goals": "Launch a secure digital experience for investors.",
  "currentChallenges": "Legacy systems and data security.",
  "preferredContactMethod": "Email",
  "leadScore": 85
}
```

Response body:
```json
{
  "message": "Lead captured successfully.",
  "leadId": "..."
}
```

### Future API Endpoints

- `POST /api/orbit/booking` — create booking session or fetch available Calendly slots
- `POST /api/orbit/crm` — sync lead to HubSpot / Salesforce / Zoho / Airtable / Notion
- `GET /api/orbit/analytics` — retrieve chat conversion metrics
- `POST /api/orbit/rag/search` — semantic retrieval over portfolio and case studies

---

## 6. UI Design Specification

### 6.1 Orbit UI Principles

- Premium glassmorphism surfaces
- Soft neon gradients and subtle shadows
- Floating button with breathing motion
- Smooth open/close transitions
- Typing indicators and quick action chips
- Responsive mobile-first layout
- Dark-first design with light mode support

### 6.2 Visual States

- Idle: floating orb, subtle hover glow
- Greeting: welcome card with assistant persona
- Typing: animated status and message pulse
- Thinking: ellipsis / loading animation
- Success: confirmation card with booking CTA
- Error: durable fallback with retry button
- Lead Capture: progressive form wizard
- Meeting Booking: Calendly call action

### 6.3 UX Flow

1. Orbit bubble appears after page load or on scroll.
2. Visitor opens Orbit and sees a dynamic greeting.
3. Quick questions and action buttons reduce friction.
4. The assistant asks discovery questions when the visitor engages.
5. The lead form captures company profile, budget, timeline, and challenges.
6. Orbit scores the lead and suggests the correct service mix.
7. If the visitor is qualified, Orbit suggests booking a call.
8. All interactions are tracked for analytics.

---

## 7. Component Breakdown

### `OrbitAI` (frontend)

Responsibilities:
- Manage open/close state
- Render chat transcript and wizard experience
- Maintain lead qualification profile
- Send chat and lead requests to the backend
- Display recommendation cards and booking UI

### `OrbitRoute` (backend)

Responsibilities:
- Validate incoming user requests
- Route chat requests to the AI provider
- Persist lead information
- Calculate lead status and service recommendations
- Provide fallback behavior when AI provider is unavailable

### `Lead` Model

Responsibility:
- Store project brief and qualification metadata
- Support lead scoring and CRM sync
- Enable analytics and conversation retrieval

---

## 8. Conversation Flows

### 8.1 Initial Discovery

Orbit: "Welcome to Aformix 👋 Need a website, automation, or AI solution? Tell me what you're building."
User: "I need a marketing website for my startup."
Orbit: "Great. What is the business goal—lead generation, brand trust, or product launch?"

### 8.2 Qualification Path

Orbit asks:
- "What is your timeline for launch?"
- "What budget range do you have for this project?"
- "What current challenge should this solution solve?"
- "Who is the best contact for next steps?"

### 8.3 Service Recommendation

Orbit recommends depending on industry:
- Startup: Branding, Website, SEO, CRM integration
- Ecommerce: Automation, CRM, Marketing, Checkout optimization
- Agency: AI Agents, Workflow Automation, White-label systems
- Enterprise: Custom SaaS, Data Integration, Infrastructure, Security

### 8.4 Booking Trigger

If the lead score is hot or explicit intent is detected:
- Orbit: "Your project looks like a strong fit. Shall I book a discovery call with the Aformix team?"
- Visitor clicks booking CTA
- Orbit sends a summary to the backend and provides Calendly link

---

## 9. Lead Qualification Logic

### 9.1 Qualification Fields

- Name
- Email
- Phone
- Company
- Industry
- Country
- Business Size
- Monthly Revenue
- Project Budget
- Timeline
- Goals
- Current Challenges
- Preferred Contact Method

### 9.2 Lead Score Model

Scoring weights are derived from project readiness and business context.

- Project Budget: high budget → higher score
- Timeline: shorter timeline → stronger intent
- Business Size: larger organization → more sales priority
- Goals and Challenges: presence of clear business goals increases score

### 9.3 Lead Classification

- `Hot` (80+): book immediately, prioritize for discovery
- `Warm` (50–79): nurture with follow-up workflows
- `Cold` (<50): continue education and capture email

### 9.4 Sales Signals

Intent signals to detect:
- "Need to launch soon"
- "Budget allocated"
- "Looking for an agency partner"
- "Schedule a call"
- "Need enterprise architecture"

---

## 10. CRM Integration Architecture

### 10.1 Data Pipeline

1. Lead captured in MongoDB
2. Backend normalizes lead payload
3. CRM sync service maps fields to provider schema
4. Webhook or API call pushes lead into HubSpot / Salesforce / Zoho / Airtable / Notion / GoHighLevel

### 10.2 Recommended Sync Strategy

- Store raw lead record in MongoDB first
- Use event queue or background job for CRM sync
- Save sync status and CRM message
- Retry on failure and surface errors to admin dashboard

### 10.3 Provider Fields

Common CRM fields:
- `email`
- `firstName` / `lastName`
- `company`
- `phone`
- `industry`
- `leadSource` = `Orbit AI`
- `projectBudget`
- `timeline`
- `leadScore`
- `notes`

---

## 11. RAG Architecture

### 11.1 Knowledge Sources

- Service descriptions
- Portfolio entries
- FAQ content
- Pricing tables
- Blog summaries
- Case studies
- Product documentation

### 11.2 Semantic Stack

- Embeddings: OpenAI embeddings or Supabase embeddings
- Vector store: Pinecone / Supabase vector DB / PostgreSQL + pgvector
- Retriever: LangChain agent or custom retrieval pipeline
- Search: semantic similarity search with citations

### 11.3 Retrieval Flow

1. User asks a question
2. Query is embedded and searched against the vector store
3. Relevant documents are retrieved
4. AI prompt combines documents with assistant persona
5. Orbit responds with citations and service-specific references

### 11.4 Future Extension

- Add `sources` metadata to chat responses
- Build admin UI for adding and tagging knowledge assets
- Support document ingestion from content, blog posts, and case studies

---

## 12. AI Prompt System

### 12.1 Assistant Persona Prompt

Orbit AI must be professional, friendly, business-focused, and solution-driven. It must avoid generic robot language.

Sample system prompt:

> You are Orbit AI, Aformix’s intelligent growth assistant. Speak like a senior digital strategist. Ask follow-up questions to qualify each lead, recommend services based on their industry, and explain the why behind each recommendation. Prioritize lead conversion and discovery call booking. Do not be overly casual.

### 12.2 Prompt Templates

- `leadQualificationPrompt`: collects goals, budget, timeline, current challenges
- `serviceRecommendationPrompt`: maps answers to service bundles
- `bookingPrompt`: generates a persuasive call invitation
- `ragPrompt`: integrates retrieved portfolio and FAQ context

### 12.3 Multi-Turn Memory

- Keep the last 8–10 messages in context
- Summarize earlier conversation when the session grows large
- Retain lead qualification fields across the session

---

## 13. Security Plan

### 13.1 API Hardening

- Rate limiting for all endpoints
- Strict validation on lead capture and chat payloads
- Helmet middleware for secure headers
- CORS restricted to allowed origins via `CLIENT_URL`

### 13.2 Input Protection

- Validate email, required strings, enumerations
- Trim user input and reject malformed payloads
- Avoid reflecting raw HTML

### 13.3 Data Protection

- Keep API keys in environment variables only
- Do not commit secrets to the repository
- Rotate email and OpenAI credentials immediately if exposed

### 13.4 GDPR & Compliance

- Add consent notice in chatbot when collecting personal data
- Save only required contact details for lead qualification
- Provide a destination for privacy / terms links in the chat footer

---

## 14. Deployment Guide

### 14.1 Backend

- Deploy Node/Express to Render or Vercel Serverless
- Use MongoDB Atlas for production data storage
- Set environment variables: `MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY`, `CLIENT_URL`, `CALENDLY_URL`, mail provider secrets

### 14.2 Frontend

- Deploy React/Vite to Vercel
- Use the same `CLIENT_URL` origin in backend config
- Ensure API proxy is configured in Vite for local development

### 14.3 Release Checklist

- Validate the lead capture path end-to-end
- Confirm chat panel opens on desktop/mobile
- Check rate limiting and CORS in production
- Confirm CRM sync event shape before sending live leads
- Verify calendar booking link and call invitation text

---

## 15. Scalability Plan

### 15.1 Performance

- Cache static Orbit UI assets with CDN
- Use a dedicated AI request queue for expensive OpenAI calls
- Offload lead ingestion and CRM sync to async jobs

### 15.2 Availability

- Deploy backend behind reliable autoscaling infrastructure
- Use health checks for chat and lead endpoints
- Add monitoring for error rate and request latency

### 15.3 Future Enhancements

- Add Redis for session state and rate limit persistence
- Add PostgreSQL / Supabase for analytics and RAG storage
- Implement `chat_sessions` with summaries and follow-up automations
- Build an admin dashboard for lead review, conversation analytics, and knowledge base management

---

## 16. Production Best Practices

- Keep environment variables out of source control
- Use strong secrets and rotate them regularly
- Log only non-sensitive event metadata
- Implement end-to-end tests for the Orbit flow
- Use feature flags to deploy AI upgrades gradually
- Always ship with a fallback experience for AI downtime
