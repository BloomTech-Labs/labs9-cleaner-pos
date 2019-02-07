import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

export function findAssistants(manId: number) {
  return db('assistant')
    .join('user', 'user.id', '=', 'assistant.user_id')
    .join('manager_ast', 'assistant.id', '=', 'manager_ast.ast_id')
    .select(
      'user.id as user_id',
      'assistant.id as ast_id',
      'user.full_name as full_name',
      'user.address as address',
      'user.photoUrl as photo_url',
    )
    .where({ 'manager_ast.manager_id': manId })
    .map(async (e: any) => {
      let itemCount: number = 0;
      const openAst = await db('house_ast')
        .where({ 'house_ast.ast_id': e.ast_id })
        .leftJoin('assistant', { 'house_ast.ast_id': 'assistant.id' })
        .leftJoin('user', { 'assistant.user_id': 'user.id' })
        .select('house_ast.house_id')
        .map(async (h: any) => {
          const checkList = await db('list')
            .where({ 'list.house_id': h.house_id })
            .leftJoin('items', { 'list.id': 'items.list_id' })
            .count('items.task');
          itemCount += parseInt(checkList[0].count, 10);
          return { ...h };
        });
      // const checkList = await db('list')
      //   .where({ 'list.house_id': e.id })
      //   .leftJoin('items', { 'list.id': 'items.list_id' })
      //   .count('items.task');
      // return { ...e, avlHouses: openAst.length };
      return { ...e, houseCount: openAst.length, itemCount, openAst };
    });
}

export function addAstMan(astId: number, manId: number) {
  return db('manager_ast').insert({ manager_id: manId, ast_id: astId });
}

export function addAstToAllManHouse(astId: number, manId: number) {
  return db('manager_ast')
    .where({
      'manager_ast.ast_id': astId,
      'manager_ast.manager_id': manId,
    })
    .leftJoin('house', { 'manager_ast.manager_id': 'house.manager' })
    .select('house.id')
    .map((e: any) => {
      return db('house_ast').insert({ ast_id: astId, house_id: e.id });
    });
}

// Finds an ast by astId. gets user info and houses. used on ast detail FE page
export function findOneAssistant(astId: number, manId: number) {
  return db('assistant')
    .join('user', 'user.id', '=', 'assistant.user_id')
    .select(
      'user.id as user_id',
      'assistant.id as ast_id',
      'user.full_name as full_name',
      'user.address as address',
      'user.photoUrl as photo_url',
    )
    .where({ 'assistant.id': astId })
    .first()
    .then(async (e: any) => {
      const defA: any = [];
      const defHouse = await db('house')
        .select(
          'house.id as house_id',
          'house.name as house_name',
          'house.address as house_address',
        )
        .where({ 'house.default_ast': astId })
        .map((h: any) => {
          defA.push(h.house_id);
          return h;
        });
      const avlHouses = await db('house_ast')
        .leftJoin('house', {
          'house_ast.house_id': 'house.id',
        })
        .select(
          'house.id as house_id',
          'house.name as house_name',
          'house.address as house_address',
        )
        .where({ 'house_ast.ast_id': astId })
        // filters out the houses that a ast is already default
        .whereNotIn('house_ast.house_id', defA)
        .map((h: any) => {
          defA.push(h.house_id);
          return h;
        });
      const avlAddHouses = await db('house')
        .select(
          'house.id as house_id',
          'house.name as house_name',
          'house.address as house_address',
        )
        .where({ 'house.manager': manId })
        .whereNotIn('house.id', defA);
      return {
        ...e,
        avl_add_houses: avlAddHouses,
        avl_houses: avlHouses,
        default_house: defHouse,
      };
    });
}

// takes ast id. finds all manager id's linked
// TODO: filter out properties a mananger has not assigned ast to
export function findAstMan(id: number): any {
  return db('manager_ast')
    .where({ 'manager_ast.ast_id': id })
    .map((row: any) => {
      return row.manager_id;
    });
}

export function addAstToHouse(houseId: number, astId: number) {
  return db('house_ast').insert({ house_id: houseId, ast_id: astId });
}

export function removeAstHouse(houseId: number, astId: number) {
  return db('house_ast')
    .where({ ast_id: astId, house_id: houseId })
    .del();
}

export async function deleteAst(astId: number) {
  try {
    await db('house_ast')
      .where({ ast_id: astId })
      .del();
    await db('manager_ast')
      .where({ ast_id: astId })
      .del();
    await db('house')
      .where({ default_ast: astId })
      .update({ default_ast: null });
  } catch (e) {
    console.error(e);
  }
}
