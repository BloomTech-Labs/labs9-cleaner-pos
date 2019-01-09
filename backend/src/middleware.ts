import express, { Express } from 'express';
import morgan from 'morgan';

const setGeneralMiddleware = (server: Express) => {
  server.use(express.json());
  server.use(morgan('dev'));
};

export default setGeneralMiddleware;
