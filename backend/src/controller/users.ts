import {
  findUser,
  findUserByExt_it,
  findUsers,
  makeUser,
  updateUser,
  deleteUser,
} from '../models/users';
import { getMan } from '../models/manager';
import { addAstMan, addAstToAllManHouse } from '../models/assistants';
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

// Need to move these declarations somewhere else, but TS is picky where it should be

// Global declarations and overrides
// https://www.reddit.com/r/typescript/comments/8wiusj/could_use_some_help_with_modifying_expressrequest/
declare global {
  interface Token {
    ext_it: string;
    role: string;
    id: number;
  }

  namespace Express {
    interface Request {
      token: Token;
    }
  }

  interface StatusError extends Error {
    statusCode: number;
  }
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.token;
    // Find users
    const user = await findUser(id);
    // Return status 404 if individual user is not found
    if (user === undefined) {
      return res.status(404).json({ msg: '404: User cannot be found.' });
    }
    // Send 200 OK and user data
    res.status(200).json(user);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const getByExtIt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.token) {
      const e = { error: Error('Authentication required.'), statusCode: 403 };
      throw e;
    }
    const { ext_it } = req.token;
    // Find users
    let users: any;
    if (ext_it) {
      users = await findUserByExt_it(ext_it);
    }
    // Return status 404 if individual user is not found
    if (users === undefined) {
      return res.status(404).json({ msg: '404: User cannot be found.' });
    }
    // Send 200 OK and user data
    res.status(200).json(users);
  } catch (e) {
    e.statusCode = e.statusCode || 400;
    next(e);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  manager only be passed in when an ast is signing up. the value = manager.id
    const {
      ext_it,
      full_name,
      email,
      phone,
      address,
      role,
      managerID,
    } = req.body;

    const user = await findUserByExt_it(ext_it).catch((e) => {
      throw e;
    });
    const { JWT_SECRET } = process.env;
    if (!user) {
      // If user does NOT yet exist, create a user in our db & send a token to the client
      const userData: User = {
        address,
        email,
        ext_it,
        full_name,
        phone,
        role,
      };

      // should we save output to a variable? I don't think the client should be sent that info.
      const newUser = await makeUser(userData);
      const token = await jwt.sign(
        { ...userData, id: newUser.user_id },
        JWT_SECRET || '',
      );
      const astCreate = async (userId: number, manId: number) => {
        await addAstMan(userId, manId);
        await addAstToAllManHouse(userId, manId);
      };
      // if the user signing up is an assistant, needs to be linked to manager
      if (role === 'assistant') {
        astCreate(newUser.id[0], managerID);
        // await addAstMan(newUser[0].id, managerID);
        // await addAstToAllManHouse(newUser[0].id, managerID);
      } else if (role === 'manager') {
        await addAstMan(newUser.astId[0], newUser.id[0]);
      }

      res
        .status(201)
        .json({ token, first: true, id: newUser.id, role: newUser.role });
    } else {
      // If user does exist within db, sign a new JWT & send it to the client

      // TODO: do we still need this logic?
      if (user.role !== 'manager' && user.role !== 'assistant') {
        throw Error('Role must be User or Manager');
      }
      if (user.role === 'manager') {
        const man = await getMan(user.id);
        user.stripePlan = man.stripe_sub_plan;
      }
      const token = await jwt.sign(user, JWT_SECRET || '');
      res.status(200).json({
        id: user.id,
        role: user.role,
        stripePlan: user.stripePlan,
        token,
      });
    }
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = req.body;
    if (
      user.role !== 'manager' &&
      user.role !== 'assistant' &&
      user.role !== undefined
    ) {
      throw Error('Role must be Assistant or Manager');
    }
    const putUser = await updateUser(id, user);
    res.status(201).json(putUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const putByExtId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ext_it, role } = req.token;
    const user: User = req.body;
    if (role !== 'manager' && role !== 'assistant' && role !== undefined) {
      const e: StatusError = {
        ...new Error('Role must be User or Manager'),
        statusCode: 400,
      };
      throw e;
    }
    const numOfRecordsUpdated = await updateUser(ext_it, user);
    if (numOfRecordsUpdated !== 1) {
      throw new Error('Update was not successful.');
    } else {
      res.status(204).end();
    }
  } catch (e) {
    e.statusCode = e.statusCode || 500;
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
