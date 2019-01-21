import { QueryBuilder } from 'knex';
import db from '../../../data/dbConfig';
import { findUserByExt_it } from '../users';
import { getPreparationProgress } from './helpers';

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

export function findStaySummary(stayId: number): QueryBuilder {
  /*
  Function returns guest name, check in/out dates, and checklist percentage.
  For Guests page: https://balsamiq.cloud/snv27r3/pwc7ekv/rFE5F
  */
  // TODO: Query list status once lists are set up
  return db('stay')
    .where({ 'stay.id': stayId })
    .select(
      'user.full_name AS guestName',
      'house.id AS houseId',
      'house.name AS houseName',
      'house.address AS houseAddress',
      'house.default_ast AS defaultAssistant',
      'house.guest_guide AS guestGuide',
      'house.ast_guide AS assistantGuide',
      'check_in',
      'check_out',
    )
    .join('user', 'user.id', '=', 'stay.guest_id')
    .join('house', 'house.id', '=', 'stay.house_id')
    .first();
}

export function findStaySummaryStandardized(stayId: number): QueryBuilder {
  // TODO: Query list status once lists are set up
  return db('stay')
    .where({ 'stay.id': stayId })
    .select(
      'user.full_name AS guest_name',
      'house.id AS house_id',
      'house.name AS house_name',
      'house.address AS house_address',
      'house.default_ast AS default_ast',
      'house.guest_guide AS guest_guide',
      'house.ast_guide AS ast_guide',
      'check_in',
      'check_out',
    )
    .join('user', 'user.id', '=', 'stay.guest_id')
    .join('house', 'house.id', '=', 'stay.house_id')
    .first();
}

export async function findAllStays(
  userExtIt: string,
  filter?: 'all' | 'upcoming' | 'incomplete' | 'complete',
): Promise<any> {
  const filterValue = filter || 'all';

  try {
    // Find manager id
    const { id } = await findUserByExt_it(userExtIt);

    // Find all house ids related to properties manager owns
    const houses = await db('house')
      .select('id')
      .where({ manager: id })
      .map((val: any) => val.id);

    // Find all stays related to all found houses
    const query: QueryBuilder = db('stay')
      .whereIn('house_id', houses)
      .join('user', { 'user.id': 'guest_id' })
      .join('house', { 'house.id': 'house_id' })
      .select(
        'stay.id AS stay_id',
        'house.id AS house_id',
        'user.full_name AS guest_name',
        'house.name AS house_name',
        'check_in AS check_in',
        'check_out AS check_out',
      );

    if (filterValue === 'upcoming') {
      query.where('check_in', '>=', new Date().toISOString());
    }

    return query.map(async (val: any) => {
      // Find percentage of completed items over total items in checklist
      const { house_id, stay_id } = val;
      const progress: number = await getPreparationProgress(
        'before',
        house_id,
        stay_id,
      );
      return { ...val, progress };
    });
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
