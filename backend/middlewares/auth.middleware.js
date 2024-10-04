import jwt from "jsonwebtoken";
import { CustomError } from "../errors/custom.errors.js";

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
