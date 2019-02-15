import 'jest';
import request from 'supertest';
import app from '../../src/app';
const supertest = request(app);

// Temporary access token to test authentication
import jwt from 'jsonwebtoken';

const token: string = jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 2,
    ext_it: '1',
    full_name: 'Harald Junke',
    id: 1,
  },
  process.env.JWT_SECRET || '',
);

// Headers to send with 'set' with supertest
const headers = { Authorization: token, Accept: 'application/json' };

jest.mock('stripe', () => () => {
  return {
    customers: {
      create: () =>
        Promise.resolve({
          id: 'cus-123123132',
        }),
    },
    subscriptions: {
      create: () =>
        Promise.resolve({
          success: true,
        }),
    },
  };
});

// jest.mock('addSub', () => () => {
//   return Promise.resolve(0);
// });

describe('/payments routes', () => {
  test('Should return status 403 and no message on get', async () => {
    try {
      const { body } = await await supertest.get('/payments').expect(403);

      expect(body).not.toHaveProperty(
        'message',
        'Payment gateway up and running!',
      );
    } catch (e) {
      return e;
    }
  });

  test('Should deny post request without auth token', async () => {
    await supertest.post('/payments').expect(403);
  });

  test('should return a status 400 if post without customer id', async () => {
    const { body } = await supertest
      .post('/payments')
      .set(headers)
      .expect(400);
    expect(body).toHaveProperty('message', 'Please include a valid token!');
  });

  test('should not return a customer id & message on succesful subscription given invalid token', async () => {
    await supertest
      .post('/payments')
      .send({ id: 'tok-whatever' })
      .set(headers)
      .expect(400);
  });
});
