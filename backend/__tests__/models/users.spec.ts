import 'jest';
import knex from 'knex';
import knexConfig from '../../knexfile';
import models from '../../src/models/users';

// Data that was seeded into the test database
import data from '../../data/seeds/data/usersData';

const testDb = knex(knexConfig.test);

const { findUser, findUsers, makeUser } = models(testDb);

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
    };
    // Act
    await makeUser(newUser);
    const result = await findUsers();
    // Assert
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(newUser)]),
    );
  });
});
