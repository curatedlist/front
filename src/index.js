import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './redux/store';

import NotFound   from './components/error/NotFound';
import Home       from './components/home/Home';
import CreateList from './components/list/CreateList';
import Explore    from './components/list/Explore';
import ListPage   from './components/list/ListPage';
import Create     from './components/user/Create';
import Edit       from './components/user/Edit';
import Login      from './components/user/Login';
import Profile    from './components/user/Profile';

import 'assets/vendor/nucleo/css/nucleo-svg.css';
import 'assets/vendor/nucleo/css/nucleo-icons.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/vendor/nucleo/scss/argon-design-system.scss";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/by/:username" element={<Profile section="lists" />} />
            <Route path="/by/:username/favs" element={<Profile section="favs" />} />
            <Route path="/by/:username/lists" element={<Profile section="lists" />} />
            <Route path="/by/:username/following" element={<Profile section="following" />} />
            <Route path="/by/:username/edit" element={<Edit />} />
            <Route path="/list/create" element={<CreateList />} />
            <Route path="/list/:id" element={<ListPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </GoogleOAuthProvider>
);
