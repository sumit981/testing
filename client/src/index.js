import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch ,Route} from 'react-router-dom';

import './index.css';
import App from './App/App';
import Home from './App/pages/Home';
import List from './App/pages/List';
import Login from './Containers/Login';
import Register from './Containers/Register';
import Dashboard from './Containers/Dashboard';
import Topbar from './Containers/Topbar';
import Profile from './Containers/Profile';
import Newdocument from './Containers/NewDocument';
import Welcome from './Containers/Welcome';

render((
    <BrowserRouter>
        <Switch>
           <Route exact path="/" component={Welcome}/>
      <Route exact path="/Login" component={Login}/>
	  <Route exact path="/Register" component={Register}/>
	  <Route exact path="/Dashboard" component={Dashboard}/>
	  <Route exact path="/Topbar" component={Topbar}/>
	  <Route exact path="/Profile" component={Profile}/>
	  <Route exact path="/Newdoc" component={Newdocument}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
