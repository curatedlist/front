import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from './redux/store'

import Login from './components/user/Login';
import Create from 'components/user/Create'
import Profile from './components/user/Profile';
import Edit from 'components/user/Edit'
import CreateList from 'components/list/CreateList';
import ExploreLists from './components/list/ExploreLists';
import Home from './components/home/Home';
import ListPage from './components/list/ListPage';

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
          component={Login} />
        <Route exact path="/create"
          render={(props) => <Create {...props} />} />
        <Route exact path="/by/:username"
          render={(props) => <Profile section="lists" {...props} />} />
        <Route exact path="/by/:username/favs"
          render={(props) => <Profile section="favs" {...props} />} />
        <Route exact path="/by/:username/lists"
          render={(props) => <Profile section="lists" {...props} />} />
        <Route exact path="/by/:username/following"
          render={(props) => <Profile section="following" {...props} />} />
        <Route exact path="/by/:username/edit"
          render={(props) => <Edit {...props} />} />
        <Route exact path="/list/create"
          render={(props) => <CreateList {...props} />} />
        <Route exact path="/list/:id"
          render={(props) => <ListPage {...props} />} />
      </Switch>
    </BrowserRouter >
  </Provider>,
  document.getElementById('root')
);