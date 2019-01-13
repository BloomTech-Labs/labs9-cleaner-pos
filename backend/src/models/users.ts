import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

interface User {
  id?: number;
  // ext_it: string;
  full_name?: string;
  //   email: string;
  //   phone: number;
  //   created_at: string; // added by DB
  //   address: string;
  role?: string;
}

export function findUser(id: number): QueryBuilder {
  return db('user')
    .first()
    .where({ id });
}

export function findUserByExt_it(extit: string): QueryBuilder {
  return db('user')
    .first()
    .where({ ext_it: extit });
}

export function findUsers(): QueryBuilder {
  return db('user');
}

export async function makeUser(user: User): Promise<QueryBuilder> {
  const role = user.role;
  const userIds = await db('user')
    .insert(user)
    .returning('id');
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

export function updateUser(id: number, updatedUser: User): QueryBuilder {
  return db('user')
    .where({ id })
    .update(updatedUser);
}

export function deleteUser(id: number): QueryBuilder {
  return db('user')
    .where({ id })
    .del();
}
