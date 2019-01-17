import React, { useState } from 'react';
import { RouteProps, Route, Switch, RouteComponentProps } from 'react-router';
import {
  LandingPage,
  Houses,
  Login,
  PostRegister,
  Settings,
} from './pages/index';
import { User } from 'firebase';
import { Sidebar } from './components/index';
import './App.css';
import Billing from './pages/Billing/Billing';
// import { LoginProps } from './pages/Login';

export const UserContext = React.createContext<User | null>(null);

const App = (props: RouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <div className='App'>
      <Sidebar />
      <Switch>
        <UserContext.Provider value={user}>
          <Route path='/Login' component={Login} />
          <Route exact path='/test' component={Billing} />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/postreg' component={PostRegister} />
          <Route exact path='/dashboard' component={Houses} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/updateinfo' component={PostRegister} />
        </UserContext.Provider>
      </Switch>
    </div>
  );
};
export default App;
