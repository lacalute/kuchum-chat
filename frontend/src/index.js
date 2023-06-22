import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Message } from './components/Message/message'
import { Profile } from './components/Profile/profile';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Link, Route, Routes } from "react-router-dom";
import { Nav } from './components/Nav/nav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <div className='container'>
    <BrowserRouter >
    <Routes>
        <Route path="/profile" element={ <Profile /> }></Route>
        <Route path="/chatId/:chat_id" element={ <Message /> }></Route>
        <Route path="/" element={ <App /> }></Route>
      </Routes>
    {/* <Users />
    <Auth />
    <Profile />
    <Chats /> */}
    </BrowserRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
