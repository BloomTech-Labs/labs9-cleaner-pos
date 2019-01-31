import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

interface SubInfo {
  strip_cust: string;
  strip_sub_id: string;
  strip_sub_plan: number;
}
export function addSub(custId: number, subInfo: SubInfo) {
  return db('manager')
    .update(subInfo)
    .where({ 'manager.user_id': custId });
}
