import { findAssistants } from '../models/assistants';
import { Request, Response, NextFunction } from 'express';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find assistants
    let assistants: any;
    assistants = await findAssistants();
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
    let assistants: any;
    assistants = await findAssistants();
    res.status(200).json(assistants);
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
};
