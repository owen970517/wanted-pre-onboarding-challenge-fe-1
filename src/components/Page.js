import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Sign from './Sign';
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
