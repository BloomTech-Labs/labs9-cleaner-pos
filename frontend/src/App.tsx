import { RouteProps, Route, Switch } from 'react-router';
import Login from './pages/Login';
import PostRegister from './pages/PostRegister';
import './App.css';
import Sidebar from './components/shared_components/Sidebar';



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
