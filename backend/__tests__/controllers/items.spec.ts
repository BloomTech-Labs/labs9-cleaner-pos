import 'jest';
import request from 'supertest';
import app from '../../src/app';

import knex from 'knex';
import knexConfig from '../../knexfile';
const supertest = request(app);

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

  test('Unable to get all lists without token', async () => {
    await supertest
      .get('/items')
      .expect(403)
      .catch((e) => {
        throw e;
      });
  });

  test('Unable to get single lists without token', async () => {
    await supertest
      .get('/items/1')
      .expect(403)
      .catch((e) => {
        throw e;
      });
  });

  test('Unable to post without token', async () => {
    const newItem = {
      list_id: 258,
      task: 'lions tigers and snakes',
    };
    await supertest
      .post('/items/')
      .send(newItem)
      .expect(403)
      .catch((e) => {
        throw e;
      });
  });

  test('Unable to delete item without token', async () => {
    await supertest
      .delete('/items/5')
      .expect(403)
      .catch((e) => {
        throw e;
      });
  });

  test('Unable to put item without token', async () => {
    const newItem = {
      list_id: 299,
      task: 'lions tigers and snakes',
    };
    supertest
      .put('/items/599')
      .send(newItem)
      .expect(403)
      .catch((e) => {
        throw e;
      });
  });

  test('Able to get all lists', async () => {
    const { body } = await supertest
      .get('/items')
      .set(headers)
      .expect(200)
      .catch((e) => {
        throw e;
      });

    expect(body).toHaveProperty('length');
    expect(Object.keys(body[0])).toHaveLength(3);
  });

  test('Able to get single lists', async () => {
    const { body } = await supertest
      .get('/items/1')
      .set(headers)
      .expect(200)
      .catch((e) => {
        throw e;
      });
    expect(body).toHaveProperty('length');
    expect(Object.keys(body[0])).toHaveLength(3);
  });

  test('Unable to get single lists of unreal item', async () => {
    await supertest
      .get('/items/199')
      .set(headers)
      .expect(404)
      .catch((e) => {
        throw e;
      });
  });

  test('unable to post if valid List id isnt given', async () => {
    const newItem = {
      list_id: 258,
      task: 'lions tigers and snakes',
    };
    await supertest
      .post('/items/')
      .send(newItem)
      .set(headers)
      .expect(400)
      .catch((e) => {
        throw e;
      });
  });

  test('able to delete item', async () => {
    await supertest
      .delete('/items/5')
      .set(headers)
      .expect(200)
      .catch((e) => {
        throw e;
      });
  });

  test('unable to put item when invalid list_id is given', async () => {
    const newItem = {
      list_id: 299,
      task: 'lions tigers and snakes',
    };
    await supertest
      .put('/items/599')
      .set(headers)
      .send(newItem)
      .expect(400)
      .catch((e) => {
        throw e;
      });
  });
});
