// From https://github.com/Jamaks/koa-knex-typescript-example/blob/master/src/server/db/services/movies.service.ts
import * as knex from 'knex';
import Bluebird from 'bluebird';
import db from '../../data/dbConfig';

interface User {
  //   id: number;
  //   ext_it: string;
  full_name: string;
  //   email: string;
  //   phone: number;
  //   created_at: string; // added by DB
  //   address: string;
  role: 'manager' | 'assistant';
}

export function findUser(id: number): knex.QueryBuilder {
  return db('user')
    .first()
    .where({ id });
}

export function findUsers(): knex.QueryBuilder {
  return db('user');
}

export async function makeUser(user: User): Promise<any> {
  const role = user.role;
  const userIds = await db('user').insert(user);
  console.log(userIds);
  const userId = userIds[0];
  return db(role).insert({ user_id: userId });
  // TODO: Figure out how to make this transactional
  // return db.transaction(async (trx) => {
  //   try {
  //     const role = user.role;
  //     const userIds = await trx.insert(user).into('user');
  //     console.log(userIds);
  //     const userId = userIds[0];
  //     await trx.insert({ user_id: userId }).into(role);
  //   } catch (err) {
  //     console.log('makeUser transaction error:', err);
  //     throw err;
  //   }
  // });
}
