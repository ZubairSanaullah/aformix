# Aformix OS - System Architecture

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AFORMIX OS                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────┐  ┌──────────────────────────┐  │
│  │     FRONTEND (React/TS)      │  │   BACKEND (Express.js)   │  │
│  ├─────────────────────────────┤  ├──────────────────────────┤  │
│  │                             │  │                          │  │
│  │  Pages:                     │  │  Controllers:            │  │
│  │  ├─ Projects.tsx           │  │  ├─ projectController    │  │
│  │  ├─ Schedules.tsx          │  │  ├─ scheduleController   │  │
│  │  └─ Dashboard.tsx          │  │  ├─ authController       │  │
│  │                             │  │  └─ orbiteController     │  │
│  │  Services:                 │  │                          │  │
│  │  └─ api.ts                 │  │  Routes:                 │  │
│  │     ├─ projectAPI          │  │  ├─ projectRoutes       │  │
│  │     ├─ scheduleAPI         │  │  ├─ scheduleRoutes      │  │
│  │     └─ (other APIs)        │  │  ├─ authRoutes          │  │
│  │                             │  │  └─ (other routes)      │  │
│  │  Components:               │  │                          │  │
│  │  ├─ ProjectCard           │  │  Middleware:             │  │
│  │  ├─ ScheduleCard          │  │  ├─ authMiddleware       │  │
│  │  ├─ Forms                 │  │  ├─ errorMiddleware      │  │
│  │  └─ (reusable)            │  │  └─ rateLimiting         │  │
│  │                             │  │                          │  │
│  └─────────────────────────────┘  └──────────────────────────┘  │
│           ▲                                   ▲                   │
│           │         HTTP/REST API            │                   │
│           └───────────────────────────────────┘                   │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                      MONGODB DATABASE                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Projects   │  │  Schedules   │  │    Users     │            │
│  │  Collection  │  │ Collection   │  │ Collection   │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### Create Project Flow:
```
User Interface (React)
        │
        ▼
   ProjectForm Component
        │
        ▼
   API Service (api.ts)
        │
        ▼ HTTP POST /api/projects
   Backend Route
        │
        ▼
   projectController.createProject()
        │
        ▼
   Project Model (Mongoose)
        │
        ▼
   MongoDB Database
        │
        ▼ Response
   Frontend UI Update
```

### Read Projects Flow:
```
User navigates to /workspace/projects
        │
        ▼
   Projects Page Component mounts
        │
        ▼
   useEffect() triggers API call
        │
        ▼ HTTP GET /api/projects
   projectController.getUserProjects()
        │
        ▼
   Database Query (with filters)
        │
        ▼
   Return filtered/sorted projects
        │
        ▼
   Display in card grid layout
```

## 🔐 Authentication Flow

```
1. User Registration
   ├─ Email validation
   ├─ Password hashing (bcryptjs)
   ├─ OTP generation and sending
   └─ User created in database

2. OTP Verification
   ├─ OTP validation
   ├─ User marked as verified
   └─ User can now login

3. Login Process
   ├─ Email/password validation
   ├─ Generate JWT tokens
   ├─ Set cookies (httpOnly)
   └─ Return tokens to frontend

4. Subsequent API Calls
   ├─ Include credentials in requests
   ├─ Backend validates token
   ├─ Extract userId from token
   ├─ Return user-scoped data
   └─ Proceed with operation
```

## 📈 Request/Response Cycle

### Example: Create Project
```
CLIENT REQUEST:
{
  "method": "POST",
  "url": "/api/projects",
  "headers": {
    "Content-Type": "application/json",
    "Cookie": "access-token=..."
  },
  "body": {
    "name": "Website Redesign",
    "priority": "high",
    "dueDate": "2024-12-31"
  }
}

         ▼ [Server Processing]

SERVER RESPONSE:
{
  "status": 201,
  "body": {
    "message": "Project created successfully.",
    "project": {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439010",
      "name": "Website Redesign",
      "priority": "high",
      "status": "active",
      "progress": 0,
      "createdAt": "2024-12-15T10:30:00Z"
    }
  }
}

         ▼ [Frontend Update]

UI UPDATE:
- Add project to list
- Show success message
- Close form modal
- Update dashboard stats
```

## 🔄 State Management

### Frontend State (React):
```
Projects Page
├─ projects[] - Fetched from API
├─ filteredProjects[] - After filtering/sorting
├─ loading - API call status
├─ error - Error messages
├─ showForm - Modal visibility
├─ editingProject - Current edit target
├─ formData - Form inputs
├─ filterStatus - Current status filter
├─ filterPriority - Current priority filter
└─ sortBy - Current sort method
```

### Backend State (MongoDB):
```
Project Document
├─ _id - Unique identifier
├─ userId - Owner reference
├─ name - Project name
├─ description - Project details
├─ status - Current status
├─ priority - Priority level
├─ progress - Completion percentage
├─ tags - Categorization
├─ collaborators - Team members
├─ budget - Budget amount
├─ color - Visual indicator
├─ createdAt - Creation timestamp
└─ updatedAt - Last update timestamp
```

