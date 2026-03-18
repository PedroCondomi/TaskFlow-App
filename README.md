# 🚀 TaskFlow

TaskFlow is a fullstack task management application designed for teams and individuals.  
It allows users to manage personal tasks, collaborate in teams, and control permissions based on roles.

---

## ✨ Features

### 🔐 Authentication

- JWT-based login system
- Role-based access (admin / user)

### ✅ Tasks

- Create, edit, delete tasks
- Personal vs Team tasks
- Status management (Pending, In Progress, Completed)
- Priority levels (Low, Medium, High)
- Due dates

### 👥 Teams

- Create and manage teams
- Assign tasks to teams and members
- Add / remove members
- Promote / demote admins

### 🧑‍💼 Users (Admin only)

- View all users
- Delete users

### 🎯 Permissions System

- Users can only manage their own personal tasks
- Only admins can manage team tasks
- Users can update status **only if assigned**

### 🌍 Internationalization

- English / Spanish toggle
- Persistent language selection

---

## 🖥️ Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query (server state)

### Backend

- Node.js
- Express
- Bcrypt
- MongoDB (Mongoose)
- JWT Authentication

---

## 📂 Project Structure

```bash
client/
src/
components/
pages/
hooks/
store/
types/

server/
controllers/
models/
routes/
middleware/
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/PedroCondomi/TaskFlow-App.git
cd taskflow
```

### 2. Setup backend

```bash
cd server
npm install
```

Create an `.env` file:

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run:

```bash
npm run dev
```

### 3. Setup frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔒 Permissions Overview

| Action            | Admin | User             |
| ----------------- | ----- | ---------------- |
| Create team tasks | ✅    | ❌               |
| Delete team tasks | ✅    | ❌               |
| Manage members    | ✅    | ❌               |
| Personal tasks    | ✅    | ✅ (own only)    |
| Change status     | ✅    | ✅ (if assigned) |

---

## 🎨 UI Highlights

- Clean dashboard layout
- Card-based design
- Subtle hover interactions
- Disabled states for restricted actions
- Consistent UX patterns

---

## 🚀 Future Improvements

- Search & filtering
- Notifications
- Drag & drop tasks (kanban)
- Dark mode
- More languages (i18n scalable)

---

## 📸 Screenshots

---

## 📌 Why this project?

This project demonstrates:

- Fullstack architecture
- Clean state management
- Role-based permissions
- Scalable UI patterns
- Real-world product thinking

---

## 👨‍💻 Author

### Pedro Condomí

- GitHub: https://github.com/PedroCondomi

---

### ⭐ If you like this project...

Give it a star ⭐ and feel free to reach out!
