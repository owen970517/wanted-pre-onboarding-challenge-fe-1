import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <GlobalStyles />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

