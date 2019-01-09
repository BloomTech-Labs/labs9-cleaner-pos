// From https://github.com/Jamaks/koa-knex-typescript-example/blob/master/src/server/db/services/movies.service.ts
import * as knex from 'knex';

interface User {
  //   id: number;
  //   ext_it: string;
  full_name: string;
  //   email: string;
  //   phone: number;
  //   created_at: string; // added by DB
  //   address: string;
  //   role: string;
}

const userModels = (db: knex) => {
  // DB helper functions
  function findUser(id: number): knex.QueryBuilder {
    return db('user')
      .first()
      .where({ id });
  }

  function findUsers(): knex.QueryBuilder {
    return db('user');
  }

  function makeUser(user: User): knex.QueryBuilder {
    return db('user').insert(user);
  }

  return {
    findUser,
    findUsers,
    makeUser,
  };
};

export default userModels;
