import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/home/Home';
import UserProfile from './components/user/Profile';
import UserLogin from './components/user/Login';
import ExploreLists from './components/list/ExploreLists';
import ListPage from './components/list/ListPage';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/"
        component={Home} />
      <Route exact path="/all"
        component={ExploreLists} />
      <Route exact path="/login"
        component={UserLogin} />
      <Route exact path="/user/:id"
        render={(props) => <UserProfile {...props} />} />
      <Route exact path="/list/:id"
        render={(props) => <ListPage {...props} />} />
    </Switch>
  </BrowserRouter >,
  document.getElementById('root')
);