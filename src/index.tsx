import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from "react-query";
import {Provider} from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GlobalStyles />
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);



