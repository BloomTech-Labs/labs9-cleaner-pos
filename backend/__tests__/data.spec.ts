import db from '../data/dbConfig';
import 'jest';
/* Due to setting more than 10 event listeners for the tests running
below line avoids a warning about a "possible memory leak" that is not existant*/
/* tslint:disable-next-line */
require('events').EventEmitter.defaultMaxListeners = 25;

describe('User schema is implemented correctly!', async () => {
  beforeEach(async () => {
    try {
      await db.migrate.rollback();
      await db.migrate.latest();
      await db.seed.run();
    } catch (e) {
      throw e;
    }
  });

  afterEach(async () => {
    try {
      await db.migrate.rollback();
    } catch (e) {
      throw e;
    }
  });

  test('should be able to create a User according to spec', async (done) => {
    const newUser = {
      address: 'Grossbeerenstr 9 14482 Potsdam Germany',
      email: 'pchang@gmail.com',
      full_name: 'Peter Chang',
      phone: '1012543453434',
      role: 'manager',
    };
    db('user')
      .insert(newUser)
      .then((id) => {
        done();
      })
      .catch((e) => done.fail(e));

    const user = await db('user')
      .where({ full_name: newUser.full_name })
      .first();

    expect(user).toMatchObject(newUser);
  });

  test('should be possible to delete a user!', async (done) => {
    /* Test plays off the knowledge that there are 3 seed users, deletes
    one and checks if 2 users are left */
    db('user')
      .where({ full_name: 'Harald Junke' })
      .del()
      .then((res) => done());

    const users = await db('user');

    expect(users.length).toBe(2);
  });

  test('should be possible to update a user!', async (done) => {
    db('user')
      .where({ full_name: 'Harald Junke' })
      .update({ email: 'HJunke@gmail.com' })
      .then(() => done());
    const user = await db('user')
      .where({ full_name: 'Harald Junke' })
      .first();
    expect(user).toHaveProperty('email', 'HJunke@gmail.com');
  });

  test('seedData should match what is in the database', async () => {
    const users = await db('user');

    expect(users[0].full_name).toBe('Harald Junke');
    expect(users[1].full_name).toBe('Gerhard Schroeder');
    expect(users[2].full_name).toBe('Guenter Jauch');
    expect(users.length).toBe(3);
  });

  test('should be able to find a user', async () => {
    const user = await db('user')
      .where({ full_name: 'Harald Junke' })
      .first();

    expect(user.full_name).toBe('Harald Junke');
  });
});
