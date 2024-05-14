import request from 'supertest';

import { app } from '../../app';

// it('shows nothing', () => {
//   expect(1).toBeTruthy()
// })

it('fails when an email that does not exist is supplied', async () => {
  request(app)
    .post('/api/users/signin')
    .send({ email: 'tests@est.com', password: 'password' })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'tests@test.com', password: 'password' })
    .expect(201);

  request(app)
    .post('/api/users/signin')
    .send({ email: 'tests@test.com', password: 'oqedqd' })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'tests@test.com', password: 'password' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'tests@test.com', password: 'password' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
