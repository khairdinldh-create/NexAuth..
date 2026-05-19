import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import  GlobalState  from './components/GlobalContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GlobalState>

      <App />
    </GlobalState>
    </BrowserRouter>
  </StrictMode>,
)
