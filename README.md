# Vehicle Tracker

A full-stack vehicle trip tracking and analysis app. Upload GPS trip data (CSV), and the backend computes distance traveled, speed, idling time, and stoppage time, while the frontend visualizes trips on an interactive map.

## Tech Stack

**Backend**
- Node.js + Express 5 (TypeScript)
- MongoDB with Mongoose
- InversifyJS for dependency injection
- JWT auth (access + refresh tokens) with OTP email verification via [Resend](https://resend.com/)
- Multer for CSV file uploads, `csv-parser` for parsing, `geolib` for distance/speed calculations
- Zod for request validation

**Frontend**
- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand for state management
- Leaflet / React-Leaflet for map visualization
- Axios for API calls

## CI/CD

This project uses GitHub Actions for CI and Render for deployment.

## Features

- Email/OTP-based signup and login with JWT access & refresh tokens
- Upload a CSV of GPS points (latitude, longitude, timestamp, ignition status) for a trip
- Automatic trip analysis: total distance traveled, computed speed between points, idling time, and stoppage time
- Trip listing with pagination, and per-trip detail view
- Interactive trip map rendering the route with Leaflet
- Protected/public route handling on the frontend

## Project Structure

```
vehicle-tracker/
├── backend/
│   └── src/
│       ├── controller/       # Route handlers (auth, trip)
│       ├── service/          # Business logic (auth, trip, trip analysis, email)
│       ├── repository/       # Data access layer
│       ├── models/           # Mongoose schemas (user, trip, gps)
│       ├── dtos/              # Data transfer objects
│       ├── middleware/       # Auth guard, error handling
│       ├── routes/           # Express routers
│       ├── config/           # DB connection, DI container
│       └── app.ts            # Entry point
└── frontend/
    └── src/
        ├── pages/            # Login, Signup, OTP verify, Trip listing, Trip analysis, Home
        ├── components/       # Map, table, modals, layout, form inputs, etc.
        ├── services/         # API clients (auth, trip)
        ├── store/            # Zustand auth store
        └── types/            # Shared TS types
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)
- A [Resend](https://resend.com/) API key (for OTP emails)

### 1. Clone the repo
```bash
git clone https://github.com/Subhana-7/vehicle-tracker.git
cd vehicle-tracker
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```env
MONGO_URL=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
RESEND_API_KEY=your_resend_api_key
```

Run the backend (listens on port `5000`):
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` with:
```env
VITE_SERVER_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

The app will be available at the Vite dev server URL (typically `http://localhost:5173`).

## API Overview

**Auth** (`/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/verify-otp` | Verify email via OTP |
| POST | `/auth/login` | Log in |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/resend-otp` | Resend OTP |
| POST | `/auth/logout` | Log out |

**Trips** (`/api`, all require auth)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload` | Upload a CSV of GPS trip data |
| GET | `/api/trip/:id` | Get a single trip with analysis |
| GET | `/api/trips` | List all trips |
| DELETE | `/api/trips` | Delete trip(s) |

## CSV Format

Uploaded trip files are expected to contain rows with:
- `latitude`
- `longitude`
- `timestamp`
- `ignition` (`ON` / `OFF`)