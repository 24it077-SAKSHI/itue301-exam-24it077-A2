# 🚗 DriveEasy Car Rental System

A full-stack car rental web application built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📁 Project Structure

```
24IT077/
├── backend/
│   ├── src/
│   │   ├── config/         # db.js — MongoDB connection
│   │   ├── middleware/     # requestLogger, authGuard, errorHandler
│   │   ├── models/         # Customer, Vehicle, Booking schemas
│   │   ├── routes/         # auth, vehicle, booking routes
│   │   ├── controllers/    # business logic for each route
│   │   └── app.js          # Express entry point
│   ├── seed.js             # Seed sample data into MongoDB
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── context/        # AuthContext.jsx
│   │   ├── components/     # Navbar, VehicleCard, ProtectedRoute
│   │   ├── pages/          # LoginPage, FleetPage, MyBookingsPage, AdminPanel
│   │   ├── App.jsx         # Routes setup
│   │   └── main.jsx        # React entry point
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

- Node.js v18+ (https://nodejs.org)
- MongoDB Community Server (local) **OR** MongoDB Atlas (cloud)
- npm (comes with Node.js)

---

## 🚀 Setup & Run Instructions

### Step 1 — Clone / Open the project
```bash
cd Desktop/24IT077
```

### Step 2 — Configure Backend Environment
```bash
# The .env file is already created for you with local MongoDB settings
# If you need to edit it:
cd backend
notepad .env
```

**.env contents:**
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/driveeasy
JWT_SECRET=driveeasy_super_secret_key_2024
```

**For MongoDB Atlas (cloud):**
Replace MONGO_URI with:
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/driveeasy
```

### Step 3 — Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 4 — Seed Sample Data
```bash
npm run seed
```
This creates:
- 10 sample vehicles (Sedan, SUV, Hatchback, Luxury, Electric)
- 1 admin user: `admin@driveeasy.com` / `admin123`
- 2 customer users: `raj@example.com` / `password123`

### Step 5 — Start the Backend Server
```bash
npm run dev
```
Server runs at: **http://localhost:5000**

### Step 6 — Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 7 — Start the Frontend
```bash
npm run dev
```
Frontend runs at: **http://localhost:5173**

---

## 🔑 Login Credentials (after seeding)

| Role     | Email                    | Password    |
|----------|--------------------------|-------------|
| Admin    | admin@driveeasy.com      | admin123    |
| Customer | raj@example.com          | password123 |
| Customer | priya@example.com        | password123 |

---

## 🛠️ API Endpoints

### Authentication
| Method | Endpoint                  | Auth | Description            |
|--------|---------------------------|------|------------------------|
| POST   | /api/v1/auth/login        | ❌   | Login and get JWT token |

### Vehicles
| Method | Endpoint                  | Auth | Description              |
|--------|---------------------------|------|--------------------------|
| GET    | /api/v1/vehicles          | ✅   | Get all vehicles         |
| GET    | /api/v1/vehicles?type=SUV | ✅   | Filter by vehicle type   |

### Bookings
| Method | Endpoint                          | Auth  | Description             |
|--------|-----------------------------------|-------|-------------------------|
| POST   | /api/v1/bookings                  | ✅    | Create a new booking    |
| GET    | /api/v1/bookings/my               | ✅    | Get my bookings         |
| PATCH  | /api/v1/bookings/:id/status       | ✅ Admin | Update booking status |

---

## 🧪 Testing APIs with Postman / Thunder Client

### 1. Login (get token)
```
POST http://localhost:5000/api/v1/auth/login
Body (JSON):
{
  "email": "admin@driveeasy.com",
  "password": "admin123"
}
```
Copy the `token` from the response.

### 2. Get Vehicles
```
GET http://localhost:5000/api/v1/vehicles
Headers:
  Authorization: Bearer <paste token here>
```

### 3. Create Booking
```
POST http://localhost:5000/api/v1/bookings
Headers:
  Authorization: Bearer <paste token here>
Body (JSON):
{
  "vehicleId": "<paste a vehicle _id here>",
  "startDate": "2024-11-01",
  "endDate": "2024-11-05"
}
```

### 4. Get My Bookings
```
GET http://localhost:5000/api/v1/bookings/my
Headers:
  Authorization: Bearer <paste token here>
```

### 5. Update Booking Status (Admin only)
```
PATCH http://localhost:5000/api/v1/bookings/<booking_id>/status
Headers:
  Authorization: Bearer <admin token>
