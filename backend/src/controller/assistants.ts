import {
  findAssistants,
  findOneAssistant,
  addAstToHouse,
  removeAstHouse,
  deleteAst,
} from '../models/assistants';
import { Request, Response, NextFunction } from 'express';
import { getRoleId } from '../models/users';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find assistants
    const manager = await getRoleId(req.token.id);
    let assistants: any;
    assistants = await findAssistants(manager.id);
    res.status(200).json(assistants);
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};

export const getId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Find assistants
    const { id } = req.params;
    const manager = await getRoleId(req.token.id);
    const assistant = await findOneAssistant(id, manager.id);
    res.status(200).json(assistant);
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};

export const postAst = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type } = req.query;
  const { houseId } = req.body;
  const { id } = req.params;
  let houseAst: any;
  try {
    if (!type) {
      throw Error('Must pass a param to postAst route');
    }
    // figure out what we are doing
    if (type === 'removeHouse') {
      // remove house from house_ast
      houseAst = await removeAstHouse(houseId, id);
    } else if (type === 'addHouse') {
      // add house_id and ast_id to house_ast table
      houseAst = await addAstToHouse(houseId, id);
    }
    res.status(200).json(houseAst);
  } catch (e) {
    if (e.message === 'Must pass a param to postAst route') {
      e.statusCode = 404;
    }
    e.statusCode = e.statusCode || 500;
    next(e);
  }
};

export const delAst = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteAst(id);
    res.status(200).json({ message: 'assistant deleted' });
  } catch (e) {
    e.statusCode = e.statusCode || 500;
    next(e);
  }
};
