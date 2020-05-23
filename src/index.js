import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from './redux/store'

import CreateList from 'components/list/CreateList';
import CreateProfile from 'components/user/CreateProfile'
import EditProfile from 'components/user/EditProfile'
import ExploreLists from './components/list/ExploreLists';
import Home from './components/home/Home';
import ListPage from './components/list/ListPage';
import UserProfile from './components/user/Profile';
import UserLogin from './components/user/Login';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/"
          component={Home} />
        <Route exact path="/all"
          component={ExploreLists} />
        <Route exact path="/login"
          component={UserLogin} />
        <Route exact path="/by/:username"
          render={(props) => <UserProfile {...props} />} />
        <Route exact path="/create"
          render={(props) => <CreateProfile {...props} />} />
        <Route exact path="/by/:username/edit"
          render={(props) => <EditProfile {...props} />} />
        <Route exact path="/list/create"
          render={(props) => <CreateList {...props} />} />
        <Route exact path="/list/:id"
          render={(props) => <ListPage {...props} />} />
      </Switch>
    </BrowserRouter >
  </Provider>,
  document.getElementById('root')
);