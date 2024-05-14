import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';
import { validateRequest } from '../middleware/validate-request';


import { BadRequestError } from '../errors/bad-request-error';

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {

    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatches = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatches) {
      throw new BadRequestError('Invalid credentials');
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.send({
      id: existingUser.id,
      email: existingUser.email,
    });
  }
);

export { signinRouter };
