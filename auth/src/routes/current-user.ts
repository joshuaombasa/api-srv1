import express, { NextFunction, Request, Response } from 'express';

const currentUserRouter = express.Router();

import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

currentUserRouter.get(
  '/api/users/currentuser',
  currentUser,
  // requireAuth,
  (request: Request, response: Response, next: NextFunction) => {
    response.send({ currentUser: request.currentUser || null });
  }
);

export { currentUserRouter };
