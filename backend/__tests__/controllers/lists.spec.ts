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
  test('asking for lists on house that isnt reall returns 404', (done) => {
    request(app)
      .get('/lists/111')
      .set('Accept', 'application/json')
      .expect(404, done);
  });
  test('when given a valid house, should return all lists and 200', (done) => {
    request(app)
      .get('/lists/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        expect(Object.keys(body.during[0])).toHaveLength(2);
        expect(Object.keys(body.before[0])[0]).toBe('task');
        done();
      });
  });
  test('when given a valid stay, should return all lists and 200', (done) => {
    request(app)
      .get('/lists/1?stay=true')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        expect(Object.keys(body.during[0])).toHaveLength(4);
        expect(Object.keys(body.before[0])[0]).toBe('complete');
        done();
      });
  });
});
