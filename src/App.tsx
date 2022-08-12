import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Page />
      </BrowserRouter>
    </>
  );
}

export default App;
