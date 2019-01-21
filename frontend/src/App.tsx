import React from 'react';
import { RouteProps, Route, Switch } from 'react-router';
import { LandingPage, Houses, Login, PostRegister } from './pages/index';
import './App.css';
import Sidebar from './components/shared_components/Sidebar';
import Button from './components/shared_components/Button';

const App = (props: RouteProps) => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/Login' component={Login} />
        <Route path='/billing' component={Billing} />
        <Route exact path='/postreg' component={PostRegister} />
        <Route exact path='/dashboard' component={Houses} />
      </Switch>
    </div>
  );
};

export default App;
