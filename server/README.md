# 🏥 AI-Powered Healthcare Backend — Documentation

This is the backend server for the AI-Powered Healthcare platform, built with Node.js, Express, and MongoDB Atlas. It follows a Feature-Based Modular Architecture to ensure scalability and clean code separation.

## 🚀 1. Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & BcryptJS
- **Logging:** Morgan
- **AI Integration:** Rule-based / Groq API (Symptom Checker)

## 📂 2. Project Architecture

The project uses a modular structure. Each feature (module) contains its own model, controller, and routes.

```
server/
├── src/
│   ├── config/             # Database & Env configurations
│   ├── middleware/         # Auth, Role-check, & Error handling
│   ├── utils/              # Standardized API Response utility
│   └── modules/            # Feature-based folders
│       ├── auth/           # User registration & login
│       ├── ai/             # Symptom checker logic
│       ├── doctors/        # Doctor profiles & search
│       ├── appointments/   # Booking & slot management
│       └── pharmacy/       # Medicine & Cart system
├── server.js               # Entry point
└── .env                    # Environment variables (Ignored by Git)
```

## 🛠️ 3. Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas account

### Installation

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and fill in your credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_generated_secret
NODE_ENV=development
AI_API_KEY=your_groq_or_ai_key
```

4. Start the development server:

```bash
npm run dev
```

## 📡 4. API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Create a new user (Patient/Doctor/Admin) |
| POST | `/login` | Returns JWT and user details |

### 🤖 AI Symptom Checker (`/api/ai`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/symptom-checker` | Analyzes symptoms and suggests a department |

### 🩺 Doctors (`/api/doctors`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all doctors (Filter by `?search=` or `?specialization=`) |
| GET | `/:id` | Public | Get detailed doctor profile |
| POST | `/profile` | Doctor | Create/Update doctor professional profile |

### 📅 Appointments (`/api/appointments`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/book` | Patient | Book a slot (Prevents double-booking) |
| GET | `/my-appointments` | Patient | View patient's history |
| PATCH | `/manage/:id` | Doctor | Confirm or Cancel an appointment |

### 💊 Pharmacy (`/api/pharmacy`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/medicines` | Public | Browse all medicines |
| POST | `/cart` | Patient | Add items to the database-persisted cart |
| POST | `/checkout` | Patient | Place order and reduce medicine stock |

## 🛡️ 5. Security & Standards

### Standardized Response Format

Every API request returns a consistent JSON structure:

```json
{
  "success": true,
  "message": "Information string",
  "timestamp": "ISO Date",
  "data": { ... }
}
```

### Authentication Header

To access "Protected" routes (Booking, Cart, Checkout), the Frontend must send the JWT in the header:

```
Authorization: Bearer <YOUR_TOKEN>
```

### Error Handling

A global error middleware catches all crashes and returns a clean 500 Internal Server Error message instead of crashing the process.

## 📝 6. Team Collaboration Rules

- Never push the `.env` file. Use `.env.example` as a template.
- **Feature Branches:** Create branches like `feature/doctors` or `feature/pharmacy`.
- **Model Changes:** If you change a Mongoose Schema, notify the team as it affects the Frontend forms.

## ✅ Final Finishing Checklist

- [x] **Database:** MongoDB Atlas is connected.
- [x] **Security:** JWT Authentication is implemented.
- [x] **Logic:** Double-booking for appointments is prevented.
- [x] **Pharmacy:** Medicine stock decreases after checkout.
- [x] **AI:** Keyword/API-based symptom analysis is active.
- [x] **Cleanup:** `node_modules` and `.env` are removed from Git tracking.