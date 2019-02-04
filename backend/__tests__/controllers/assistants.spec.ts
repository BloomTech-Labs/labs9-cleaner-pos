import 'jest';
import request from 'supertest';
import app from '../../src/app';
import data from '../../data/seeds/data/assistantsData';
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
    exp: Math.floor(Date.now() / 1000) + 60 * 2,
    ext_it: '1',
    full_name: 'Harald Junke',
    id: 1,
  },
  process.env.JWT_SECRET || '',
);

// Headers to send with 'set' with supertest
const headers = { Authorization: token, Accept: 'application/json' };

describe('/assistant routes', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('get all ast return 403 if no token', (done) => {
    request(app)
      .get('/assistants')
      .expect(403, done);
  });

  test('get all ast', (done) => {
    request(app)
      .get('/assistants')
      .set(headers)
      .expect(200, done);
  });

  test('returns the correct number of asts', (done) => {
    request(app)
      .get('/assistants')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        done();
      });
  });

  test('get all ast return 403 if no token', (done) => {
    request(app)
      .get('/assistants/1')
      .expect(403, done);
  });

  test('get one ast', (done) => {
    request(app)
      .get('/assistants/1')
      .set(headers)
      .expect(200, done);
  });

  test('get correct ast by id', (done) => {
    request(app)
      .get('/assistants/1')
      .set(headers)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.user_id).toBe(data[0].user_id);
        done();
      });
  });
});
