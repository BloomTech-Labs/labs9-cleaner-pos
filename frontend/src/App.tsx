import React from 'react';
import { RouteProps, Route, Switch } from 'react-router';
import { LandingPage, Login, PostRegister, Billing } from './pages/index';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Button from './components/Button';

const App = (props: RouteProps) => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/Login' component={Login} />
        <Route path='/billing' component={Billing} />
        <Route exact path='/postreg' component={PostRegister} />
{/*  <Route exact path='/dashboard' component={Houses} /> */}
      </Switch>
    </div>
  );
};

export default App;
