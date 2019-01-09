import express from 'express';
import setGeneralMiddleware from './middleware';
import { userGet } from './controller/users';
const PORT = process.env.PORT || 3000;

export const server = express();

setGeneralMiddleware(server);

server.get('/', (req, res) => {
  res.send('hello world');
});
server.get('/users', userGet);

/* tslint:disable */
server.listen(process.env.PORT || 3000, () =>
  console.log('Server is listening!'),
);

// @ts-ignore
if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');
  // @ts-ignore
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    // @ts-ignore
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    // @ts-ignore
    currentApp = newApp;
  });
}
