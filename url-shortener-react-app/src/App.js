import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import './App.css';
import UrlNavigator from './components/UrlNavigator';
import HomePage from './components/HomePage';
import ShortenUrl from './components/ShortenUrl';
import LoginPage from './components/login/LoginPage';
import UserPage from './components/UserPage';


const axiosService = require( './services/axios.service' );
const localStorageService = require( './services/localStorage.service' );

export const Context = createContext();

function App () {

  const [ state, setState ] = useState( {
    user: undefined
  } );

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:routeId" element={<UrlNavigator />} />
          <Route path="/shorturl" element={<ShortenUrl />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="*" element={<div>404 - page does not exist</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
