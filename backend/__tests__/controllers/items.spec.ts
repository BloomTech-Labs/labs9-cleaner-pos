import 'jest';
import request from 'supertest';
import app from '../../src/app';

import knex from 'knex';
import knexConfig from '../../knexfile';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

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

describe('/item routes', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('Unable to get all lists without token', (done) => {
    request(app)
      .get('/items')
      .expect(403, done);
  });

  test('Unable to get single lists without token', (done) => {
    request(app)
      .get('/items/1')
      .expect(403, done);
  });

  test('Unable to post without token', (done) => {
    const newItem = {
      list_id: 258,
      task: 'lions tigers and snakes',
    };
    request(app)
      .post('/items/')
      .send(newItem)
      .expect(403, done);
  });

  test('Unable to delete item without token', (done) => {
    request(app)
      .delete('/items/5')
      .expect(403, done);
  });

  test('Unable to put item without token', (done) => {
    const newItem = {
      list_id: 299,
      task: 'lions tigers and snakes',
    };
    request(app)
      .put('/items/599')
      .send(newItem)
      .expect(403, done);
  });

  test('Able to get all lists', (done) => {
    request(app)
      .get('/items')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        expect(Object.keys(body[0])).toHaveLength(3);
        done();
      });
  });

  test('Able to get single lists', (done) => {
    request(app)
      .get('/items/1')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        expect(Object.keys(body[0])).toHaveLength(3);
        done();
      });
  });

  test('Unable to get single lists of unreal item', (done) => {
    request(app)
      .get('/items/199')
      .set(headers)
      .expect(404, done);
  });

  test('unable to post if valid List id isnt given', (done) => {
    const newItem = {
      list_id: 258,
      task: 'lions tigers and snakes',
    };
    request(app)
      .post('/items/')
      .send(newItem)
      .set(headers)
      .expect(400, done);
  });

  test('able to delete item', (done) => {
    request(app)
      .delete('/items/5')
      .set(headers)
      .expect(200, done);
  });

  test('unable to put item when invalid list_id is given', (done) => {
    const newItem = {
      list_id: 299,
      task: 'lions tigers and snakes',
    };
    request(app)
      .put('/items/599')
      .set(headers)
      .send(newItem)
      .expect(400, done);
  });
});
