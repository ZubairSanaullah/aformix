# Aformix Backend

This repository contains the complete Aformix backend service built with Node.js, Express, MongoDB, JWT authentication, OTP email verification, Inngest events, and production-level security middleware.

## Features

- User registration with OTP verification
- Secure authentication with JWT access and refresh tokens
- Email verification using Nodemailer
- Welcome email after login
- Inngest event publishing on successful login
- Rate limiting, Helmet, CORS, and secure cookies
- Clean modular architecture with controllers, services, and middleware

## Installation

1. Install root dependencies:
   ```bash
   npm install
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in `/backend` with the following values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
CLIENT_URL=http://localhost:5173
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_gmail_address@gmail.com
MAIL_PASS=your_app_password
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

## Running Locally

Start frontend and backend together from the root:

```bash
npm run dev
```

Start only the backend:

```bash
cd backend
npm run dev
```

## API Endpoints

- `POST /api/auth/register` - Register a new user and send OTP
- `POST /api/auth/verify-otp` - Verify OTP and activate account
- `POST /api/auth/login` - Login and issue JWT tokens
- `POST /api/auth/logout` - Logout and clear cookies
- `GET /api/auth/me` - Get authenticated user profile

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Copy the connection URI and paste it into `MONGODB_URI`

## Gmail App Password Setup

1. Enable 2-Step Verification in your Google account
2. Go to App Passwords
3. Create a new App Password for Mail
4. Use the generated password in `MAIL_PASS`

## Inngest Setup

1. Sign in to https://www.inngest.com
2. Create a new application
3. Copy `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY`
4. Add them to your backend `.env`

## Deployment

- Build and deploy frontend separately from `/frontend`
- Deploy backend from `/backend` using Node-friendly hosts
- Use environment variables in your target environment
- Ensure `CLIENT_URL` points to your frontend origin
- Use HTTPS in production and keep secure cookies enabled
