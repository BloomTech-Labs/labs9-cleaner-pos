import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { findUserByExt_it } from './users';

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

export const findHouses = (userId: number) => {
  return db('house')
    .leftJoin('assistant', { 'house.default_ast': 'assistant.id' })
    .leftJoin('user', { 'assistant.user_id': 'user.id' })
    .where({ manager_id: userId })
    .select(
      'house.id',
      'house.name',
      'house.address',
      'house.default_ast',
      'user.full_name as default_ast_name',
      'house.manager',
      'house.guest_guide',
      'house.ast_guide',
    )
    .map(async (e: any) => {
      const openAst = await db('house_ast')
        .where({ 'house_ast.house_id': e.id })
        .leftJoin('assistant', { 'house_ast.ast_id': 'assistant.id' })
        .leftJoin('user', { 'assistant.user_id': 'user.id' })
        .select(
          'user.full_name',
          'assistant.id as ast_id',
          'house_ast.house_id',
        );
      const checkList = await db('list')
        .where({ 'list.house_id': e.id })
        .leftJoin('items', { 'list.id': 'items.list_id' })
        .count('items.task');
      return { ...e, openAst, checkList };
    });
};

export function findStaySummary(stayId: number): QueryBuilder {
  /*
  Function returns guest name, check in/out dates, and checklist percentage.
  For Guests page: https://balsamiq.cloud/snv27r3/pwc7ekv/rFE5F
  */
  // TODO: Query list status once lists are set up
  return db('stay')
    .where({ 'stay.id': stayId })
    .select(
      'user.full_name AS guest',
      'house.name AS house',
      'house.id as houseId',
      'check_in',
      'check_out',
    )
    .join('user', 'user.id', '=', 'stay.guest_id')
    .join('house', 'house.id', '=', 'stay.house_id')
    .first();
}

export async function findAllStays(userExtIt: string) {
  try {
    const { id } = await findUserByExt_it(userExtIt);
    const houses = await db('house')
      .select('id')
      .where({ manager: id })
      .map((val: any) => val.id);
    return db('stay').whereIn('house_id', houses);
  } catch (e) {
    throw e;
  }
}

export function postStayData(stayData: Stay): QueryBuilder {
  return db('stay')
    .insert(stayData)
    .returning('id');
}

export function putStayData(id: number, stayData: Stay): QueryBuilder {
  return db('stay')
    .where({ id })
    .update(stayData);
}

export function deleteStayData(id: number): QueryBuilder {
  return db('stay')
    .where({ id })
    .del();
}
