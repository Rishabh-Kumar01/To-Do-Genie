import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import taskController from "./backend/controllers/task.controller.js";
import { seedDatabaseController } from "./backend/controllers/seed.controller.js";
import authController from "./backend/controllers/auth.controller.js";
import { CustomError } from "./backend/errors/custom.errors.js";
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} from "./backend/middlewares/task.middleware.js";
import {
  authenticateToken,
  validateRegistration,
  validateLogin,
  validateChangePassword,
} from "./backend/middlewares/auth.middleware.js";
import { ensureDevelopmentMode } from "./backend/middlewares/dev.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth routes
app.post("/register", validateRegistration, authController.register);
app.post("/login", validateLogin, authController.login);
app.post("/logout", authenticateToken, authController.logout);
app.post("/refresh-token", authController.refreshToken);
app.post(
  "/change-password",
  authenticateToken,
  validateChangePassword,
  authController.changePassword
);

// Task routes
app.post(
  "/tasks",
  authenticateToken,
  validateCreateTask,
  taskController.createTask
);
app.get("/tasks", authenticateToken, taskController.getAllTasks);
app.get(
  "/tasks/:id",
  authenticateToken,
  validateTaskId,
  taskController.getTaskById
);
app.put(
  "/tasks/:id",
  authenticateToken,
  validateTaskId,
  validateUpdateTask,
  taskController.updateTask
);
app.delete(
  "/tasks/:id",
  authenticateToken,
  validateTaskId,
  taskController.deleteTask
);

// Seed route (development only)
app.get("/seed", ensureDevelopmentMode, seedDatabaseController);

// Catch-all route for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      status: 404,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message: message,
      status: statusCode,
      timestamp: new Date().toISOString(),
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Home route
app.get("/", (req, res) => {
  res.send("Task Manager API");
});
