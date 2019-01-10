import React from 'react';
import { RouteProps, Route, Switch } from 'react-router';
import Login from './pages/Login';
import PostRegister from './pages/PostRegister';
import './App.css';

const App = (props: RouteProps) => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' component={Login} />
        <Route exact path='/postreg' component={PostRegister} />
      </Switch>
    </div>
  );
};

export default App;
