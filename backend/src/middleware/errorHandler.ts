import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /* tslint:disable */
  console.log('error handler', err);
  // @ts-ignore
  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: 'The requested information could not be found',
      });
      break;
    case 400:
      res.status(400).json({
        message:
          'The server cannot or will not process the request due to an apparent client error',
      });
      break;
    case 403:
      res.status(403).json({
        message: 'Forbidden. Please check credentials',
      });
      break;
    default:
      res.status(500).json({
        message: 'There was an error performing the specified operation',
      });
      break;
  }
};
