import {
  findLists,
  findListsStay,
  postList,
  postAfterList,
  deleteList,
  justListsByHouse,
} from '../models/lists';
import { Request, Response, NextFunction } from 'express';
import { findHouse } from '../models/houses';
import { findStaySummary } from '../models/stays';
import { List } from '../interface';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.stay !== 'true') {
      const { id } = req.params;
      const isHouse = await findHouse(id);
      if (!isHouse) {
        throw Error('an invalid house id was given');
      }
      const lists = await findLists(id);
      res.status(200).json(lists);
    } else {
      const { id } = req.params;
      const stay = await findStaySummary(id);
      if (!stay) {
        throw Error('an invalid stay id was given');
      }
      const lists = await findListsStay(stay.houseId, id);
      res.status(200).json(lists);
    }
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, house_id, hours_after } = req.body;
    const newList: List = { type, house_id };
    if (!newList.type || !newList.house_id) {
      throw Error('Must include type and house_id');
    }
    const houseLists = await justListsByHouse(newList.house_id);

    if (newList.type !== 'after') {
      houseLists.map((list: List) => {
        if (list.type === newList.type) {
          throw Error('House can only have one before and during list');
        }
      });
    }

    const ids = await postList(newList);

    if (newList.type === 'after') {
      await postAfterList(ids[0], hours_after);
    }
    res.status(201).json(ids[0]);
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
    const removed = await deleteList(id);
    if (removed.length === 0) {
      throw Error('Unable to remove a list with that ID');
    }
    res.status(200).json(removed);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
