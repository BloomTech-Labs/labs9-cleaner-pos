import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import {
  deleteUser,
  findUser,
  findUsers,
  makeUser,
} from '../../src/models/users';

// Data that was seeded into the test database
import data from '../../data/seeds/data/usersData';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

// Use testDb instead of DB defined in env
const testDb = knex(knexConfig.test);
// TODO: Find way to define type for mockImplementation
// spyon is a lead, but only works on a particular method?
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

describe('User DB functions', () => {
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

  test('findUser finds by id', async () => {
    // Act
    const result = await findUser(1);
    // Assert
    expect(result.full_name).toBe(data[0].full_name);
  });

  test('findUsers returns all users', async () => {
    // Act
    const result = await findUsers();
    // Assert
    expect(result.length).toBe(3);

    for (const i of result.keys()) {
      expect(result[i].full_name).toBe(data[i].full_name);
    }
  });

  test('makeUser inserts a user into the DB', async () => {
    // Arrange
    const newUser = {
      full_name: 'Ronaldo Lebagel',
      role: 'manager',
    };
    // Act
    await makeUser(newUser);
    const userResult = await findUsers();
    const managerResult = await testDb('manager');
    // Assert
    const testUser = { ...newUser, role: 'manager' };
    expect(userResult).toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)]),
    );
    console.log('managerResult:', managerResult);
    expect(managerResult).toBeTruthy();
  });

  test('deleteUser removes a user from the database', async () => {
    // Arrange
    const testUser = await findUser(1);
    const idToDelete = testUser.id;
    // Act
    const numOfRecords = await deleteUser(idToDelete);
    const users = await findUsers();
    // Assert
    expect(numOfRecords).toBe(1);
    expect(users).not.toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)]),
    );
  });
});