## 🛣️ API Endpoint Map

```
/api/projects
├─ POST / - Create project
├─ GET / - Get all projects (with filters)
├─ GET /:id - Get single project
├─ PUT /:id - Update project
├─ DELETE /:id - Delete project
├─ GET /stats - Get statistics
└─ POST /:id/collaborators
   ├─ POST / - Add collaborator
   └─ DELETE /:collabId - Remove collaborator

/api/schedules
├─ POST / - Create schedule
├─ GET / - Get all schedules (with filters)
├─ GET /:id - Get single schedule
├─ PUT /:id - Update schedule
├─ DELETE /:id - Delete schedule
├─ PATCH /:id/complete - Mark completed
├─ GET /stats - Get statistics
├─ GET /today - Get today's items
└─ GET /upcoming - Get upcoming items

/api/auth
├─ POST /register - Register user
├─ POST /verify-otp - Verify OTP
├─ POST /login - Login user
├─ POST /logout - Logout user
└─ GET /me - Get current user

/api/orbit
└─ (AI-related endpoints)

/api/newsletter
└─ (Newsletter endpoints)
```

## 🎯 Component Hierarchy

```
App
├─ WorkspaceDashboard
│  ├─ Stats Display
│  ├─ Quick Actions
│  └─ Overview Charts
│
├─ Projects Page
│  ├─ Header
│  ├─ Filters Section
│  ├─ Projects Grid
│  │  └─ ProjectCard (multiple)
│  │     ├─ Title & Meta
│  │     ├─ Description
│  │     ├─ Progress Bar
│  │     ├─ Tags
│  │     └─ Actions
│  └─ Project Form Modal
│     ├─ Name Input
│     ├─ Description
│     ├─ Priority Select
│     ├─ Category Input
│     ├─ Date Picker
│     ├─ Tags Input
│     ├─ Budget Input
│     ├─ Color Picker
│     └─ Submit Button
│
└─ Schedules Page
   ├─ Header
   ├─ Filters Section
   ├─ Schedules List
   │  └─ ScheduleCard (multiple)
   │     ├─ Type Icon
   │     ├─ Title
   │     ├─ Status Badge
   │     ├─ Time Display
   │     ├─ Location
   │     ├─ Attendees
   │     ├─ Tags
   │     └─ Actions
   └─ Schedule Form Modal
      ├─ Title Input
      ├─ Description
      ├─ Type Select
      ├─ Priority Select
      ├─ Time Inputs
      ├─ Location Input
      ├─ Attendees Input
      ├─ Notes
      ├─ Color Picker
      └─ Submit Button
```

## 🔌 External Dependencies

### Frontend:
```
react - UI framework
typescript - Type safety
vite - Build tool
lucide-react - Icons
tailwindcss - Styling (implied from classes)
framer-motion - Animations (used in other modules)
```

### Backend:
```
express - Web framework
mongoose - MongoDB ODM
bcryptjs - Password hashing
jsonwebtoken - JWT tokens
nodemailer - Email sending
validator - Input validation
express-rate-limit - Rate limiting
helmet - Security headers
cors - Cross-origin support
morgan - HTTP logging
inngest - Event/workflow handling
```

## 📊 Query Optimization

### Indexes Created:
```
Projects:
- userId + status (for filtered queries)

Schedules:
- userId + startTime (for time-based queries)
- projectId (for project-schedule relationships)
- status (for status-based queries)
```

## 🚀 Performance Considerations

1. **API Response Times:**
   - Simple queries: < 100ms
   - Complex queries with aggregation: < 500ms
   - Batch operations: < 1000ms

2. **Frontend Optimization:**
   - Lazy loading of pages
   - Pagination support (queryable)
   - Client-side filtering for small datasets
   - CSS animations for smooth UX

3. **Database Optimization:**
   - Proper indexing
   - Query optimization
   - Connection pooling
   - Lean queries when not needed

## 📱 Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
Large: > 1280px
```

## 🔍 Error Handling

### Backend Errors:
```
400 - Bad Request (validation)
401 - Unauthorized (auth required)
403 - Forbidden (permission denied)
404 - Not Found (resource missing)
409 - Conflict (duplicate data)
500 - Server Error
```

### Frontend Errors:
```
- Network errors (offline)
- API errors (backend response)
- Validation errors (form)
- State errors (component state)
```

## 📚 Data Relationships

```
User (1)
  ├─ (1:N) Projects
  │  ├─ tags[]
  │  ├─ collaborators[] -> Users
  │  └─ (1:N) Schedules
  │     ├─ attendees[]
  │     └─ attachments[]
  │
  └─ (1:N) Schedules
     ├─ projectId -> Project (optional)
     ├─ attendees[]
     └─ attachments[]
```

---

This architecture ensures scalability, maintainability, and performance for the Aformix OS platform.
