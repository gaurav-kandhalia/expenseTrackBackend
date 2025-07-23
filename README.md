# 📦 Expense Tracker Backend

This is the backend server for the **Expense Tracker** application. It is built with **Node.js**, **Express.js**, **MongoDB**, and uses **JWT** for authentication. It supports two user roles: **Employee** and **Admin**.

---

## 🚀 Getting Started

### 📁 Clone and Install

```bash
git clone https://github.com/gaurav-kandhalia/expenseTrackBackend.git
cd expense-tracker-backend
npm install
npm run dev


Roles
User Roles
🔹 Employee
Can Sign Up / Log In

Add expenses

View their own expenses

🔸 Admin
Can Sign Up / Log In

View all employee expenses

Filter expenses

Change expense status (e.g., approved, rejected)

View expense statistics

Add categories



)

🔐 Authentication & Authorization
JWT-based authentication

Middleware protects routes

Role-based access for Admin and Employee

🔍 Notes
File upload is temporarily disabled in the backend.

All routes are implemented and work for both Employee and Admin roles.

Admin has elevated access to analytics, filtering, and status updates.
