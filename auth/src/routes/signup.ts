import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
const signupRouter = express.Router();
import { User } from '../models/user';
import { validateRequest } from '../middleware/validate-request';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        'Password must have a length of between 4 and 20 characters'
      ),
  ],
  validateRequest,
  async (request: Request, response: Response) => {

    const { email, password } = request.body;

    await User.deleteMany({});

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    const user = User.build({ email, password });
    const savedUser = await user.save();

    // sign jwt key

    const jwtToken = jwt.sign(
      {
        id: savedUser.id,
        email: savedUser.email,
      },
      'asdf'
    );

    // store jwt on session object

    request.session = { jwt: jwtToken };

    response.send({ savedUser });
  }
);

export { signupRouter };
