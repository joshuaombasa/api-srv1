import request from 'supertest';

import { app } from '../../app';

it('it responds with details about the current user', async () => {

  const cookie = await global.signin()

  const signupresponse = await request(app)
    .post('/api/users/signup')
    .send({ email: 'tests@test.com', password: 'password' })
    .expect(201);


  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('tests@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
});
