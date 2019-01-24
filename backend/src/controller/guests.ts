import {
  findUser,
  findUserByExt_it,
  findUsers,
  makeUser,
  updateUser,
  deleteUser,
} from '../models/users';
import { Request, Response, NextFunction } from 'express';

// TODO: Tests please
export async function post(req: Request, res: Response, next: NextFunction) {
  const { full_name, email, phone, address } = req.body;

  const newGuest = {
    address,
    email,
    ext_it: null,
    full_name,
    phone,
    role: 'guest',
  };

  try {
    const result = await makeUser(newGuest);
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    e.statusCode = e.statusCode || 500;
    next(e);
  }
}
