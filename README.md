
# TaskFlow – Team Task Management System

A full-stack Team Task Management System built using Node.js, Express.js, MySQL, MongoDB and JavaScript.

TaskFlow helps teams manage projects, assign tasks, track progress and collaborate through task comments with role-based access control.

# Project Highlights

- Role-based authentication and authorization

- Admin, Manager and Employee roles

- Project and task management

- Task assignment and reassignment

- Task status tracking

- Task comments and discussions

- Search and pagination

- JWT authentication with refresh tokens

- Email notifications using Nodemailer

- Scheduled email notifications using node-cron

- Centralized error handling and validation
## Installation

Prerequisites

- Node.js

- npm

- MongoDB or MySQL

- Git

**Step 1: Clone Repository**

git clone https://github.com/Logeswari-divya/taskflow-backend.git

**Step 2: Navigate to MongoDB Backend**

cd taskflow-backend/backend/mongo_db_backend

**Step 3: Install Dependencies**

npm install

**Step 4: Configure Environment Variables**

Create a .env file in the backend directory.

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- JWT_REFRESH_SECRET=refreshsecret


Configure all additional variables required by your application.

**Step 5: Start Development Server**

 - npm run dev

**Step 6: Open Frontend**

Open the MongoDB frontend entry point in your browser and configure its API base URL to point to your backend.

## 🔐 Demo Login Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@taskflow.com | Admin@123 |
| Manager | manager@taskflow.com | Manager@123 |
| Employee | employee@taskflow.com | Employee@123 |

**Note:** These are demo credentials created for testing purposes only. Do not use personal or production credentials.

## 🌐 Live Demo & Source Code

TaskFlow is implemented using two different database technologies: MySQL and MongoDB.



### 1. MongoDB Version

**Database:** MongoDB

| Component | Link |
|---|---|
| Frontend Source Code | [MongoDB Frontend](https://github.com/Logeswari-divya/taskflow-backend/tree/master/frontend/mongodb_frontend) |
| Backend Source Code | [MongoDB Backend](https://github.com/Logeswari-divya/taskflow-backend/tree/master/backend/mongo_db_backend) |
| Live Frontend | https://taskflow-mongodb-frontend.vercel.app |
| Live Backend API | https://taskflow-mongodb-backend.vercel.app |

### 2. MySQL Version

**Database:** MySQL

| Component | Link |
|---|---|
| Frontend Source Code | [MySQL Frontend](https://github.com/Logeswari-divya/taskflow-backend/tree/master/frontend/mysql_frontend) |
| Backend Source Code | [MySQL Backend](https://github.com/Logeswari-divya/taskflow-backend/tree/master/backend/mysql_backend) |
| Live Frontend | https://taskflow-mysql-frontend.vercel.app |
| Live Backend API | https://taskflow-mysql-backend.vercel.app |

### 🔗 GitHub Repository

[View Complete TaskFlow Source Code](https://github.com/Logeswari-divya/taskflow-backend)
