import React from 'react';
import { RouteProps, Route, Switch } from 'react-router';
import Login from './pages/Login';
import PostRegister from './pages/PostRegister';
import './App.css';

import Button from './components/shared_components/Button';
import Landing from './pages/Landingpage';

const App = (props: RouteProps) => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/Login' component={Login} />
        <Route exact path='/postreg' component={PostRegister} />
      </Switch>
    </div>
  )
}

export default App;
