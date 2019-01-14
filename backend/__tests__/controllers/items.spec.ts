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

  test('Able to get all lists', (done) => {
    request(app)
      .get('/items')
      .set('Accept', 'application/json')
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
      .set('Accept', 'application/json')
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
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
