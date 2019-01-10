import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { House } from '../interface';

export const findHouses = (): QueryBuilder => {
  return db('house');
};

export const findHouse = (id: number): QueryBuilder => {
  return db('house')
    .first()
    .where({ id });
};

export const makeHouse = (house: House): QueryBuilder => {
  return db('house').insert(house);
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
