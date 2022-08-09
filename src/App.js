import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('preonboarding');
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);
  return (
    <>
      <BrowserRouter>
        <Header isLogin={isLogin}/>
        <Page isLogin={isLogin}/>
      </BrowserRouter>
    </>
  );
}

export default App;
