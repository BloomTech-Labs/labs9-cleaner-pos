import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import {
  deleteUser,
  findUser,
  findUsers,
  makeUser,
  updateUser,
  findUserByExt_it,
} from '../../src/models/users';

// Data that was seeded into the test database
import data from '../../data/seeds/data/usersData';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

// Use testDb instead of DB defined in env
// TODO: Find way to define type for mockImplementation
// spyon is a lead, but only works on a particular method?
const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

const errorHandler = (e: Error) => {
  console.error(e);
};

interface User {
  id: number;
  //   ext_it: string;
  full_name: string;
  //   email: string;
  //   phone: number;
  //   created_at: string; // added by DB
  //   address: string;
  role: string;
}

describe('User DB functions', () => {
  let testUsersInDb: User[];

  beforeAll(async () => {
    /*
    Applies migrations to in-memory database,
    then applies seeds.
    */
    try {
      await testDb.migrate.latest();
      await testDb.seed.run();
      testUsersInDb = await findUsers();
    } catch (e) {
      errorHandler(e);
    }
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  test('findUser finds by id', async () => {
    // Arrange
    const testUser = data[0];
    const userId = 1;
    // Act
    const result = await findUser(userId).catch(errorHandler);
    // Assert
    expect(result.full_name).toBe(testUser.full_name);
  });

  test('findUserExtId finds by ext_id', async () => {
    // Arrange
    const testUser = data[0];
    const userExtId = String(testUser.ext_it);
    // Act
    const result = await findUserByExt_it(userExtId).catch(errorHandler);
    // Assert
    expect(result.full_name).toBe(testUser.full_name);
  });

  test('findUsers returns all users', async () => {
    // Act
    const result = await findUsers().catch(errorHandler);
    // Assert
    expect(result.length).toBe(data.length);

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
    const userResult = await findUsers().catch(errorHandler);
    const managerResult = await testDb('manager').catch(errorHandler);
    // Assert
    const testUser = { ...newUser, role: 'manager' };
    expect(userResult).toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)]),
    );
    expect(managerResult).toBeTruthy();
  });

  test('updateUser updates a user by ext_id', async () => {
    // Arrange
    const testUser = { ...data[0], ext_it: String(data[0].ext_it) };
    const idToUpdate = testUser.ext_it;
    const updatedInfo = { ...testUser, full_name: 'Willy Wonka' };
    const updateObj = { full_name: 'Willy Wonka' };
    // Act
    const numOfRecordsUpdated = await updateUser(idToUpdate, updateObj).catch(
      errorHandler,
    );
    const updatedUser = await findUserByExt_it(idToUpdate).catch(errorHandler);
    // Assert
    expect(numOfRecordsUpdated).toBe(1);
    expect(updatedUser).toEqual(expect.objectContaining(updatedInfo));
  });

  test('deleteUser removes a user from the database', async () => {
    // Arrange
    const testUser = testUsersInDb[0];
    const idToDelete = testUser.id;
    // Act
    const numOfRecords = await deleteUser(idToDelete).catch(errorHandler);
    const users = await findUsers().catch(errorHandler);
    // Assert
    expect(numOfRecords).toBe(1);
    expect(users).not.toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)]),
    );
  });
});
