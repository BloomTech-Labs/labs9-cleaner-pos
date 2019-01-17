import 'jest';
import request from 'supertest';
import app from '../../src/app';
import { exec } from 'child_process';

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

describe('/payments routes', () => {
  test('Should return status 200 and message on get', async (done) => {
    try {
      const res = await request(app)
        .get('/payments')
        .set('Accept', 'application/json');

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
      .set('Accept', 'application/json')
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
  test('should return a customer id & message on succesful subscription', (done) => {
    request(app)
      .post('/payments')
      .set('Accept', 'application/json')
      .send({ id: 'tok-whatever' })
      .then((res) => {
        expect(res.body).toHaveProperty('customer', 'cus-123123132');
        expect(res.body).toHaveProperty('message');
        expect(res.status).toBe(201);
        done();
      })
      .catch((e) => e);
  });
});
