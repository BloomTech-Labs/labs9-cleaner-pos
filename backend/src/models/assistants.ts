import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

export function findAssistants() {
  return db('assistant')
    .join('user', 'user.id', '=', 'assistant.user_id')
    .select(
      'user.id as user_id',
      'assistant.id as ast_id',
      'user.full_name as full_name',
      'user.address as address',
      'user.photoUrl as photo_url',
    )
    .map(async (e: any) => {
      const openAst = await db('house_ast')
        .where({ 'house_ast.ast_id': e.ast_id })
        .leftJoin('assistant', { 'house_ast.ast_id': 'assistant.id' })
        .leftJoin('user', { 'assistant.user_id': 'user.id' })
        .select(
          'user.full_name',
          'assistant.id as ast_id',
          'house_ast.house_id',
        );
      // const checkList = await db('list')
      //   .where({ 'list.house_id': e.id })
      //   .leftJoin('items', { 'list.id': 'items.list_id' })
      //   .count('items.task');
      return { ...e, openAst };
    });
}

export function addAstMan(astId: number, manId: number) {
  return db('manager_ast').insert({ manager_id: manId, ast_id: astId });
}
