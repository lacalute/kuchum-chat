import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Message } from './components/Message/message'
import { Profile } from './components/Profile/profile';
import { Page } from './components/Page/page';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Link, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
    <Routes>
        <Route path="/profile" element={ <Profile /> }></Route>
        <Route path="/chatId/:chat_id" element={ <Page /> }></Route>
        <Route path="/" element={ <App /> }></Route>
      </Routes>
    {/* <Users />
    <Auth />
    <Profile />
    <Chats /> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
