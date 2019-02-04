import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import {
  findLists,
  findListsStay,
  postList,
  putList,
  deleteList,
  justListsByHouse,
} from '../../src/models/lists';
import { List } from '../../src/interface';
import data from '../../data/seeds/data/listsData';
// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

// Use testDb instead of DB defined in env
// TODO: Find way to define type for mockImplementation
// spyon is a lead, but only works on a particular method?
const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));
const newHouse: List = {
  house_id: 1,
  type: 'before',
};

describe('List DB functions', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('Find Lists', async () => {
    try {
      const find = await findLists(1);
      expect(Object.keys(find)[0]).toBe('before');
    } catch (e) {
      throw Error(e);
    }
  });

  test('Find Lists for stay', async () => {
    try {
      const find: any = await findListsStay(1, 1);
      expect(Object.keys(find)[0]).toBe('before');
    } catch (e) {
      throw Error(e);
    }
  });

  test('Able to post a new list', async () => {
    try {
      const makeList: number[] = await postList(newHouse);
      expect(makeList[0]).toBe(data.length + 1);
    } catch (e) {
      throw Error(e);
    }
  });

  test('Able to delete a new list', async () => {
    try {
      const delList: number[] = await deleteList(13);
      const findDel = await testDb('list').where({ id: 13 });
      expect(delList).toBe(1);
      expect(findDel).toHaveLength(0);
    } catch (e) {
      throw Error(e);
    }
  });
});
