import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const currentUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(request.session?.jwt, 'asdf') as UserPayload;
    request.currentUser = payload;
  } catch (error) {}

  next();
};

export { currentUser };
