import express, { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};

export { requireAuth };
