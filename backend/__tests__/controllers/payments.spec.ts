import 'jest';
import request from 'supertest';
import app from '../../src/app';

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
  test('Should deny get request without auth token', async (done) => {
    try {
      const res = await request(app).get('/payments');

      expect(res.status).toBe(403);
      expect(res.body).not.toHaveProperty(
        'message',
        'Payment gateway up and running!',
      );
      done();
    } catch (e) {
      return e;
    }
  });

  test('Should deny post request without auth token', (done) => {
    request(app)
      .post('/payments')
      .then((res) => {
        expect(res.status).toBe(403);
        done();
      })
      .catch((e) => e);
  });

  test('Should return status 200 and message on get', async (done) => {
    try {
      const res = await request(app)
        .get('/payments')
        .set(headers);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        'message',
        'Payment gateway up and running!',
      );
      done();
    } catch (e) {
      return e;
    }
  });
  test('should return a status 400 if post without customer id', (done) => {
    request(app)
      .post('/payments')
      .set(headers)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty(
          'message',
          'Please include a valid token!',
        );
        done();
      })
      .catch((e) => e);
  });
  test.skip('should return a customer id & message on succesful subscription', (done) => {
    request(app)
      .post('/payments')
      .send({ id: 'tok-whatever' })
      .set(headers)
      .then((res) => {
        expect(res.body).toHaveProperty('customer', 'cus-123123132');
        expect(res.body).toHaveProperty('message');
        expect(res.status).toBe(201);
        done();
      })
      .catch((e) => e);
  });
});
