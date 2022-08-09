import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from '../auth/Login'
import Sign from '../auth/Sign';
import Modify from './Modify';
function Page({isLogin}) {
  return (
    <Routes>
      <Route path="/" element={<Home isLogin={isLogin}/>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign/>}/>
      <Route path='/modify/:id' element={<Modify/>}/>
    </Routes>
  );
}

export default Page;
