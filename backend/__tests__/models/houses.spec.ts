import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import {
  findHouse,
  findHouses,
  makeHouse,
  updateHouse,
  deleteHouse,
  findAllHousesByAstId,
} from '../../src/models/houses';
import { House } from '../../src/interface';
import data from '../../data/seeds/data/housesData';
// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

// Use testDb instead of DB defined in env
// TODO: Find way to define type for mockImplementation
// spyon is a lead, but only works on a particular method?
const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));
const newHouse: House = {
  address: 'See my test, see my test, made from real gorilla chest',
  cleaning_fee: 65,
  extra_guest_fee: 30,
  name: 'King Ding',
  price: 959.55,
};
describe('Houses DB functions', () => {
  beforeAll(async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('Find All houses', async () => {
    try {
      const find = await findHouses([1]);
      expect(find.length).toBe(3);
    } catch (e) {
      throw Error(e);
    }
  });

  test('Find All houses from assistant user ID', async () => {
    try {
      const find = await findAllHousesByAstId(1);
      expect(find.length).toBe(1);
      expect(find[0].default_ast).toBe(1);
      expect(find[0].name).toBe('house name 1');
    } catch (e) {
      throw e;
    }
  });

  test('Find One house', async () => {
    try {
      const find = await findHouse(1);
      expect(find.name).toBe(data[0].name);
    } catch (e) {
      throw Error(e);
    }
  });
  test('Make One house', async () => {
    try {
      await makeHouse(newHouse);
      const find = await findHouse(data.length + 1);
      expect(find.name).toBe(newHouse.name);
    } catch (e) {
      throw Error(e);
    }
  });

  test('update one house', async () => {
    try {
      const newHouseId = { ...newHouse, id: 1 };
      await updateHouse(newHouseId);
      const find = await findHouse(1);
      expect(find.name).toBe(newHouse.name);
    } catch (e) {
      throw Error(e);
    }
  });

  test('delete one house', async () => {
    try {
      await deleteHouse(1);
      const find = await findHouse(1);
      expect(find).toBe(undefined);
    } catch (e) {
      throw Error(e);
    }
  });
});
