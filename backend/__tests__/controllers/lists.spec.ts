import 'jest';
import request from 'supertest';
import app from '../../src/app';
const supertest = request(app);

import knex from 'knex';
import knexConfig from '../../knexfile';

import jwt from 'jsonwebtoken';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

// Temporary access token to test authentication
const token: string = jwt.sign(
  {
    // Token expires in 2 minutes
    exp: Math.floor(Date.now() / 1000) + 60 * 2,
    ext_it: '1',
    full_name: 'Harald Junke',
    id: 1,
  },
  process.env.JWT_SECRET || '',
);

// Headers to send with 'set' with supertest
const headers = { Authorization: token, Accept: 'application/json' };

describe('/list routes', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('get request fails if there is no token', async () => {
    await supertest.get('/lists/1').expect(403);
  });

  test('post request fails if there is no token', async () => {
    const newList = {
      house_id: 1,
      type: 'before',
    };
    await supertest
      .post('/lists/')
      .send(newList)
      .expect(403);
  });

  test('delete request fails if there is no token', async () => {
    await supertest.delete('/lists/1').expect(403);
  });

  test('asking for lists on house that isnt reall returns 404', async () => {
    await supertest
      .get('/lists/111')
      .set(headers)
      .expect(404);
  });

  test('when given a valid house, should return all lists and 200', async () => {
    const { body } = await supertest
      .get('/lists/1')
      .set(headers)
      .expect(200);
    expect(body).toHaveProperty('after');
    expect(body).toHaveProperty('before');
    expect(body).toHaveProperty('during');
    expect(Object.keys(body.during[0])).toHaveLength(3);
    expect(Object.keys(body.before[0])[0]).toBe('list_id');
  });

  test('when given a valid stay, should return all lists and 200', async () => {
    const { body } = await supertest
      .get('/lists/1?stay=true')
      .set(headers)
      .expect(200);
    expect(body).toHaveProperty('after');
    expect(body).toHaveProperty('before');
    expect(body).toHaveProperty('during');
    expect(Object.keys(body.during[0])).toHaveLength(4);
    expect(Object.keys(body.before[0])[0]).toBe('complete');
  });

  test('when posting new before list to house that already has before list, receive 400', async () => {
    const newList = {
      house_id: 1,
      type: 'before',
    };
    await supertest
      .post('/lists/')
      .send(newList)
      .set(headers)
      .expect(400);
  });

  test('able to delete list', async () => {
    await supertest
      .delete('/lists/1')
      .set(headers)
      .expect(200);
  });

  test('able to post a list', async () => {
    const newList = {
      house_id: 1,
      type: 'before',
    };
    await supertest
      .post('/lists/')
      .send(newList)
      .set(headers)
      .expect(201);
  });
});
