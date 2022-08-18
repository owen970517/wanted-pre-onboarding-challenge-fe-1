import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login'
import Sign from '../auth/Sign';
import Home from '../components/Home';
import Modify from '../components/Modify';
function Page() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign/>}/>
      <Route path='/modify/:id' element={<Modify/>}/>
    </Routes>
  );
}

export default Page;
