import { NextFunction, Request, Response, Router } from 'express';
import { registerUser, loginUser } from './controllers/userController';

const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res)).catch(next);
  };

export const initCachedReportRoutes = () => {
  const router = Router();
  router.post('/register', asyncHandler(registerUser));
  router.post('/login', asyncHandler(loginUser));
  return router;
};
