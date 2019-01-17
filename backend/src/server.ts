import server from './app';

const PORT = process.env.PORT || 4500;
/* tslint:disable */
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));

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
