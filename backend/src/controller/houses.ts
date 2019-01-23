import {
  findHouse,
  findHouses,
  makeHouse,
  updateHouse,
  deleteHouse,
  findAllHousesByAstId,
} from '../models/houses';
import { Request, Response, NextFunction } from 'express';
import { House } from '../interface';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.query && req.query.user;

  if (user) {
    try {
      const { id } = req.params;

      const result = await findAllHousesByAstId(Number(id));

      res.status(200).json(result);
    } catch (e) {
      e.statusCode = e.statusCode || 400;
      next(e);
    }
  }

  try {
    const { id } = req.params;
    let house: any;
    if (id) {
      house = await findHouse(id);
    } else {
      house = await findHouses();
    }
    if (house === undefined) {
      throw Error('no user');
    }
    res.status(200).json(house);
  } catch (e) {
    e.statusCode = 404;
    next(e);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const house: House = req.body;
    const newHouse = await makeHouse(house);
    res.status(201).json(newHouse);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const put = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const house: House = { ...req.body, id: req.params.id };
    const putHouse = await updateHouse(house);
    if (!putHouse) {
      throw Error('No house with that id');
    }
    res.status(201).json(putHouse);
  } catch (e) {
    e.statusCode = 404;
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
    const delUser = await deleteHouse(id);
    res.status(200).json(delUser);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
