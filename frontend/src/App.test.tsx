import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => {
  return <div>Hellooo</div>;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
