import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { findStaySummary } from '../../src/models/stays';

// Data that was seeded into the test database
import usersData from '../../data/seeds/data/usersData';
import housesData from '../../data/seeds/data/housesData';
import staysData from '../../data/seeds/data/staysData';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

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
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  test('findStaySummary returns appropriate data', async () => {
    // Arange
    const stayIdinDb = 1;
    const testStay = staysData[stayIdinDb - 1]; // - 1 to for 0-based indexing
    const testUser = usersData[testStay.guest_id - 1];
    const testHouse = housesData[testStay.house_id - 1];
    // Act
    const result = await findStaySummary(stayIdinDb).catch((e) => {
      throw e;
    });
    // Assert
    expect(result.guest).toBe(testUser.full_name);
    expect(result.house).toBe(testHouse.name);
  });
});
