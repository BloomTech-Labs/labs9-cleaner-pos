import {
  findItems,
  findItem,
  makeItem,
  deleteItem,
  putItem,
  markComplete,
} from '../models/items';
import { Request, Response, NextFunction } from 'express';
import { Item } from '../interface';
import { QueryBuilder } from 'knex';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let item: QueryBuilder;
    if (id) {
      item = await findItem(id);
    } else {
      item = await findItems();
    }
    if (item === undefined) {
      throw Error('No item with that Id');
    }
    res.status(200).json(item);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};
