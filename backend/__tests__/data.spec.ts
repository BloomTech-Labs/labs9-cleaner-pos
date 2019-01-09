import db from '../data/dbConfig';
// jest.setTimeout(20000);

describe('Users schema is implemented correctly!', () => {
  beforeEach(async (done) => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .finally(() => done());
  });
  afterEach(async () => {
    return await db.migrate.rollback();
  });

  test('Users should match seeded Users!', (done) => {
    const users = [
      { full_name: 'Harald Junke' },
      { full_name: 'Gerhard Schroeder' },
      { full_name: 'Guenter Jauch' },
    ];

    /* The above array is the same as the seed data
    In the for-loop below we compare all users that are in our user
    table with the seed data in order to confirm the seed to be working
    */

    db('user')
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          expect(res[i].full_name).toBe(users[i].full_name);
        }
        done();
      })
      /* tslint:disable-next-line */
      .catch((e) => done.fail(e));
  });
  test('should be able to create a User and provide info provided in the schema', async (done) => {
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
});
