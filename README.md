# 🚖 Ride Booking System

A full-stack, role-based Ride Management Platform (similar to Uber or Pathao)
with **Riders**, **Drivers**, and **Admins**.  
Built with **React + Redux Toolkit + RTK Query** for frontend and **Express +
MongoDB** for backend.

The system supports secure authentication, role-based dashboards, real-time ride
requests, ride tracking, and admin management.

---

## 🌐 Live Demo

- Frontend: [https://ride-share-system-frontend.vercel.app](#)
- Backend API: [https://ride-share-system-frontend.vercel.app](#)

---

## 📹 Demo Video

[Demo Video Link Here](#)  
_(10–15 minutes walkthrough covering login, ride booking, driver management, and
admin features)_

---

## 🧑‍💻 Test Credentials

| Role   | Email                | Password       |
| ------ | -------------------- | -------------- |
| Admin  | superadmin@gmail.com | SuperAdmin12@@ |
| Driver | zafi@gmail.com       | Zafi@00        |
| Rider  | mahi@gmail.com       | Mahi@00        |

---

## 🏗️ Tech Stack

**Frontend**

- React.js + React Router
- Redux Toolkit & RTK Query
- TypeScript
- Tailwind CSS
- Recharts (charts & analytics)
- Shadcn Toaster (notifications)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication + bcrypt password hashing

---

## 🚀 Features

### 🔹 Public Landing Pages

- Home, About, Features, Contact, FAQ
- Fully responsive layout with hero banners, testimonials, and call-to-action
  sections

### 🔹 Authentication & Authorization

- JWT-based login/register with **role selection**
- Persistent authentication
- Account status handling (Blocked/Suspended users)

### 🔹 Rider Dashboard

- Request rides with pickup & destination
- Cancel rides (within allowed window)
- Ride history with filters and pagination
- Profile management
- Live ride tracking (optional)

### 🔹 Driver Dashboard

- Online/Offline toggle for availability
- Accept/Reject ride requests
- Update ride statuses (Picked Up → In Transit → Completed)
- Earnings dashboard with charts
- Ride history & profile management

### 🔹 Admin Dashboard

- Manage users (block/unblock, approve/suspend)
- View and filter all rides
- Analytics dashboard for rides, revenue, and driver activity

### 🔹 General Enhancements

- Role-based navigation
- Skeleton loaders & lazy-loading heavy assets
- Emergency/SOS button during active rides
- Form validation, error handling, and toast notifications
- Accessibility-compliant components

---

## 📁 Project Structure

**Frontend**

```javascript
src/
├── components/ # Reusable UI components
├── features/ # Redux slices & RTK Query endpoints
├── pages/ # Public & role-based pages
├── routes/ # Route protection & navigation
├── store/ # Redux store
├── utils/ # Helper functions
└── App.tsx # Main App component
```

**Backend**

````javascript
src/

## Usage/Examples

```javascript
src/
├── models/         # Data schemas, types, API logic (RTK Query, Mongoose types)
│   └── user.ts
│   └── auth.ts
│
├── views/          # UI components and pages
│   ├── components/ # Reusable UI elements
│   └── pages/      # Role-based and public pages
│
├── controllers/    # Route guards, form handlers, business logic
│   ├── authController.ts
│   └── routeController.ts
│
├── routes/         # Navigation and route protection
│   └── index.tsx
│
├── store/          # Redux store setup
│   └── index.ts
│
├── utils/          # Helper functions (validation, formatting, etc.)
│   └── formatDate.ts
│
└── App.tsx         # Main app entry, controller injection
````

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB (local or Atlas)

### Frontend Setup

```bash
cd ride_share_system_frontend
npm install
cp .env.example .env
npm run dev       # Start dev server
npm run build     # Build production
npm run preview   # Preview build

```
