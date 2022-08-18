import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Page from './Rotuer/Page';
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
