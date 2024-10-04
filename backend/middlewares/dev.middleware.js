import { CustomError } from '../errors/custom.errors.js';

export const ensureDevelopmentMode = (req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    return next(new CustomError('This route is only available in development mode', 403));
  }
  next();
};