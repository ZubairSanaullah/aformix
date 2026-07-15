# Aformix OS - Full Feature Implementation Guide

This document outlines all the new features added to make Aformix fully functional with Projects and Schedules management capabilities.

## 🎯 What's New

### 1. **Project Management System**
Complete CRUD operations for managing projects with advanced features.

#### Features:
- ✅ Create new projects with detailed metadata
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Filter by status (active, archived, completed)
- ✅ Filter by priority (low, medium, high)
- ✅ Sort by: recent, oldest, priority, due date, progress
- ✅ Track project progress with percentage
- ✅ Add tags to organize projects
- ✅ Set budget for projects
- ✅ Assign collaborators
- ✅ Color-code projects for better visualization
- ✅ View project details and associated schedules

#### API Endpoints:
```
POST   /api/projects              - Create new project
GET    /api/projects              - Get all projects (with filters)
GET    /api/projects/:projectId   - Get single project
PUT    /api/projects/:projectId   - Update project
DELETE /api/projects/:projectId   - Delete project
GET    /api/projects/stats        - Get project statistics
POST   /api/projects/:id/collaborators         - Add collaborator
DELETE /api/projects/:id/collaborators/:collab - Remove collaborator
```

### 2. **Schedule & Task Management System**
Comprehensive scheduling system for tasks, meetings, deadlines, and events.

#### Features:
- ✅ Create schedules with type: task, meeting, deadline, reminder, event
- ✅ Edit existing schedules
- ✅ Delete schedules
- ✅ Mark schedules as completed
- ✅ Filter by status (pending, in-progress, completed, cancelled)
- ✅ Filter by type (task, meeting, deadline, reminder, event)
- ✅ Filter by priority (low, medium, high, urgent)
- ✅ Sort by: earliest, latest, priority
- ✅ Set start and end times
- ✅ Add location for meetings
- ✅ Add attendees with status tracking
- ✅ Set reminders (at-time, 5-minutes, 15-minutes, 30-minutes, 1-hour, 1-day)
- ✅ Add tags for better organization
- ✅ Add notes and attachments
- ✅ Recurrence options (once, daily, weekly, monthly, yearly)
- ✅ Color-code schedules
- ✅ Get today's schedules
- ✅ Get upcoming schedules

#### API Endpoints:
```
POST   /api/schedules              - Create new schedule
GET    /api/schedules              - Get all schedules (with filters)
GET    /api/schedules/:scheduleId  - Get single schedule
PUT    /api/schedules/:scheduleId  - Update schedule
DELETE /api/schedules/:scheduleId  - Delete schedule
PATCH  /api/schedules/:id/complete - Mark as completed
GET    /api/schedules/stats        - Get statistics
GET    /api/schedules/today        - Get today's schedules
GET    /api/schedules/upcoming     - Get upcoming schedules
```

## 📂 File Structure

### Backend Files Created:

```
backend/src/
├── models/
│   ├── Project.js          - Project schema with all properties
│   └── Schedule.js         - Schedule schema with all properties
├── controllers/
│   ├── projectController.js   - All project CRUD operations
│   └── scheduleController.js  - All schedule CRUD operations
└── routes/
    ├── projectRoutes.js       - Project API routes
    └── scheduleRoutes.js      - Schedule API routes
```

### Frontend Files Created:

```
frontend/src/
├── Pages/
│   ├── Projects.tsx        - Complete projects management page
│   ├── Schedules.tsx       - Complete schedules management page
│   └── WorkspaceDashboard.tsx - Updated with real data
├── services/
│   └── api.ts              - API service functions
├── styles/
│   ├── ProjectsPage.css    - Styling for projects
│   └── SchedulesPage.css   - Styling for schedules
└── features/
    ├── projects/
    │   └── ProjectsModule.tsx - Updated to use Projects page
    └── scheduler/
        └── SchedulerModule.tsx - Updated to use Schedules page
```

## 🚀 How to Use

### Frontend Usage:

#### Projects Page:
```
Access at: /workspace/projects
```

**Creating a Project:**
1. Click "New Project" button
2. Fill in project details:
   - Project Name (required)
   - Description
   - Priority (Low, Medium, High)
   - Category
   - Due Date
   - Tags (comma-separated)
   - Budget
   - Color

**Managing Projects:**
- Click edit icon to modify
- Click delete icon to remove
- Use filters to find specific projects
- Sort by different criteria

#### Schedules Page:
```
Access at: /workspace/scheduler
```

**Creating a Schedule:**
1. Click "New Schedule" button
2. Fill in schedule details:
   - Title (required)
   - Description
   - Type (Task, Meeting, Deadline, Reminder, Event)
   - Priority (Low, Medium, High, Urgent)
   - Start Time (required)
   - End Time (required)
   - Location
   - Attendees (comma-separated emails)
   - Tags (comma-separated)
   - Notes
   - Color

