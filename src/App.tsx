import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ErrorBoundary from './error-loading/ErrorBoundary';
import Page from './Rotuer/Page';
function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Header/>
          <Page />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
