import {
  findUser,
  findUserByExt_it,
  findUsers,
  makeUser,
  updateUser,
  deleteUser,
} from '../models/users';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

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
    // Find users
    let users: any;
    if (id) {
      users = await findUser(id);
    } else {
      users = await findUsers();
    }
    // Return status 404 if individual user is not found
    if (users === undefined) {
      return res.status(404).json({ msg: '404: User cannot be found.' });
    }
    // Send 200 OK and user data
    res.status(200).json(users);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ext_it, full_name, email, phone, address, role } = req.body;
    console.log(ext_it);
    const user = await findUserByExt_it(ext_it).catch((e) => {
      console.log(e);
    });
    const { JWT_SECRET } = process.env;
    if (!user) {
      // If user does NOT yet exist, create a user in our db & send a token to the client
      const userData: User = { ext_it, full_name, email, phone, address, role };

      // should we save output to a variable? I don't think the client should be sent that info.
      await makeUser(userData);
      const token = await jwt.sign(userData, JWT_SECRET || '');

      res.status(201).json({ token, first: true });
    } else {
      // If user does exist within db, sign a new JWT & send it to the client
      if (user.role !== 'manager' && user.role !== 'assistant') {
        throw Error('Role must be User or Manager');
      }
      const token = await jwt.sign(user, JWT_SECRET || '');

      res.status(200).json({ token });
    }
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
