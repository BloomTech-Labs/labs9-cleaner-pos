import React from 'react';
import { RouteProps } from 'react-router';
import Login from './pages/Login';
import logo from './logo.svg';
import './App.css';

const App = (props: RouteProps) => {
  return (
    <div className='App'>
      <Login />
    </div>
  );
};

export default App;
