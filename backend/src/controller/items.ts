import {
  findItems,
  findItem,
  makeItem,
  deleteItem,
  putItem,
  markComplete,
} from '../models/items';
import { getList } from '../models/lists';
import { findStaySummary } from '../models/stays';
import { Request, Response, NextFunction } from 'express';
import { Item } from '../interface';
import { QueryBuilder } from 'knex';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    let item: any;
    if (id) {
      item = await findItem(id);
      if (item.length === 0) {
        throw Error('No item with that Id');
      }
    } else {
      item = await findItems();
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

export const deleteL = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const removed = await deleteItem(id);
    if (removed.length === 0) {
      throw Error('Unable to remove a item with that ID');
    }
    res.status(200).json(removed);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};

export const put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { list_id, task } = req.body;
    const { id } = req.params;
    const validList = await getList(list_id);
    if (validList.length === 0) {
      throw Error('Not a valid List ID');
    }
    const reqItem: Item = { list_id, task };
    const updateItem = await putItem(id, reqItem);
    if (updateItem.length === 0) {
      throw Error('Not a valid Item ID');
    }
    res.status(201).json(updateItem);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const itemComplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { item_id, stay_id } = req.body;
    const toggleComplete = await markComplete(item_id, stay_id);
    res.status(201).json(toggleComplete);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
