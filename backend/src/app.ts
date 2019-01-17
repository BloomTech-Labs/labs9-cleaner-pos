import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import setGeneralMiddleware from './middleware/generalMiddleware';
import verifyToken from './middleware/verifyToken';
import * as users from './controller/users';
import * as houses from './controller/houses';
import * as lists from './controller/lists';
import * as items from './controller/items';
import * as email from './controller/email';
import * as payments from './controller/payments';

export const server = express();
setGeneralMiddleware(server);

//server.get('/', (req, res) => {
  // TODO: Redirect to front-end site
//  res.send('testing');
//});

const path = require('path')

server.use(express.static(path.resolve(path.join(__dirname, 'public'))));
server.get('/', (__,res) => res.sendFile('index.html'));

server
  .route('/users')
  .get(users.get)
  .post(users.post)
  .put(verifyToken, users.putByExtId);

server
  .route('/users/:id')
  .get(users.get)
  .put(users.put)
  .delete(users.deleteU);

server
  .route('/houses')
  .get(houses.get)
  .post(houses.post);

server
  .route('/houses/:id')
  .get(houses.get)
  .put(houses.put)
  .delete(houses.deleteU);

server.route('/lists').post(lists.post);
/* this get route looks for a query. if `lists/1?stay=true`
the id should be for a stay. Anything else the id should be for a house
*/
server
  .route('/lists/:id')
  .get(lists.get)
  .delete(lists.deleteL);

server
  .route('/items')
  .get(items.get)
  .post(items.post);
server
  .route('/items/:id')
  .get(items.get)
  .put(items.put)
  .delete(items.deleteL);

server.route('/itemComplete').post(items.itemComplete);

server.route('/email').post(email.send);

server.use(errorHandler);

export default server;
