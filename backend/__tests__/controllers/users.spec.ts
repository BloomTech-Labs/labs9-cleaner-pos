import 'jest';
import request from 'supertest';
import app from '../../src/app';

import knex from 'knex';
import knexConfig from '../../knexfile';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';
import data from '../../data/seeds/data/usersData';
// Use testDb instead of DB defined in env
// TODO: Remove since webpack might be already doing this automatically
const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

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

describe('/user routes', () => {
  beforeAll(async () => {
    /*
    Applies migrations to in-memory database,
    then applies seeds.
    */
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  const cleanUp = async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  };

  test('GET request with no token returns a 403', (done) => {
    request(app)
      .get('/users/1')
      .expect(403, done);
  });

  test('PUT request with no token returns a 403', (done) => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    request(app)
      .put('/users/1')
      .send(newUser)
      .expect(403, done);
  });

  test('DELETE request with no token returns 403', (done) => {
    request(app)
      .delete('/users/2')
      .expect(403, done);
  });

  test('GET request with invalid id returns a 404', (done) => {
    request(app)
      .get('/users/99')
      .set(headers)
      .expect(404, done);
  });

  test('GET request with id returns a specific user', (done) => {
    request(app)
      .get('/users/1')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        done();
      });
  });

  // Test is being skipped because functionality was changed
  // Now `get` only returns one user based on ext_it
  test.skip('GET request with no id returns all users', (done) => {
    request(app)
      .get('/users')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(data.length);
        done();
      });
  });

  test('POST request is successful', (done) => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    request(app)
      .post('/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toBe(201);
        done();
      });
    // .expect(201 || 200, done);
  });

  test('PUT request is successful', (done) => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    request(app)
      .put('/users/1')
      .send(newUser)
      .set(headers)
      .expect(201)
      .then((res) => {
        expect(res.body).toBe(1);
        done();
      });
  });

  test('DELETE request is successful', (done) => {
    request(app)
      .delete('/users/2')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(1);
        done();
      });
  });
});
