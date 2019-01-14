import {
  findItems,
  findItem,
  makeItem,
  deleteItem,
  putItem,
  markComplete,
} from '../models/items';
import { getList } from '../models/lists';
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

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { list_id, task } = req.body;
    const validList = await getList(list_id);
    if (validList.length === 0) {
      throw Error('Not a valid List ID');
    }
    const reqItem: Item = { list_id, task };
    const newItem = await makeItem(reqItem);
    res.status(201).json(newItem);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
