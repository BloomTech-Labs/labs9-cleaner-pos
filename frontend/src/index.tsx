import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
// JSS
import JssProvider from 'react-jss/lib/JssProvider';
import { create, JSS } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const insertionPoint = document.getElementById('jss-insertion-point');
let jss: JSS | undefined;

if (insertionPoint) {
  jss = create({
    ...jssPreset(),
    insertionPoint,
  });
}

WebFont.load({
  google: {
    families: ['Roboto', 'Noto Serif', 'Staatliches'],
  },
});

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Router>
      <App />
    </Router>
  </JssProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
