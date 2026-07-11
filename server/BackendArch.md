# AI-Powered Healthcare Website — Backend Architecture

**Stack:** Node.js, Express, MongoDB
**Pattern:** Feature-Based Modular Architecture (evolved from base MVC)
**Timeline:** 1 week

---

## 1. Backend Architectural Approach

We use a **Feature-Based Modular Architecture** instead of a flat MVC layout.

**Why:** Since this is a team project, this approach lets different members work on different modules (e.g., Doctors vs. Pharmacy) without constant merge conflicts in shared folders.

Each feature folder is self-contained, with its own model, controller, routes, and service logic.

---

## 2. Folder Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   └── auth.service.js        # Business logic
│   ├── doctors/
│   │   ├── doctor.model.js
│   │   ├── doctor.controller.js
│   │   └── doctor.routes.js
│   ├── appointments/
│   │   ├── appointment.model.js
│   │   ├── appointment.controller.js
│   │   └── appointment.routes.js
│   └── pharmacy/
│       ├── medicine.model.js
│       ├── pharmacy.controller.js
│       └── pharmacy.routes.js
├── middleware/
│   ├── auth.middleware.js         # JWT verification
│   ├── role.middleware.js         # Admin vs Patient vs Doctor
│   ├── error.middleware.js        # Global error handler
│   └── upload.middleware.js       # Multer for images
├── config/
│   ├── db.js
│   └── env.js
├── utils/
│   ├── apiError.js                # Custom error class
│   └── apiResponse.js             # Standardized JSON response
└── app.js
```

---

## 3. Database Schema Design (MongoDB / Mongoose)

### 3.1 User Model (Core)

```javascript
{
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  avatar: String,
  phone: String,
  address: { street: String, city: String, zip: String },
  createdAt: { type: Date, default: Date.now }
}
```

### 3.2 Doctor Model (Extended Profile)

```javascript
{
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: String,
  fees: Number,
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  availability: [
    { day: String, slots: [String] } // e.g., { day: 'Monday', slots: ['09:00', '10:00'] }
  ],
  isVerified: { type: Boolean, default: false }
}
```

### 3.3 Appointment Model (The Bridge)

```javascript
{
  patient: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  symptoms: String,
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
}
```

### 3.4 Medicine Model

| Field                | Type    |
| -------------------- | ------- |
| name                 | String  |
| brand                | String  |
| category             | String  |
| price                | Number  |
| stock                | Number  |
| description          | String  |
| image                | String  |
| prescriptionRequired | Boolean |

### 3.5 Lab Test Model

| Field       | Type    |
| ----------- | ------- |
| testName    | String  |
| provider    | String  |
| price       | Number  |
| homeSample  | Boolean |
| description | String  |

### 3.6 Blog Model

| Field     | Type   |
| --------- | ------ |
| title     | String |
| content   | String |
| author    | String |
| category  | String |
| thumbnail | String |
| createdAt | Date   |

---

## 4. Authentication & Security (JWT)

A **two-layer security system** protects the API:

- **Public Routes** — accessible by anyone (e.g., Home, View Doctors, View Medicines)
- **Protected Routes (User)** — require a valid JWT in the `Authorization` header (e.g., Book Appointment, View Cart)
- **Restricted Routes (Admin/Doctor)** — require JWT **+** role check (e.g., Add Medicines, Verify Appointments)

**Logic Flow:**

1. Frontend sends login credentials.
2. Backend validates credentials and generates a JWT signed with `JWT_SECRET`.
3. Frontend stores the JWT (localStorage or cookie).
4. Frontend attaches the JWT to every protected request.

**Libraries:**

- `bcryptjs` — hash passwords before saving
- `jsonwebtoken` — generate and verify JWTs

---

## 5. API Route Mapping

### 5.1 Auth & Profile

| Endpoint             | Method | Access    | Description                |
| -------------------- | ------ | --------- | -------------------------- |
| `/api/auth/signup`   | POST   | Public    | Create new account         |
| `/api/auth/login`    | POST   | Public    | Returns JWT & user details |
| `/api/users/profile` | GET    | Protected | Get logged-in user details |
| `/api/users/update`  | PATCH  | Protected | Update profile/avatar      |

### 5.2 Doctors & Search

| Endpoint                  | Method | Access    | Description                                         |
| ------------------------- | ------ | --------- | --------------------------------------------------- |
| `/api/doctors`            | GET    | Public    | List all doctors (supports `?search=` and `?dept=`) |
| `/api/doctors/:id`        | GET    | Public    | Full profile + reviews                              |
| `/api/doctors/review/:id` | POST   | Protected | Leave a rating/review                               |

### 5.3 Appointments (The Engine)

| Endpoint                       | Method | Access       | Description                    |
| ------------------------------ | ------ | ------------ | ------------------------------ |
| `/api/appointments/book`       | POST   | Protected    | Submit appointment form        |
| `/api/appointments/my-slots`   | GET    | Protected    | Patient views their history    |
| `/api/appointments/manage/:id` | PATCH  | Doctor/Admin | Change status (confirm/cancel) |

### 5.4 Pharmacy & Lab

| Endpoint               | Method | Access    | Description                    |
| ---------------------- | ------ | --------- | ------------------------------ |
| `/api/medicines`       | GET    | Public    | List medicines with pagination |
| `/api/cart/add`        | POST   | Protected | Add item to DB-persisted cart  |
| `/api/orders/checkout` | POST   | Protected | Process order & reduce stock   |
| `/api/labs`            | GET    | Public    | List available lab tests       |

### 5.5 Emergency & AI Helper

| Endpoint                  | Method | Access    | Description                             |
| ------------------------- | ------ | --------- | --------------------------------------- |
| `/api/emergency/nearby`   | GET    | Public    | Fetch hospitals based on coordinates    |
| `/api/ai/symptom-checker` | POST   | Protected | Suggests department based on text input |

### 5.6 Blogs

| Endpoint     | Method | Access | Description                |
| ------------ | ------ | ------ | -------------------------- |
| `/api/blogs` | GET    | Public | Fetch health tips/articles |

---

## 6. Core Backend Logic

### 6.1 Search & Filter

For Doctors and Medicines, use MongoDB `$regex` for partial matching — e.g., searching "Cardio" should return "Cardiologist".

### 6.2 AI Integration (Bonus / Simulated)

Since the product is "AI-Powered," implement a simple **Symptom Checker** route:

- Use an open-source or hosted LLM API (OpenAI, HuggingFace), **or**
- Use rule-based logic to map symptoms → suggested doctor specialization

### 6.3 Validation Rules

- No double-booking: verify a doctor's slot is free before saving an appointment
- Standardize all API responses via `apiResponse.js`
- Catch all errors centrally via `error.middleware.js` (404, 401, 500)

---

## 7. Implementation Plan (Day-by-Day)

| Day | Focus                       | Deliverables                                                |
| --- | --------------------------- | ----------------------------------------------------------- |
| 1   | Architecture & Auth         | Server setup, MongoDB connection, Login/Signup APIs         |
| 2   | Doctor & Appointment Module | Doctor models, appointment CRUD, slot availability logic    |
| 3   | Pharmacy & Lab Module       | Medicine listing, lab test listing, cart logic              |
| 4   | Emergency & Blogs           | Static data serving for emergency contacts, blog management |
| 5   | Integration                 | Connect backend with React frontend (Axios/Fetch)           |
| 6   | Testing & Polish            | Bug fixes, smooth transitions, responsive design checks     |
| 7   | Deployment                  | Backend (Render/Vercel), Frontend (Netlify/Vercel)          |

---

## 8. Team Task Delegation

| Role                                     | Responsibilities                                            |
| ---------------------------------------- | ----------------------------------------------------------- |
| **Backend Lead** (Member A)              | Database schemas, JWT auth, API server setup                |
| **Frontend – UI/UX** (Member B)          | Home page, navbar, footer, animations, Tailwind/CSS styling |
| **Module Dev – Medicine/Lab** (Member C) | Medicine store, lab test pages, cart functionality          |
| **Module Dev – Doctors/Blog** (Member D) | Doctor listing, search filters, blog sections               |

### Component-Level Responsibilities

**Middleware Specialist**

- Build `auth.middleware.js` to decode and verify JWT
- Build `error.middleware.js` to catch all errors (404, 401, 500) and return clean JSON

**Database Architect**

- Manage Mongoose connections and data validation
- Enforce rules like preventing double booking for the same time slot

**API Developers**

- Implement controller logic (e.g., in `appointment.controller.js`, check doctor availability before saving a booking)

**Integrator**

- Ensure the frontend Axios instance attaches the JWT to every request:

```javascript
headers: {
  Authorization: `Bearer ${token}`;
}
```

---

## 9. Next Steps

1. **Initialize Git** — one member creates the repo and invites the rest of the team
2. **Environment Variables** — create a shared `.env` template so everyone uses the same DB structure
3. **Start Coding** — begin with `server.js` and `db.js` (database connection)
