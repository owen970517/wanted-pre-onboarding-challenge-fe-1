import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from '../auth/Login'
import Sign from '../auth/Sign';
function Page({isLogin}) {
  return (
    <Routes>
      <Route path="/" element={<Home isLogin={isLogin}/>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign/>}/>
    </Routes>
  );
}

export default Page;
