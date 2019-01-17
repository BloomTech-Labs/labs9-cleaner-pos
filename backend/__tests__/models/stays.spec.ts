import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import {
  findAllStays,
  findStaySummary,
  postStayData,
  putStayData,
  deleteStayData,
} from '../../src/models/stays';

// Data that was seeded into the test database
import usersData from '../../data/seeds/data/usersData';
import housesData from '../../data/seeds/data/housesData';
import staysData from '../../data/seeds/data/staysData';

// Error handler function
const errorHandler = (e: Error) => {
  console.log(e);
};

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';
import { findStaySummaryStandardized } from '../../src/models/stays/stays';

// Use testDb instead of DB defined in env
// TODO: Find way to define type for mockImplementation
// spyon is a lead, but only works on a particular method?
const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

interface Stay {
  id?: number;
  guest_id: number;
  house_id: number;
  extra_guests?: number;
  check_in?: string;
  check_out?: string;
  url_id?: string;
  created_at?: string;
}

describe('Stay DB functions', () => {
  beforeAll(async () => {
    /*
    Applies migrations to in-memory database,
    then applies seeds.
    */
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (e) {
      throw e;
    }
  });

  test('findStaySummary returns appropriate data', async () => {
    // Arange
    const stayIdinDb = 1;
    const testStay = staysData[stayIdinDb - 1]; // - 1 to for 0-based indexing
    const testUser = usersData[testStay.guest_id - 1];
    const testHouse = housesData[testStay.house_id - 1];
    // Act
    const result = await findStaySummary(stayIdinDb).catch((e) => e);
    // Assert
    expect(result.guestName).toBe(testUser.full_name);
    expect(result.houseName).toBe(testHouse.name);
  });

  test('findStaySummaryStandardized returns appropriate data formatted to match rest of DB', async () => {
    // Arange
    const stayIdinDb = 1;
    const testStay = staysData[stayIdinDb - 1]; // - 1 to for 0-based indexing
    const testUser = usersData[testStay.guest_id - 1];
    const testHouse = housesData[testStay.house_id - 1];
    // Act
    const result = await findStaySummaryStandardized(stayIdinDb).catch(
      (e) => e,
    );
    // Assert
    expect(result.guest_name).toBe(testUser.full_name);
    expect(result.house_name).toBe(testHouse.name);
    expect(result.house_address).toBe(testHouse.address);
    expect(result).toHaveProperty('default_ast');
    expect(result).toHaveProperty('guest_guide');
    expect(result).toHaveProperty('ast_guide');
  });

  test('findAllStays finds all upcoming guests of a user', async () => {
    // Arrange
    const extIt = '1'; // Harald Junke
    // Seed data has three upcoming guests for this user
    // Act
    const result = await findAllStays(extIt).catch(errorHandler);
    // Assert
    expect(result.length).toBe(3);
    const sampleObj = result[0];
    expect(sampleObj).toHaveProperty('stayId');
    expect(sampleObj).toHaveProperty('houseId');
    expect(sampleObj).toHaveProperty('guestName');
    expect(sampleObj).toHaveProperty('houseName');
    expect(sampleObj).toHaveProperty('checkIn');
    expect(sampleObj).toHaveProperty('checkOut');
  });

  test('postStayData posts data to DB', async () => {
    // Arrange
    const stayIdinDb = 1;
    const testStay = staysData[stayIdinDb - 1]; // - 1 to for 0-based indexing

    const newStay = {
      check_in: '2/1/2019',
      check_out: '2/5/2019',
      extra_guests: 3,
      guest_id: testStay.guest_id,
      house_id: testStay.house_id,
    };
    // Act
    let resultIds: number[];
    let result: Stay[];
    try {
      resultIds = await postStayData(newStay);
      result = await testDb('stay');
    } catch (e) {
      throw e;
    }
    const resultId = resultIds[0];
    // Assert
    expect(resultId).toBeTruthy();
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(newStay)]),
    );
  });

  test('putStayData edits data to DB', async () => {
    // Arrange
    const stayIdinDb = 1;
    const testStay = staysData[stayIdinDb - 1];
    const updatedStay = { ...testStay, check_out: '2/8/2019' };
    // Act
    let count: number;
    let result: Stay;
    try {
      count = await putStayData(stayIdinDb, updatedStay);
      result = await testDb('stay')
        .where({ id: stayIdinDb })
        .first();
    } catch (e) {
      throw e;
    }
    // Assert
    expect(count).toBe(1);
    expect(result).toEqual(expect.objectContaining(updatedStay));
  });

  test('deleteStayData removes data to DB', async () => {
    const stayIdinDb = 1;
    const testStay = staysData[stayIdinDb - 1];
    // Act
    let count: number;
    let result: Stay[];
    try {
      count = await deleteStayData(stayIdinDb);
      result = await testDb('stay');
    } catch (e) {
      throw e;
    }
    // Assert
    expect(count).toBe(1);
    expect(result).not.toEqual(
      expect.arrayContaining([expect.objectContaining(testStay)]),
    );
  });
});
