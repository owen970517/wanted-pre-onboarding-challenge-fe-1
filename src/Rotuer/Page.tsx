import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../components/Home'))
const Login = lazy(()=> import('../auth/Login'))
const Sign = lazy(() => import('../auth/Sign'))
const Modify = lazy(() => import('../todo/Modify'))


const Page = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign/>}/>
        <Route path='/modify/:id' element={<Modify/>}/>
      </Routes>
    </Suspense>
  );
}
export default Page;
