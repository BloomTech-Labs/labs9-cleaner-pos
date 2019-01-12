import db from '../../data/dbConfig';

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
