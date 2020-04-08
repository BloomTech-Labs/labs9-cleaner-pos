import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const setGeneralMiddleware = (server: Express) => {
  server.use(express.json());
  server.use(morgan('dev'));
  server.use(
    cors({
      credentials: true,
      origin: '*',
    }),
  );
};

export default setGeneralMiddleware;
