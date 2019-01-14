import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

/*
this takes in a stayID, finds all the items for the house
on that stay, them posts all those items to the item_complete table.
this should only be called when a new stay is created.
*/
export const postItemsStay = async (stayId: number) => {
  try {
    const items = await db('stay')
      .leftJoin('list', { 'stay.house_id': 'list.house_id' })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .where({ 'stay.id': stayId })
      .select('items.id as item_id', 'stay.id as stay_id');
    const complete = await db('item_complete')
      .insert(items)
      .returning('*');
    if (complete.rowCount === null) {
      return [];
    } else {
      return complete;
    }
  } catch (e) {
    throw Error(e);
  }
};

/*
get all items
*/
export const findItems = (): QueryBuilder => {
  return db('items');
};
/*
get one items
*/
export const findItems = (id: number): QueryBuilder => {
  return db('items').where({ id });
};

/*
Post new item.  Must have a valid `list_id`
*/

/*
del item.
*/

/*
Put item.  Must have a valid `list_id`
*/

/*
Mark Item as complete. must have list_id and stay_id
*/
