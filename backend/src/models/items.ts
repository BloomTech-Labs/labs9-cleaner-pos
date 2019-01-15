import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { Item } from '../interface';

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
export const findItem = (id: number): QueryBuilder => {
  return db('items').where({ id });
};

/*
Post new item.  Must have a valid `list_id`
*/
export const makeItem = (item: Item): QueryBuilder => {
  return db('items')
    .insert(item)
    .returning('id');
};

/*
del item.
*/
export const deleteItem = (id: number): QueryBuilder => {
  return db('items')
    .where({ id })
    .del()
    .returning('id');
};

/*
Put item.  Must have a valid `list_id`
*/
export const putItem = (id: number, item: Item): QueryBuilder => {
  return db('items')
    .where({ id })
    .update(item)
    .returning('id');
};

/*
Mark Item as complete. must have list_id and stay_id
*/
export const markComplete = async (
  itemId: number,
  stayId: number,
): Promise<QueryBuilder> => {
  const currStatus = await db('item_complete')
    .where({ item_id: itemId, stay_id: stayId })
    .select('complete')
    .first();
  return db('item_complete')
    .where({ item_id: itemId, stay_id: stayId })
    .update({ complete: !currStatus.complete })
    .returning('*');
};