Body (JSON):
{
  "status": "confirmed"
}
```

---

## 📸 Screenshots to Capture (for PDF Report)

1. **Login Page** — show the DriveEasy login form
2. **Fleet Page** — all vehicles displayed in the grid
3. **Filter working** — click "SUV" filter and show only SUVs
4. **Booking Form** — fill dates and click "Book Now" on a vehicle
5. **Booking Success** — "✅ Booking confirmed!" message
6. **My Bookings** — show the booking card with vehicle details and status
7. **Admin Panel** — table of all bookings with status dropdowns
8. **Status Update** — change a booking status and show the change
9. **Postman/Thunder Client** — login API response with token
10. **Postman/Thunder Client** — GET /vehicles response with vehicle array
11. **MongoDB Compass** — show the driveeasy database with collections
12. **Terminal** — both backend (npm run dev) and frontend (npm run dev) running

---

## 🎓 Viva Preparation — Simple Explanations

### Task 1: Authentication (JWT Login)
- User enters email and password on the Login Page
- Frontend sends a POST request to `/api/v1/auth/login`
- Backend finds the user in MongoDB, compares the password using **bcrypt**
- If correct, backend creates a **JWT token** (like a digital ID card) and sends it back
- Frontend stores the token in **AuthContext** (React's way of sharing state globally)
- Every future API request sends this token in the **Authorization header**

### Task 2: Vehicle Fleet & Filtering
- When FleetPage loads, `useEffect` runs automatically and fetches vehicles from the backend
- The backend returns all vehicles from MongoDB (`Vehicle.find()`)
- Filter buttons update a `filteredType` state variable using `useState`
- React re-renders the grid showing only matching vehicle types (no extra API calls needed)

### Task 3: Booking System
- User clicks "Book Now" on a VehicleCard, enters start and end dates
- Form uses `useState` to track the date values (controlled inputs)
- On submit, sends POST to `/api/v1/bookings` with vehicleId and dates
- Backend's **authGuard middleware** extracts the user ID from the JWT token
- Backend checks if `vehicle.isAvailable === true`, returns 400 if not
- If available: creates the booking and sets `vehicle.isAvailable = false`

### Task 4: My Bookings & Status Update
- GET `/api/v1/bookings/my` returns bookings filtered by the logged-in user's ID
- Uses Mongoose **`.populate()`** to replace ObjectId references with actual customer/vehicle data
- Admin sees ALL bookings; regular customers see only their own
- PATCH `/api/v1/bookings/:id/status` lets admin change status
- If status is "cancelled", the vehicle becomes available again (isAvailable = true)

### Task 5: AdminPanel (Lazy Loading)
- `AdminPanel` is imported using `React.lazy(() => import("./pages/AdminPanel"))`
- This means the code for AdminPanel is NOT downloaded until the user navigates to `/admin`
- `Suspense` shows a "Loading..." fallback while the chunk downloads
- This is called **code splitting** — it improves initial page load speed

### Middleware Explained
- **requestLogger**: Runs on EVERY request, just logs method + URL + time
- **authGuard**: Runs on protected routes, verifies the JWT token
- **errorHandler**: Catches any `next(err)` call from any route, returns proper JSON error

---

## 🔌 MongoDB Configuration Options

### Option A: Local MongoDB
1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Start MongoDB service (it starts automatically after install)
3. Use: `MONGO_URI=mongodb://127.0.0.1:27017/driveeasy`

### Option B: MongoDB Atlas (Free Cloud)
1. Go to https://cloud.mongodb.com and create a free account
2. Create a free M0 cluster
3. Create a database user (username + password)
4. Get the connection string and replace in `.env`
5. Add your IP address to the Atlas IP Whitelist

---

## 📦 Technologies Used

| Technology     | Purpose                    |
|----------------|----------------------------|
| React + Vite   | Frontend framework          |
| React Router   | Client-side navigation      |
| Axios          | HTTP requests from frontend |
| AuthContext    | Global auth state           |
| React.lazy     | Lazy loading AdminPanel     |
| Node.js        | Backend runtime             |
| Express.js     | Web framework for backend   |
| MongoDB        | NoSQL database              |
| Mongoose       | MongoDB object modeling     |
| JWT            | Stateless authentication    |
| bcryptjs       | Password hashing            |
| dotenv         | Environment variable loader |
| cors           | Cross-origin request support|
