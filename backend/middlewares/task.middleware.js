import { ValidationError } from "../errors/custom.errors.js";

export const validateCreateTask = (req, res, next) => {
  const { title, status, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return next(new ValidationError("Title is required"));
  }

  if (status && !["pending", "completed"].includes(status)) {
    return next(
      new ValidationError('Invalid status. Must be "pending" or "completed"')
    );
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return next(new ValidationError("Invalid due date format"));
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, status, dueDate } = req.body;

  if (title && title.trim() === "") {
    return next(new ValidationError("Title cannot be empty"));
  }

  if (status && !["pending", "completed"].includes(status)) {
    return next(
      new ValidationError('Invalid status. Must be "pending" or "completed"')
    );
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return next(new ValidationError("Invalid due date format"));
  }

  next();
};

export const validateTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ValidationError("Invalid task ID"));
  }

  next();
};

export const validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if ((page && isNaN(page)) || page < 1) {
    return next(new ValidationError("Invalid page number"));
  }

  if ((limit && isNaN(limit)) || limit < 1) {
    return next(new ValidationError("Invalid limit number"));
  }

  next();
};
