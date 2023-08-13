import React from 'react';
import ReactDOM from 'react-dom/client';
import 'materialize-css/dist/css/materialize.css'
import {BrowserRouter} from "react-router-dom";
import App from "./App";

process.env.userId = undefined

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);
