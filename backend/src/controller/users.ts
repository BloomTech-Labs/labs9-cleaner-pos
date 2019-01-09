import {
  findUser,
  findUsers,
  makeUser,
  updateUser,
  deleteUser,
} from '../models/users';
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

export const get = async (req: Request, res: Response, next: NextFunction) => {
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

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ext_it, full_name, email, phone, address, role } = req.body;
    const user: User = { ext_it, full_name, email, phone, address, role };
    if (user.role !== 'manager' && user.role !== 'assistant') {
      throw Error('Role must be User or Manager');
    }
    const newUser = await makeUser(user);
    res.status(201).json(newUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { ext_it, full_name, email, phone, address, role } = req.body;
    const user: User = { id, ext_it, full_name, email, phone, address, role };
    if (
      user.role !== 'manager' &&
      user.role !== 'assistant' &&
      user.role !== undefined
    ) {
      throw Error('Role must be User or Manager');
    }
    const putUser = await updateUser(id, user);
    res.status(201).json(putUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const deleteU = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const delUser = await deleteUser(id);
    res.status(200).json(delUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
