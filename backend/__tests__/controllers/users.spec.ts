import 'jest';
import request from 'supertest';
import app from '../../src/app';
const supertest = request(app);

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

  test('GET request with no token returns a 403', async () => {
    await supertest.get('/users/1').expect(403);
  });

  test('PUT request with no token returns a 403', async () => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    await supertest
      .put('/users/1')
      .send(newUser)
      .expect(403);
  });

  test('DELETE request with no token returns 403', async () => {
    await supertest.delete('/users/2').expect(403);
  });

  test('GET request with invalid id returns a 404', async () => {
    const faultyToken: string = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 2,
        ext_it: '1',
        full_name: 'Harald Junke',
        id: 5123513,
      },
      process.env.JWT_SECRET || '',
    );
    const wrongHeaders = {
      Accept: 'application/json',
      Authorization: faultyToken,
    };
    await supertest
      .get('/users/99')
      .set(wrongHeaders)
      .expect(404);
  });

  test('GET request with id returns a specific user', async () => {
    const { body } = await supertest
      .get('/users/1')
      .set(headers)
      .expect(200);
    expect(body).toHaveProperty('id');
  });

  // Test is being skipped because functionality was changed
  // Now `get` only returns one user based on ext_it
  test.skip('GET request with no id returns all users', async () => {
    const { body } = await supertest
      .get('/users')
      .set(headers)
      .expect(200);
    expect(body.length).toBe(data.length);
  });

  test('POST request is successful', async () => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    await supertest
      .post('/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201);
    // .expect(201 || 200);
  });

  test('PUT request is successful', async () => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    const { body } = await supertest
      .put('/users/1')
      .send(newUser)
      .set(headers)
      .expect(201);
    expect(body).toBe(1);
  });

  test('DELETE request is successful', async () => {
    await supertest
      .delete('/users/2')
      .set(headers)
      .expect(200);
  });
});
