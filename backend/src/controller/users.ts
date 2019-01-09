import { findUser, findUsers, makeUser } from '../models/users';
import { Request, Response, NextFunction } from 'express';

export const userGet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};
