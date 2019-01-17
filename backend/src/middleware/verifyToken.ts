import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from 'http';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || 'none';
  const secret = process.env.JWT_SECRET || 'secret';

  try {
    if (token === 'none') {
      const e: StatusError = {
        ...new Error('Token required to access protected route'),
        statusCode: 403,
      };
      throw e;
    }
    const decoded = jwt.verify(token, secret);
    req.token = decoded as any; // types are hard
    // ⬆️ https://stackoverflow.com/questions/47045185/jsonwebtoken-typescript-compiling-issue
    next();
  } catch (e) {
    e.statusCode = e.statusCode || 500;
    res.status(e.statusCode).send('Cannot authenticate.');
  }
};

export default verifyToken;
