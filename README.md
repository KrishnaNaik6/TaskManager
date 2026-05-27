# Task Manager App

A full-stack Task Manager application built using the MERN stack where users can register, login, and manage tasks across different stages.

---------------------------------------------------------------------

# Live Deployment

## Frontend
https://task-manager-app24.vercel.app/

## Backend
https://task-manager-2404.vercel.app/

-----------------------------------------------------------------------

# Features

- User Authentication (Register & Login)
- JWT-based Authorization
- Create Tasks
- Update Tasks
- Delete Tasks
- Task Stages:
  - Todo
  - In Progress
  - Done
- Responsive UI
- Protected Routes
- Loading & Error Handling
- Toast Notifications

-------------------------------------------------------------------------

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---------------------------------------------------------------------------

# Folder Structure

TaskManager/
* frontend/    
* backend/    

---------------------------------------------------------------------------

# Installation & Setup

## Clone Repository

git clone https://github.com/KrishnaNaik6/TaskManager.git

# Frontend Setup

cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173


# Backend Setup

cd server
npm install
npm run dev

Backend runs on:

http://localhost:5000


# Environment Variables

## Frontend `.env`

VITE_API_URL=http://localhost:5000/api

## Backend `.env`

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

# API Endpoints

## Authentication

POST /api/auth/register
POST /api/auth/login

## Tasks

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

# Assumptions

- Each user can only manage their own tasks.
- Authentication is required to access task routes.
- JWT tokens are stored in localStorage.
- Internet connection is required for API communication.
- Users are responsible for maintaining their own session security.


# Technical Decisions

## MERN Stack
Chosen because it provides:
- full JavaScript development
- fast development workflow
- easy frontend-backend integration

## JWT Authentication
Used JWT for:
- stateless authentication
- simpler deployment
- protected API routes

## MongoDB Atlas
Used cloud database hosting for:
- scalability
- easy deployment
- remote accessibility

## Tailwind CSS
Used for:
- rapid UI development
- responsive design
- cleaner styling workflow

## Vercel Deployment
Chosen because:
- free hosting
- simple CI/CD integration
- easy deployment for React and Node.js apps

# Tradeoffs

- LocalStorage is used for token storage for simplicity, though HttpOnly cookies are more secure.
- State management is handled with Context API instead of Redux to keep the project lightweight.
- Drag-and-drop functionality was not implemented to keep the project focused and maintainable.
- Backend validation is basic and can be improved further for production-level robustness.

# Future Improvements

- Drag & Drop Kanban Board
- Task Priority Levels
- Due Dates & Reminders
- Search & Filter Tasks
- Dark Mode
- User Profile Management
- Real-time Updates
- Role-based Access Control

# Deployment Notes

## Frontend
Hosted on Vercel

## Backend
Hosted on Vercel

## Database
Hosted on MongoDB Atlas

# Author

Krishna Umesh Naik (Krishna Naik6)