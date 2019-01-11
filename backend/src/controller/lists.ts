import { findLists } from '../models/lists';
import { Request, Response, NextFunction } from 'express';
import { findHouse } from '../models/houses';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { houseId } = req.params;
    const isHouse = await findHouse(houseId);
    if (!isHouse) {
      throw Error('an invalid house id was given');
    }
    const lists = await findLists(houseId);
    res.status(200).json(lists);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};
