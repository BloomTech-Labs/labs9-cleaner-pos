import React from 'react';
import { RouteProps, Route, Switch } from 'react-router';
import { LandingPage, Houses, Login, PostRegister } from './pages/index';
import './App.css';
import { StripeProvider } from 'react-stripe-elements';
import Sidebar from './components/shared_components/Sidebar';
import Button from './components/shared_components/Button';
import MyStoreCheckout from './stripeTest/MyStoreCheckout';

const App = (props: RouteProps) => {
  const { REACT_APP_stripe_API } = process.env;
  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/test'
          render={() => (
            // @ts-ignore
            <StripeProvider {...props} apiKey={REACT_APP_stripe_API}>
              <MyStoreCheckout />
            </StripeProvider>
          )}
        />
        <Route exact path='/' component={LandingPage} />
        <Route path='/Login' component={Login} />
        <Route exact path='/postreg' component={PostRegister} />
        <Route exact path='/dashboard' component={Houses} />
      </Switch>
    </div>
  );
};

export default App;
