import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Containers/Login';
import Register from './Containers/Register';
import Dashboard from './Containers/Dashboard';
import Topbar from './Containers/Topbar';
import Profile from './Containers/Profile';
import Newdocument from './Containers/NewDocument';
import Welcome from './Containers/Welcome';

const Root = () => (
  <Router >
    <Switch>
      <Route exact path="/" component={Welcome}/>
      <Route exact path="/Login" component={Login}/>
	  <Route exact path="/Register" component={Register}/>
	  <Route exact path="/Dashboard" component={Dashboard}/>
	  <Route exact path="/Topbar" component={Topbar}/>
	  <Route exact path="/Profile" component={Profile}/>
	  <Route exact path="/Newdoc" component={Newdocument}/>
    </Switch>
  </Router>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
//registerServiceWorker();
