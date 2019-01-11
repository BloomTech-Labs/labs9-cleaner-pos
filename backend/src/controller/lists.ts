import { findLists } from '../models/lists';
import { Request, Response, NextFunction } from 'express';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { houseId } = req.params;
    const lists = await findLists(houseId);
    res.status(200).json(lists);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};
