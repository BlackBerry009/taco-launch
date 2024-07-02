import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import 'virtual:uno.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
