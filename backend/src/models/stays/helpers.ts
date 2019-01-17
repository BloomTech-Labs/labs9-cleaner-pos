import { QueryBuilder } from 'knex';
import db from '../../../data/dbConfig';
import { findUserByExt_it } from '../users';

export async function getPreparationProgress(houseId: number, stayId: number) {
  const items = await db('items')
    .join('list', { 'list.id': 'list_id' })
    .where({ house_id: houseId })
    .select('items.id');

  const completeItems = await db('items')
    .join('item_complete', { 'item_complete.item_id': 'items.id' })
    .where({ stay_id: stayId })
    .select('items.id');

  return (completeItems.length / items.length) * 100;
}
