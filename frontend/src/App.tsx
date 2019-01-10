import React from 'react';
import { RouteProps } from 'react-router';
import { Route, BrowserRouter } from 'react-router-dom';
//import Login from './pages/Login';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/shared_components/Sidebar';



const App = (props: RouteProps) => {
  return (
		<BrowserRouter>
			<Route path = '/'>
				<div><Sidebar /></div>
			</Route>
		</BrowserRouter>
	);
	
};

export default App;
