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
    return db('stay')
      .whereIn('house_id', houses)
      .join('user', { 'user.id': 'guest_id' })
      .join('house', { 'house.id': 'house_id' })
      .select(
        'stay.id AS stayId',
        'house.id AS houseId',
        'user.full_name AS guestName',
        'house.name AS houseName',
        'check_in AS checkIn',
        'check_out AS checkOut',
      )
      .map(async (val: any) => {
        const { houseId, stayId } = val;
        const progress: number = await getPreparationProgress(houseId, stayId);
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
