TaskFlow – Team Task Management System

A full-stack Team Task Management System built using Node.js, Express.js, MySQL, MongoDB and JavaScript.

TaskFlow helps teams manage projects, assign tasks, track progress and collaborate through task comments with role-based access control.

🌟 Project Highlights

Role-based authentication and authorization

Admin, Manager and Employee roles

Project and task management

Task assignment and reassignment

Task status tracking

Task comments and discussions

Search and pagination

JWT authentication with refresh tokens

Email notifications using Nodemailer

Scheduled email notifications using node-cron

Centralized error handling and validation

📸 Application Screenshots

Add your actual application screenshots in the screenshots folder.

Login Page

Dashboard





Project Management

Task Management





Task Comments



👥 User Roles & Permissions

🔑 Admin

Create, update and delete projects.

Create and manage users.

View and manage projects and tasks.

Manage task assignments.

👨‍💼 Manager

Create and manage tasks.

Assign tasks to employees.

Reassign tasks.

Monitor task progress.

Manage task-related activities.

👨‍💻 Employee

View assigned projects and tasks.

Update task status.

Add comments to tasks.

Participate in task discussions.

⚙️ Core Functionalities

1. Authentication

User registration and login.

Password encryption using bcryptjs.

JWT access token authentication.

Refresh token management using HTTP-only cookies.

Protected routes using authentication middleware.

2. Project Management

Create, update and delete projects.

View project details.

Manage project-related tasks.

Role-based project visibility.

3. Task Management

Create and assign tasks.

Update task details.

Reassign tasks between employees.

Track task status:

Waiting

In Progress

Completed

Search and pagination.

4. Task Comments

Add comments to individual tasks.

Edit and delete comments according to permissions.

Display comment author information.

Maintain task-related discussions.

5. Email Notifications

Send emails using Nodemailer.

Schedule notifications using node-cron.

📂 Project Structure

taskflow-backend/
│
├── backend/
│   │
│   ├── mysql_backend/
│   │
│   └── mongo_db_backend/
│
├── frontend/
│   │
│   ├── mysql_frontend/
│   │
│   └── mongodb_frontend/
│
└── README.md

🔗 API Endpoints

Base URL: /api

Module

Endpoint

User

/api/user

Projects

/api/projects

Tasks

/api/tasks

Project Tasks

/api/projects/:projectId/tasks

Task Comments

/api/tasks/:taskId/comment

These are route paths. Refer to the individual route files for supported HTTP methods and request parameters.

💻 Installation & Setup

Prerequisites

Node.js

npm

MongoDB or MySQL

Git

Step 1: Clone Repository

git clone https://github.com/Logeswari-divya/taskflow-backend.git

Step 2: Navigate to MongoDB Backend

cd taskflow-backend/backend/mongo_db_backend

Step 3: Install Dependencies

npm install

Step 4: Configure Environment Variables

Create a .env file in the backend directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Configure all additional variables required by your application.

Step 5: Start Development Server

npm run dev

Step 6: Open Frontend

Open the MongoDB frontend entry point in your browser and configure its API base URL to point to your backend.

🔐 Demo Login Credentials

Use dedicated demo accounts for recruiters and interviewers.

Role

Email

Password

Admin

Add demo email

Add demo password

Manager

Add demo email

Add demo password

Employee

Add demo email

Add demo password

Note: These must be dedicated test accounts. Never publish your personal credentials or production passwords.

🌐 Live Demo

Frontend: Add your deployed frontend URL here.

Backend: Add your deployed backend URL here.

GitHub Repository:

TaskFlow – GitHub Repository

🧠 Technical Concepts Implemented

MVC / layered backend architecture

RESTful API development

Authentication and authorization middleware

JWT and refresh token handling

Password hashing

MongoDB schemas and Mongoose relationships

MySQL relational database operations

Input validation

Centralized exception handling

Async error handling

Pagination and search

Scheduled background jobs

👩‍💻 Author

Logeswari

GitHub: Logeswari-divya
