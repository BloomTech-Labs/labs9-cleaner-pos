import { findUser, findUsers, makeUser } from '../models/users';
import { Request, Response, NextFunction } from 'express';
import * as knex from 'knex';
interface User {
  id?: number;
  ext_it: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}
export const userGet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    let users: knex.QueryBuilder;
    if (id) {
      users = await findUser(id);
    } else {
      users = await findUsers();
    }
    res.status(200).json(users);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const userPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ext_it, full_name, email, phone, address, role } = req.body;
    const user: User = { ext_it, full_name, email, phone, address, role };
    const newUser = await makeUser(user);
    res.status(201).json(newUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
