import 'jest';
import request from 'supertest';
import app from '../../src/app';
import data from '../../data/seeds/data/housesData';
import knex from 'knex';
import knexConfig from '../../knexfile';
import jwt from 'jsonwebtoken';
const supertest = request(app);

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

// Temporary access token to test authentication
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

describe('/house routes', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('GET request is denied with no token', async () => {
    await supertest.get('/houses').expect(403);
  });

  test('POST test request is denied with no token', async () => {
    const newHouse = {
      address: 'See my test, see my test, made from real gorilla chest',
      cleaning_fee: 65,
      extra_guest_fee: 30,
      name: 'house name 55',
      price: 959.55,
    };

    await supertest
      .post('/houses?test=true')
      .send(newHouse)
      .expect(403);
  });

  test('PUT request is denied with no token', async () => {
    const newHouse = {
      address: 'See my test, see my test, made from real gorilla chest',
      cleaning_fee: 65,
      extra_guest_fee: 30,
      name: 'house name 55',
      price: 959.55,
    };

    await supertest
      .put('/houses/1')
      .send(newHouse)
      .expect(403);
  });

  test('DELETE request is denied with no token', async () => {
    await supertest.delete('/houses/2').expect(403);
  });

  test('GET request with no id returns all houses', async () => {
    const response = await supertest
      .get('/houses')
      .set(headers)
      .expect(200);
    expect(response.body.length).toBe(3);
  });

  test('Get request with id returns a specific user', async () => {
    const response = await supertest
      .get('/houses/1')
      .set(headers)
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('manager');
  });

  test('Get request with user query returns houses of which the user ID matches default_ast', async () => {
    const { body } = await supertest
      .get('/houses/1?user=true')
      .set(headers)
      .expect(200);
    expect(body.default_ast).toBe(1);
    expect(body.name).toBe('house name 1');
  });

  test('Get request with invalid id returns a 404', async () => {
    await supertest
      .get('/houses/69')
      .set(headers)
      .expect(404);
  });

  test('POST test request is successful', async () => {
    const newHouse = {
      address: 'See my test, see my test, made from real gorilla chest',
      cleaning_fee: 65,
      extra_guest_fee: 30,
      name: 'house name 55',
      price: 959.55,
    };
    await supertest
      .post('/houses?test=true')
      .send(newHouse)
      .set(headers)
      .expect(201);
    const { body } = await supertest
      .get(`/houses/${data.length + 1}`)
      .set(headers)
      .expect(200);
    expect(body.address).toBe(
      'See my test, see my test, made from real gorilla chest',
    );
  });

  // TODO: Write more POST tests

  test('PUT request is successful', async () => {
    const newHouse = {
      address: 'See my test, see my test, made from real gorilla chest',
      cleaning_fee: 65,
      extra_guest_fee: 30,
      name: 'house name 55',
      price: 959.55,
    };
    await supertest
      .put('/houses/1')
      .send(newHouse)
      .set(headers)
      .expect(201);

    const { body } = await supertest
      .get('/houses/1')
      .set(headers)
      .expect(200);
    expect(body.address).toBe(
      'See my test, see my test, made from real gorilla chest',
    );
  });

  test('DELETE request is successful', async () => {
    const { body } = await supertest
      .delete('/houses/2')
      .set(headers)
      .expect(200);
    expect(body).toBe(1);
  });
});
