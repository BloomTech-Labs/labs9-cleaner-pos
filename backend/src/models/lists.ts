import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

export const findLists = async (houseId: number) => {
  try {
    const before = await db('list')
      .where({ house_id: houseId, type: 'before' })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .select('items.task', 'items.id as items_id');
    const during = await db('list')
      .where({ house_id: houseId, type: 'during' })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .select('items.task', 'items.id as items_id');
    const after = await db('list')
      .where({ house_id: houseId, type: 'after' })
      .leftOuterJoin('after_list', { 'list.id': 'after_list.list_id' })
      .select('list.id', 'after_list.hours_after')
      .map(async (row: any) => {
        const hours: string = `hours after ${row.hours_after}`;
        const something = await db('items')
          .where({ 'items.list_id': row.id })
          .select('items.task', 'items.id as items_id')
          .leftJoin('after_list', { 'items.list_id': 'after_list.list_id' });

        return { [hours]: something };
      })
      .catch((e) => {
        console.error(e);
      });
    return { before, during, after };
  } catch (e) {
    throw console.error(e);
  }
};
