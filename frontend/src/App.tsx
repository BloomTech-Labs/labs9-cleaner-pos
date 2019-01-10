import React from 'react';
import { Route, RouteProps } from 'react-router';
import Login from './pages/Login';
import logo from './logo.svg';
import './App.css';

import Button from './components/shared_components/Button';
import Landing from './pages/Landingpage';

const App = (props: RouteProps) => {
  return (
    <div className='App'>
      <Route exact path='/' component={ Landing } />
    </div>
  )
}

export default App;
