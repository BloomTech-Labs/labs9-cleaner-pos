import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { House } from '../interface';

export const findHouses = (manager: number[], astId?: number) => {
  const query: QueryBuilder = db('house')
    .leftJoin('assistant', { 'house.default_ast': 'assistant.id' })
    .leftJoin('user', { 'assistant.user_id': 'user.id' })
    .select(
      'house.id',
      'house.name',
      'house.address',
      'house.default_ast',
      'user.full_name as default_ast_name',
      'house.manager',
      'house.guest_guide',
      'house.ast_guide',
      'house.photo_url',
      'house.price',
      'house.cleaning_fee',
      'house.extra_guest_fee',
    )
    .whereIn('house.manager', manager);
  // if getting houses for an ast, we want to only show houses
  // where the ast is linked on house_ast table
  if (astId) {
    query
      .leftJoin('house_ast', { 'house.id': 'house_ast.house_id' })
      .where({ 'house_ast.ast_id': astId });
  }

  return query.map(async (e: any) => {
    const openAst = await db('house_ast')
      .where({ 'house_ast.house_id': e.id })
      .leftJoin('assistant', { 'house_ast.ast_id': 'assistant.id' })
      .leftJoin('user', { 'assistant.user_id': 'user.id' })
      .select('user.full_name', 'assistant.id as ast_id', 'house_ast.house_id');
    const checkList = await db('list')
      .where({ 'list.house_id': e.id })
      .leftJoin('items', { 'list.id': 'items.list_id' })
      .count('items.task');
    return { ...e, openAst, checkList };
  });
};

// TODO: Combine with original findHouses by gating where clause
// This only returns houses that an ast is the default on
export const findAllHousesByAstId = (astId: number) => {
  return db('house')
    .leftJoin('assistant', { 'house.default_ast': 'assistant.id' })
    .leftJoin('user', { 'assistant.user_id': 'user.id' })
    .where({ 'house.default_ast': astId })
    .select(
      'house.id',
      'house.name',
      'house.address',
      'house.default_ast',
      'user.full_name as default_ast_name',
      'house.manager',
      'house.guest_guide',
      'house.ast_guide',
      'house.price',
      'house.cleaning_fee',
      'house.extra_guest_fee',
    )
    .map(async (e: any) => {
      const openAst = await db('house_ast')
        .where({ 'house_ast.house_id': e.id })
        .leftJoin('assistant', { 'house_ast.ast_id': 'assistant.id' })
        .leftJoin('user', { 'assistant.user_id': 'user.id' })
        .select(
          'user.full_name',
          'assistant.id as ast_id',
          'house_ast.house_id',
        );
      const checkList = await db('list')
        .where({ 'list.house_id': e.id })
        .leftJoin('items', { 'list.id': 'items.list_id' })
        .count('items.task');
      return { ...e, openAst, checkList };
    });
};

// TODO: Combine with original findHouses by gating where clause
export const findAllHousesByManagerId = (managerId: number) => {
  return db('house')
    .where({ 'house.manager': managerId })
    .leftJoin('manager', { 'house.manager': 'manager.id' })
    .leftJoin('user', { 'manager.user_id': 'user.id' })
    .select(
      'house.id AS id',
      'house.name AS name',
      'house.address AS address',
      'house.manager AS manager_id',
    );
};

export const findHouse = async (id: number) => {
  const house = await db('house')
    .leftJoin('assistant', { 'house.default_ast': 'assistant.id' })
    .leftJoin('user', { 'assistant.user_id': 'user.id' })
    .select(
      'house.id',
      'house.name',
      'house.address',
      'house.default_ast',
      'user.full_name as default_ast_name',
      'house.manager',
      'house.guest_guide',
      'house.ast_guide',
      'house.photo_url',
      'house.price',
      'house.cleaning_fee',
      'house.extra_guest_fee',
    )
    .where({ 'house.id': id })
    .map(async (e: any) => {
      const openAst = await db('house_ast')
        .where({ 'house_ast.house_id': e.id })
        .leftJoin('assistant', { 'house_ast.ast_id': 'assistant.id' })
        .leftJoin('user', { 'assistant.user_id': 'user.id' })
        .select(
          'user.full_name',
          'assistant.id as ast_id',
          'house_ast.house_id',
        );
      const checkList = await db('list')
        .where({ 'list.house_id': e.id })
        .leftJoin('items', { 'list.id': 'items.list_id' })
        .count('items.task');
      return { ...e, openAst, checkList };
    });

  return house[0];
};

export const makeHouse = (house: House): QueryBuilder => {
  return db('house')
    .insert(house)
    .returning('id');
};

export const updateHouse = (updatedHouse: House): QueryBuilder => {
  const id = updatedHouse.id;
  return db('house')
    .where({ id })
    .update(updatedHouse);
};

export const deleteHouse = (id: number): QueryBuilder => {
  return db('house')
    .where({ id })
    .del();
};
