const React = require.requireActual('react');
jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);
module.exports = React;
