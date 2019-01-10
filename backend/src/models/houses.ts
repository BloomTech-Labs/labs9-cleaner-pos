import * as knex from 'knex';
import db from '../../data/dbConfig';

interface House {
  id?: number;
  name: string;
  address: string;
  price: number;
  cleaning_fee: number;
  extra_guest_fee: number;
  default_ast: string;
  manager: string;
  guest_guide?: any;
  ast_guide?: any;
}

export const findHouses = (): knex.QueryBuilder => {
  return db('house');
};

export const findHouse = (id: number): knex.QueryBuilder => {
  return db('house')
    .first()
    .where({ id });
};

export const makeHouse = (house: House): knex.QueryBuilder => {
  return db('house').insert(house);
};

export const updateHouse = (updatedHouse: House): knex.QueryBuilder => {
  const id = updatedHouse.id;
  return db('house')
    .where({ id })
    .update(updatedHouse);
};

export const deleteHouse = (id: number): knex.QueryBuilder => {
  return db('house')
    .where({ id })
    .del();
};
