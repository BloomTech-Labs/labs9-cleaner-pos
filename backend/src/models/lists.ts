import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { List } from '../interface';

// this will output an object with all lists for a house
export const findLists = async (houseId: number) => {
  try {
    const before = await db('list')
      .where({ house_id: houseId, type: 'before' })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .select('list.id as list_id', 'items.task', 'items.id as items_id')
      .orderBy('items.id')
      .then((e) => {
        return { before: e, before_id: e[0].list_id };
      });
    const during = await db('list')
      .where({ house_id: houseId, type: 'during' })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .select('list.id as list_id', 'items.task', 'items.id as items_id')
      .orderBy('items.id')
      .then((e) => {
        return { during: e, during_id: e[0].list_id };
      });
    const after = await db('list')
      .where({ house_id: houseId, type: 'after' })
      .leftOuterJoin('after_list', { 'list.id': 'after_list.list_id' })
      .select('list.id', 'after_list.hours_after')
      .map(async (row: any) => {
        const hours: string = `${row.hours_after} Hours After Stay`;
        const afterLists = await db('items')
          .where({ 'items.list_id': row.id })
          .select({
            items_id: 'items.id',
            list_id: row.id,
            task: 'items.task',
          })
          .orderBy('items.id');

        return { after_id: row.id, time: hours, afterLists };
      })
      .catch((e) => {
        console.error(e);
      });
    return { ...before, ...during, after };
  } catch (e) {
    throw console.error(e);
  }
};

const beforeAfterList = (type: string, houseId: number, stayId: number) => {
  try {
    return db('list')
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .leftJoin('item_complete', { 'item_complete.item_id': 'items.id' })
      .select(
        'item_complete.complete',
        'items.task',
        'items.id as items_id',
        'item_complete.stay_id',
      )
      .where({
        'item_complete.stay_id': stayId,
        'list.house_id': houseId,
        'list.type': type,
      });
  } catch (e) {
    console.error(e);
  }
};

// this will output an object with all lists for a stay
export const findListsStay = async (houseId: number, stayId: number) => {
  try {
    const before = await beforeAfterList('before', houseId, stayId);
    const during = await beforeAfterList('during', houseId, stayId);
    const after = await db('list')
      .where({ house_id: houseId, type: 'after' })
      .leftOuterJoin('after_list', { 'list.id': 'after_list.list_id' })
      .select('list.id', 'after_list.hours_after')
      .map(async (row: any) => {
        const hours: string = `hours after ${row.hours_after}`;
        const afterLists = await db('items')
          .where({ 'items.list_id': row.id, 'item_complete.stay_id': stayId })
          .select(
            'item_complete.complete',
            'items.task',
            'items.id as items_id',
            'item_complete.stay_id',
          )
          .leftJoin('item_complete', { 'item_complete.item_id': 'items.id' });
        return { [hours]: afterLists };
      })
      .catch((e) => {
        console.error(e);
      });
    return { before, during, after };
  } catch (e) {
    console.error(e);
  }
};

export const getList = (id: number): QueryBuilder => {
  return db('list').where({ id });
};

export const postList = (list: List): QueryBuilder => {
  return db('list')
    .insert(list)
    .returning('id');
};

export const postAfterList = (
  listId: number,
  hoursAfter: number,
): QueryBuilder => {
  return db('after_list')
    .insert({ list_id: listId, hours_after: hoursAfter })
    .returning('id');
};

export const putList = (id: number, list: List): QueryBuilder => {
  return db('list')
    .where({ id })
    .update(list)
    .returning('id');
};

export const deleteList = (id: number): QueryBuilder => {
  return db('list')
    .where({ id })
    .del()
    .returning('id');
};

// this is used to get all lists for a house. will only return type and house_id
export const justListsByHouse = (houseId: number): QueryBuilder => {
  return db('list').where({ house_id: houseId });
};
