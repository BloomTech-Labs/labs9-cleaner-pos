import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

interface SubInfo {
  stripe_cust: string;
  stripe_sub_id: string;
  stripe_sub_plan: number;
}
export function addSub(custId: number, subInfo: SubInfo) {
  return db('manager')
    .update(subInfo)
    .where({ 'manager.user_id': custId });
}

export function getMan(custId: number) {
  return db('manager')
    .where({ 'manager.user_id': custId })
    .first();
}
