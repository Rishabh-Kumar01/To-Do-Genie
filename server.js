import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import taskController from "./backend/controllers/task.controller.js";
import { CustomError } from "./backend/errors/custom.errors.js";
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} from "./backend/middlewares/task.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/taskmanager")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/tasks", validateCreateTask, taskController.createTask);
app.get("/tasks", taskController.getAllTasks);
app.get("/tasks/:id", validateTaskId, taskController.getTaskById);
app.put(
  "/tasks/:id",
  validateTaskId,
  validateUpdateTask,
  taskController.updateTask
);
app.delete("/tasks/:id", validateTaskId, taskController.deleteTask);

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
