import { findAssistants, findOneAssistant } from '../models/assistants';
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
    const assistant = await findOneAssistant(id);
    res.status(200).json(assistant);
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};
