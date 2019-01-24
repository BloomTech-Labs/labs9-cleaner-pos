import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

export function findAssistants(): QueryBuilder {
    return db('assistant')
        .join('user', 'user.id', '=', 'assistant.user_id')
        .select(
            'user.id as user_id',
            'user.full_name as full_name',
            'user.address as address',
            'user.photoUrl as photo_url',
        );
}