**Managing Schedules:**
- Click complete checkmark to mark done
- Click edit icon to modify
- Click delete icon to remove
- Use filters to organize

### Backend API Usage:

#### Example: Create a Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -b "refresh-token=<token>" \
  -d '{
    "name": "Website Redesign",
    "description": "Complete redesign of company website",
    "priority": "high",
    "category": "Web Development",
    "dueDate": "2024-12-31",
    "tags": ["design", "frontend"],
    "budget": 5000,
    "color": "#FF6B6B"
  }'
```

#### Example: Create a Schedule
```bash
curl -X POST http://localhost:3000/api/schedules \
  -H "Content-Type: application/json" \
  -b "refresh-token=<token>" \
  -d '{
    "title": "Team Meeting",
    "type": "meeting",
    "priority": "high",
    "startTime": "2024-12-15T10:00:00Z",
    "endTime": "2024-12-15T11:00:00Z",
    "location": "Conference Room A",
    "attendees": [
      {"email": "team@example.com", "name": "Team"}
    ],
    "tags": ["important", "team"],
    "color": "#4A90E2"
  }'
```

## 🔐 Authentication

All endpoints require authentication. Make sure to:
1. Register and verify your account
2. Login to get tokens
3. Include credentials with API requests: `credentials: "include"`

## 📊 Database Collections

### Projects Collection:
- `_id`: MongoDB ObjectID
- `userId`: Reference to User
- `name`: String (required)
- `description`: String
- `status`: "active" | "archived" | "completed"
- `priority`: "low" | "medium" | "high"
- `category`: String
- `startDate`: Date
- `dueDate`: Date
- `completedDate`: Date
- `tags`: Array of Strings
- `collaborators`: Array of User references
- `budget`: Number
- `progress`: Number (0-100)
- `color`: Hex color string
- `metadata`: Object for custom data
- `createdAt`: Date
- `updatedAt`: Date

### Schedules Collection:
- `_id`: MongoDB ObjectID
- `userId`: Reference to User
- `projectId`: Reference to Project (optional)
- `title`: String (required)
- `description`: String
- `type`: "task" | "meeting" | "deadline" | "reminder" | "event"
- `status`: "pending" | "in-progress" | "completed" | "cancelled"
- `priority`: "low" | "medium" | "high" | "urgent"
- `startTime`: Date (required)
- `endTime`: Date (required)
- `duration`: Number (in minutes)
- `recurrence`: "once" | "daily" | "weekly" | "monthly" | "yearly"
- `recurrenceEnd`: Date
- `location`: String
- `attendees`: Array of Objects {email, name, status}
- `reminders`: Array of reminder types
- `tags`: Array of Strings
- `attachments`: Array of {name, url}
- `notes`: String
- `color`: Hex color string
- `completedAt`: Date
- `metadata`: Object for custom data
- `createdAt`: Date
- `updatedAt`: Date

## 🎨 UI/UX Features

### Projects Page:
- Modern card-based layout
- Color-coded priority badges
- Progress bars for visual tracking
- Tag display with overflow handling
- Responsive grid layout
- Advanced filtering with multi-criteria support
- Modal-based form for creation/editing
- Hover effects and smooth transitions

### Schedules Page:
- List-based layout for time-sensitive items
- Type-based emoji indicators (📋, 👥, ⏰, 🔔, 📅)
- Status badges with color coding
- Priority indicators
- Location and attendee display
- Complete action button
- Responsive design

### Dashboard:
- Real-time statistics from actual data
- Project and schedule counts
- Quick action buttons
- Progress visualization
- Overview charts

## ⚙️ Configuration

### Environment Variables Needed:
```
MONGODB_URI=<your_mongodb_connection_string>
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
```

### Frontend Environment:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🧪 Testing the Features

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Test Flow:**
   - Register/Login to the application
   - Navigate to Projects or Schedules
   - Create test entries
   - Test filtering and sorting
   - Test CRUD operations
   - Monitor API calls in browser DevTools

## 📝 Notes

- All timestamps are stored in UTC
- Collaborators feature requires user to exist in the system
- Progress tracking available for projects
- Recurrence features support up to 6 reminder types
- All data is user-scoped for privacy

## 🔄 Future Enhancements

Potential additions:
- Calendar view for schedules
- Project templates
- Bulk operations
- Advanced analytics
- Email notifications
- Integration with third-party services
- Real-time collaboration
- File uploads for attachments
- Advanced reporting

## ❓ Troubleshooting

### Projects not loading:
- Check authentication token
- Verify MongoDB connection
- Check browser console for errors
- Ensure API base URL is correct

### Schedules not showing:
- Verify time formats are correct
- Check user authentication
- Ensure MongoDB is running
- Review API error responses

### CORS Issues:
- Update `CLIENT_URL` environment variable
- Restart backend server
- Clear browser cache

---

**Aformix OS is now fully functional with complete project and schedule management!** 🎉
