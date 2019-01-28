import React, { createContext } from 'react';
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
  AssistantsDetails,
  InviteAst,
} from './pages/index';
import { Sidebar } from './components/index';
import './App.css';
import Billing from './pages/Billing/Billing';

interface UserData {
  loggedIn: boolean;
  role: string;
}
const token = localStorage.getItem('token');
const role = localStorage.getItem('role') || '';

const defaultValue = {
  loggedIn: token ? true : false,
  role,
};
export const UserContext = createContext<UserData>(defaultValue);

const App = () => {
  return (
    <div className='App'>
      <UserContext.Provider value={defaultValue}>
        <Sidebar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/Login' component={Login} />
          <Route exact path='/checkout/:id' component={Checkout} />
          <Route exact path='/test' component={Billing} />
          <Route path='/billing' component={Billing} />
          <Route exact path='/postreg' component={PostRegister} />
          <Route exact path='/properties' component={Properties} />
          <Route exact path='/properties/new' component={NewProperty} />
          <Route exact path='/properties/:id' component={PropertyDetails} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/updateinfo' component={PostRegister} />
          <Route exact path='/assistants' component={Assistants} />
          <Route exact path='/guests' component={Guests} />
          <Route exact path='/guests/new' component={NewGuest} />
          <Route exact path='/guests/:id' component={GuestDetail} />
          <Route exact path='/invite' component={InviteAst} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);
