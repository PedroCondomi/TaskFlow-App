# TaskFlow

Read this in other languages:

- 🇪🇸 Español: [README.es.md](README.es.md)

TaskFlow is a fullstack task management application designed for teams and individuals.  
It allows users to manage personal tasks, collaborate in teams, and control permissions based on roles.

---

## Live Demo

- Frontend: https://taskflow-app-amber.vercel.app/
- Backend: https://taskflow-app-uhyj.onrender.com/api

## Test Account (Admin role)

Email: test@test.com  
Password: 7777

---

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

This project includes real-world handling of:

- CORS configuration
- Environment variables
- Cloud database connections

---

## Features

### Authentication

- JWT-based login system
- Role-based access (admin / user)

### Tasks

- Create, edit, delete tasks
- Personal vs Team tasks
- Status management (Pending, In Progress, Completed)
- Priority levels (Low, Medium, High)
- Due dates

### Teams

- Create and manage teams
- Assign tasks to teams and members
- Add / remove members
- Promote / demote admins

### Users (Admin only)

- View all users
- Delete users

### Permissions System

- Users can only manage their own personal tasks
- Only admins can manage team tasks
- Users can update status **only if assigned**

### Internationalization

- English / Spanish toggle
- Persistent language selection

---

## Tech Stack

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

## Project Structure

```bash
client/
  src/
    api/
    components/
    hooks/
    pages/
    services/
    store/
    types/

server/
  src/
    controllers/
    middleware/
    models/
    routes/
    types/
    utils/
```

---

## Installation

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
PORT=your_port
MONGO_USERNAME=your_mongodb_username
MONGO_PASS=your_mongodb_password
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_secret
```

Run:

```bash
npm run dev
```

### 3. Setup frontend

```bash
cd client
npm install
```

Create an `.env` file:

```bash
VITE_API_BASE=your_route
```

Run:

```bash
npm run dev
```

---

## Permissions Overview

| Action            | Admin | User             |
| ----------------- | ----- | ---------------- |
| Create team tasks | ✅    | ❌               |
| Delete team tasks | ✅    | ❌               |
| Manage members    | ✅    | ❌               |
| Personal tasks    | ✅    | ✅ (own only)    |
| Change status     | ✅    | ✅ (if assigned) |

---

## Key Highlights

- Role-based permission system (admin vs user)
- Team collaboration with shared tasks
- Clean and responsive UI
- Real-time data fetching with React Query
- Global state handled with Zustand

---

## Future Improvements

- Search & filtering
- Notifications
- Dark mode
- More languages (i18n scalable)

---

## Screenshots

### Login/Register interface

<img width="1132" height="865" alt="Sin título" src="https://github.com/user-attachments/assets/88a89eea-f14c-46e5-a4d3-8f2531bfd503" />

### Dashboard Layout

<img width="1919" height="865" alt="Sin título2" src="https://github.com/user-attachments/assets/124196fc-18c4-4d0f-86f4-cad60c2bdd46" />

### Task Creation / Edition

<img width="699" height="748" alt="Sin título3" src="https://github.com/user-attachments/assets/37100432-fd70-46d7-ad60-eca468db3cdb" />

### Team Management

<img width="1916" height="859" alt="Sin título4" src="https://github.com/user-attachments/assets/2e34c4e6-a820-49c1-8bd1-704ae4048699" />

---

## Why this project?

This project simulates a real-world SaaS task management system and demonstrates:

- Fullstack architecture (client/server separation)
- JWT authentication & role-based authorization
- Complex state management (React Query + Zustand)
- REST API design
- Deployment to production (Vercel + Render + MongoDB Atlas)
- Handling real-world issues like CORS, env variables and remote DB access

---

## Author

### Pedro Condomí

- GitHub: https://github.com/PedroCondomi

---

### If you like this project...

Give it a star ⭐ and feel free to reach out!
