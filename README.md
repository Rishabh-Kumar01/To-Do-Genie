# Task Management System

This project is a full-stack Task Management System with a Node.js backend and a React frontend. It allows users to create, read, update, and delete tasks, as well as manage their accounts.

## Project Structure

```
project-root/

├── backend/
│   ├── controllers/
│   ├── errors/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── scripts/
│   ├── .gitignore
│   ├── package.json
│   ├── generate.secret.js
│   ├── server.js

├── frontend/
│   └── task-management/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── redux/
│       │   │   ├── slices/
│       │   │   └── store.js
│       │   ├── api.js
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       ├── index.html
│       ├── package.json
│       └── vite.config.js

├── README.md

```

## Features

- User authentication (register, login, logout)
- JWT-based authentication with access and refresh tokens
- CRUD operations for tasks
- Pagination for task listing
- Frontend built with React and Vite
- Responsive design

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

### Frontend
- React
- Vite
- Axios for API requests
- React Router for routing
- React Redux, React Persist for state management

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Rishabh-Kumar01/To-Do-Genie.git
   cd To-Do-Genie
   ```

2. Set up the backend:
   ```
   cd backend
   npm install
   ```

   Create a `.env` file in the root project directory with the following content:
   ```
   PORT=9000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   NODE_ENV=development
   JWT_ACCESS_SECRET=your_access_secret_here
   JWT_REFRESH_SECRET=your_refresh_secret_here
   FRONTEND_URL=http://localhost:5173
   ```

3. Set up the frontend:
   ```
   cd ../frontend/task-management
   npm install
   ```

   Create a `.env` file in the frontend/task-management directory with the following content:
   ```
   VITE_BACKEND_URL=http://localhost:9000
   ```

## Running the Application

1. Start the backend server:
   ```
   cd ../../backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd ../frontend/task-management
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to use the application.

## Generating Secure Tokens

To generate secure tokens for JWT_ACCESS_SECRET and JWT_REFRESH_SECRET, you can use the provided script:

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the token generation script:
   ```
   node generate.secret.js
   ```

3. Copy the generated tokens and update your `.env` file with these values.

## Seeding the Database

To seed the database with sample data for development and testing:

1. Ensure your backend server is running in development mode (`NODE_ENV=development`).

2. Send a GET request to the seed endpoint:
   ```
   GET http://localhost:3000/seed?count=10
   ```
   Replace 10 with the desired number of users to create.

3. The seeding process will create users and random tasks for each user.

4. User credentials will be saved in `backend/public/seeded_users.json` for testing purposes.

**Note:** The seeding route is only available in development mode for security reasons.

## API Endpoints

- POST /register - Register a new user
- POST /login - Log in a user
- POST /logout - Log out a user
- POST /refresh-token - Refresh the access token
- POST /change-password - Change user password

- GET /tasks - Get all tasks (paginated)
- POST /tasks - Create a new task
- GET /tasks/:id - Get a specific task
- PUT /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task

- GET /seed - Seed the database (development mode only)



