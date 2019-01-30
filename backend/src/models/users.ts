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
  stripeUID?: string;
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

// TODO: Test please.
export async function makeUser(user: User) {
  const role = user.role;
  const query: QueryBuilder = db('user')
    .insert(user)
    .returning('id');

  if (user.role === 'guest') {
    // If created user is a guest, we will return the query now, as
    // they don't have a role table of their own
    return query;
  } else {
    // Otherwise, proceed as normal
    const userIds = await query;
    const userId = userIds[0];
    const roleId = await db(role)
      .insert({ user_id: userId })
      .returning('id');
    if (user.role === 'assistant') {
      return { id: roleId, user_id: userId };
    }
    const manAst = await db('assistant')
      .insert({ user_id: userId })
      .returning('id');

    return { id: roleId, user_id: userId, astId: manAst };
  }
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

export function updateUser(extIt: string, updatedUser: User): QueryBuilder {
  return db('user')
    .where({ ext_it: extIt })
    .update(updatedUser);
}

export function updateUserById(id: number, updatedUser: User): QueryBuilder {
  return db('user')
    .where({ id })
    .update(updatedUser);
}

export function deleteUser(id: number): QueryBuilder {
  return db('user')
    .where({ id })
    .del();
}

export async function getRoleId(
  id: number,
  other?: boolean,
): Promise<QueryBuilder> {
  return db('user')
    .select('user.role')
    .where({ id })
    .first()
    .then((result) => {
      if (other) {
        result.role = 'assistant';
      }
      return db(result.role)
        .select('id')
        .where({ user_id: id })
        .first();
    });
}
