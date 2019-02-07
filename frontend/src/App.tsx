import React, { createContext, useState, SetStateAction } from 'react';
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
  role: any;
  subscription: number;
  connected: boolean;
  setValue: any;
  setRole: any;
  setLogin: any;
  setConnect: any;
}
const token = localStorage.getItem('token');
const subscription = localStorage.getItem('subscription');
const savedRole = localStorage.getItem('role');
const connected = localStorage.getItem('connected');

const defaultValue = {
  loggedIn: false,
  role: savedRole || 'none',
  subscription: 0,
  connected: false,
  setValue: 0,
  setRole: 0,
  setLogin: 0,
  setConnect: 0,
};

export const UserContext = createContext<UserData>(defaultValue);

const App = () => {
  const [subvalue, setValue] = useState(Number(subscription));
  const [role, setRole] = useState(savedRole);
  const [login, setLogin] = useState(token ? true : false);
  const [connect, setConnect] = useState(Boolean(connected) ? true : false);

  const contextValue = {
    loggedIn: login,
    role,
    subscription: subvalue,
    connected: connect,
  };
  return (
    <div className='App'>
      <UserContext.Provider
        value={{
          ...contextValue,
          subscription: subvalue,
          setValue,
          setRole,
          setLogin,
          setConnect,
        }}
      >
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
