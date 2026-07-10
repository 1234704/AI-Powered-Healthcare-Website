# 📖 API Request & Response Reference
---

This document provides detailed JSON examples for every endpoint in the system. It is specifically for frontend developers and backend teammates to know exactly what JSON to send and what to expect back.

## 🔑 Global Headers

For all **Protected** and **Restricted** routes, you must include the JWT token:

```
Authorization: Bearer <JWT_TOKEN>
```

## 1. Authentication Module

### POST `/api/auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

> **Note:** `role` can be `"patient"`, `"doctor"`, or `"admin"`.

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": { "userId": "65f8a..." }
}
```

### POST `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbG...",
    "role": "patient",
    "name": "John Doe"
  }
}
```

## 2. AI Symptom Checker

### POST `/api/ai/symptom-checker`

**Request Body:**

```json
{
  "symptoms": "I have a sharp pain in my chest when I breathe"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Symptom analysis complete",
  "data": {
    "department": "Cardiology",
    "urgency": "High",
    "advice": "Seek immediate attention if you feel severe pressure."
  }
}
```

## 3. Doctors Module

### GET `/api/doctors`

**Query Parameters:** `?search=name` or `?specialization=Cardio`

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f8b...",
      "user": { "name": "Dr. Smith", "avatar": "url..." },
      "specialization": "Cardiology",
      "fees": 500,
      "rating": 4.8
    }
  ]
}
```

### POST `/api/doctors/profile` (Protected — Doctor Only)

**Request Body:**

```json
{
  "specialization": "Dermatology",
  "experience": 8,
  "bio": "Skin specialist with 8 years of experience.",
  "fees": 400,
  "availability": [
    { "day": "Monday", "slots": ["09:00", "10:00", "11:00"] }
  ]
}
```

## 4. Appointments Module

### POST `/api/appointments/book` (Protected — Patient)

**Request Body:**

```json
{
  "doctor": "65f8b...",
  "appointmentDate": "2024-11-20",
  "timeSlot": "10:00 AM",
  "symptoms": "Skin rash and itching"
}
```

**Error Response (400 — Double Booking):**

```json
{
  "success": false,
  "message": "This time slot is already booked. Please choose another."
}
```

### PATCH `/api/appointments/manage/:id` (Protected — Doctor)

**Request Body:**

```json
{
  "status": "confirmed"
}
```

> **Options:** `"confirmed"`, `"cancelled"`, `"completed"`

## 5. Pharmacy Module

### GET `/api/pharmacy/medicines`

**Query Params:** `?search=Panadol`

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f8c...",
      "name": "Panadol",
      "price": 10,
      "stock": 50,
      "prescriptionRequired": false
    }
  ]
}
```

### POST `/api/pharmacy/cart` (Protected)

**Request Body:**

```json
{
  "medicineId": "65f8c...",
  "quantity": 2
}
```

## 6. Common Error Codes

| Status Code | Meaning |
|---|---|
| 400 | Bad Request (Validation failed or logic error) |
| 401 | Unauthorized (Missing or invalid token) |
| 403 | Forbidden (Role check failed — e.g. Patient trying to access Doctor routes) |
| 404 | Not Found (Resource doesn't exist) |
| 500 | Internal Server Error (Something broke on the server) |

> **Note to Frontend:** Please ensure `Content-Type: application/json` is set for all POST/PATCH requests.