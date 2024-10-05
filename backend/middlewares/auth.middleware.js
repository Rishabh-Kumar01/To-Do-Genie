import jwt from "jsonwebtoken";
import { ValidationError, CustomError } from "../errors/custom.errors.js";

export const validateRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim() === "") {
    return next(new ValidationError("Username is required"));
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return next(new ValidationError("Valid email is required"));
  }

  if (!password || password.length < 8) {
    return next(
      new ValidationError("Password must be at least 8 characters long")
    );
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || username.trim() === "") {
    return next(new ValidationError("Username is required"));
  }

  if (!password || password.trim() === "") {
    return next(new ValidationError("Password is required"));
  }

  next();
};

export const validateChangePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || oldPassword.trim() === "") {
    return next(new ValidationError("Old password is required"));
  }

  if (!newPassword || newPassword.length < 8) {
    return next(
      new ValidationError("New password must be at least 8 characters long")
    );
  }

  if (oldPassword === newPassword) {
    return next(
      new ValidationError(
        "New password must be different from the old password"
      )
    );
  }

  next();
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new CustomError("Authentication token is required", 401));
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return next(new CustomError("Invalid or expired token", 403));
    }
    req.user = user;
    next();
  });
};
