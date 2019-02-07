import React, { createContext, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import {
  LandingPage,
  Properties,
  Login,
  PostRegister,
  Settings,
  PropertyDetails,
  NewProperty,
  Guests,
  GuestDetail,
  NewGuest,
  Checkout,
  Assistants,
  AssistantDetails,
  InviteAst,
} from './pages/index';
import { Sidebar } from './components/index';
import './App.css';
import Billing from './pages/Billing/Billing';

interface UserData {
  loggedIn: boolean;
  role: string;
  subscription: number;
}
const token = localStorage.getItem('token');
const role = localStorage.getItem('role') || '';
const subscription = localStorage.getItem('subscription');

const defaultValue = {
  loggedIn: false,
  role,
  subscription: 0,
};

export const UserContext = createContext<UserData>(defaultValue);

const App = () => {
  const contextValue = {
    loggedIn: token ? true : false,
    role,
    subscription: Number(subscription),
  };
  return (
    <div className='App'>
      <UserContext.Provider value={contextValue}>
        <Sidebar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/assistants' component={Assistants} />
          <Route exact path='/assistants/:id' component={AssistantDetails} />
          <Route exact path='/billing' component={Billing} />
          <Route exact path='/checkout/:id' component={Checkout} />
          <Route exact path='/guests' component={Guests} />
          <Route exact path='/guests/new' component={NewGuest} />
          <Route exact path='/guests/:id' component={GuestDetail} />
          <Route exact path='/invite' component={InviteAst} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/postreg' component={PostRegister} />
          <Route exact path='/properties' component={Properties} />
          <Route exact path='/properties/new' component={NewProperty} />
          <Route exact path='/properties/:id' component={PropertyDetails} />
          <Route exact path='/settings' component={Settings} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);
