import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const user = storageUtils.getUser()
if(user && user.id) {
  memoryUtils.user = user
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

