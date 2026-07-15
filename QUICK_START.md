# Aformix OS - Quick Start Guide

## 🚀 Getting Started

### Prerequisites:
- Node.js (v16+)
- MongoDB (local or cloud)
- npm or yarn
- Git

### 1. Environment Setup

#### Backend Setup:
```bash
cd backend
cp .env.example .env  # Create environment file
```

Edit `.env` with your settings:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/aformix
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
JWT_SECRET=your-secret-key
```

#### Frontend Setup:
```bash
cd frontend
cp .env.example .env.local  # Create environment file
```

Edit `.env.local`:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Installation

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### 3. Running the Application

#### Start Backend:
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend will start on `http://localhost:3000`

#### Start Frontend:
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Testing the Features

#### Access the Application:
1. Open `http://localhost:5173` in your browser
2. Click on "Workspace" or login if prompted
3. Navigate to `/workspace/projects` for Projects
4. Navigate to `/workspace/scheduler` for Schedules

#### Create Your First Project:
1. Go to Projects page
2. Click "New Project" button
3. Fill in the form:
   - Name: "My First Project"
   - Description: "Testing the new features"
   - Priority: Medium
   - Due Date: Select a future date
4. Click "Create Project"

#### Create Your First Schedule:
1. Go to Schedules page
2. Click "New Schedule" button
3. Fill in the form:
   - Title: "Team Meeting"
   - Type: Meeting
   - Start Time: Select current time
   - End Time: Add 1 hour
   - Location: "Virtual"
4. Click "Create Schedule"

## 📊 API Testing with cURL

### Login First:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

### Get All Projects:
```bash
curl -X GET http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

### Create a Project:
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Mobile App Development",
    "description": "Build iOS and Android apps",
    "priority": "high",
    "dueDate": "2024-12-31",
    "tags": ["mobile", "development"]
  }'
```

### Get All Schedules:
```bash
curl -X GET "http://localhost:3000/api/schedules" \
  -b cookies.txt
```

### Create a Schedule:
```bash
curl -X POST http://localhost:3000/api/schedules \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Project Kickoff",
    "type": "meeting",
    "priority": "high",
    "startTime": "2024-12-15T10:00:00Z",
    "endTime": "2024-12-15T11:00:00Z",
    "location": "Conference Room A"
  }'
```

## 🎯 Main Features Summary

### Projects:
✅ Create, Read, Update, Delete projects  
✅ Filter by status and priority  
✅ Sort by multiple criteria  
✅ Track progress  
✅ Manage tags and collaborators  
✅ Color-coded visualization  

### Schedules:
✅ Create, Read, Update, Delete schedules  
✅ Multiple schedule types (task, meeting, deadline, etc.)  
✅ Time-based filtering  
✅ Priority management  
✅ Attendee tracking  
✅ Reminders support  

### Dashboard:
✅ Real-time statistics  
✅ Quick action buttons  
✅ Project and schedule overview  
✅ Progress tracking  

## 🔍 Verify Installation

### Backend Health Check:
```bash
curl http://localhost:3000/
# Should return: { "message": "Aformix backend is running." }
```

### Database Connection Check:
```bash
curl http://localhost:3000/api/test-db
# Should return connection status
```

## 📋 Troubleshooting

### Port Already in Use:
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### MongoDB Connection Failed:
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure IP whitelist allows your machine (for MongoDB Cloud)

### CORS Errors:
- Verify `CLIENT_URL` in backend `.env`
- Restart backend server
- Clear browser cache

### Frontend API Not Found:
- Check `VITE_API_BASE_URL` in frontend `.env.local`
- Ensure backend is running
- Check network tab in DevTools

## 📚 Additional Resources

- [Project Implementation Details](./FEATURE_IMPLEMENTATION.md)
- [Backend API Documentation](./backend/README.md)
- [Frontend Components Guide](./frontend/README.md)

## 🎉 You're All Set!

Aformix OS is now fully functional with complete project and schedule management capabilities. Start creating projects and schedules to manage your workflow efficiently!

For more help, check the [Feature Implementation Guide](./FEATURE_IMPLEMENTATION.md) or open an issue on GitHub.
