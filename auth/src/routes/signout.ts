import express from 'express';

const signoutRouter = express.Router();

signoutRouter.post('/api/users/signout', (request, response) => {
  request.session = null;

  response.send({});
});

export { signoutRouter };
