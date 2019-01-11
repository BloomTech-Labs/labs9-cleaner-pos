import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { statSync } from 'fs';

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

export function postStayData(stayData: Stay): QueryBuilder {
  /*
  Post stay data into DB.
  */
  return db('stay').insert(stayData);
}
