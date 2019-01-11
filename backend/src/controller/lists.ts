import { findLists, findListsStay } from '../models/lists';
import { Request, Response, NextFunction } from 'express';
import { findHouse } from '../models/houses';
import { findStaySummary } from '../models/stays';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.stay !== 'true') {
      const { id } = req.params;
      const isHouse = await findHouse(id);
      if (!id) {
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
