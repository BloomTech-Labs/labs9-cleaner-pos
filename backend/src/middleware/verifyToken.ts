import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from 'http';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || 'none';
  const secret = process.env.JWT_SECRET || 'secret';

  try {
    // in axios if a header var is added that is null, axios sends string 'null'
    if (token === 'none' || token === 'null') {
      throw Error('Token required to access protected route');
    }
    const decoded = jwt.verify(token, secret);
    req.token = decoded as any; // types are hard
    // ⬆️ https://stackoverflow.com/questions/47045185/jsonwebtoken-typescript-compiling-issue
    next();
  } catch (e) {
    if (
      e.message === 'Token required to access protected route' ||
      e.message === 'invalid token'
    ) {
      e.statusCode = 403;
    }
    e.statusCode = e.statusCode || 500;
    next(e);
  }
};

export default verifyToken;
