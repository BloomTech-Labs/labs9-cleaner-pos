import db from '../../data/dbConfig';

const postItemsStay = async (stayId: number) => {
  try {
    const items = await db('stay')
      .leftJoin('list', { 'stay.id': 'list.house_id' })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .where({ 'stay.id': stayId })
      .select('items.id as items_id', 'stay.id as stay_id');

    return db('items_complete').insert(items);
  } catch (e) {
    throw console.error(e);
  }
};
