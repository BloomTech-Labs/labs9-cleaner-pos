import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import setGeneralMiddleware from './middleware/generalMiddleware';
import * as users from './controller/users';

export const server = express();

setGeneralMiddleware(server);

server.get('/', (req, res) => {
  // TODO: Redirect to front-end site
  res.send('hello world');
});

server
  .route('/users')
  .get(users.get)
  .post(users.post);

server
  .route('/users/:id')
  .get(users.get)
  .put(users.put)
  .delete(users.deleteU);

server.use(errorHandler);

export default server;
