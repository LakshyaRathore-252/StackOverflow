import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "../src/Reducers/index";
import { Toaster } from "react-hot-toast";


const store = createStore(Reducers, compose(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster position="bottom-center"
        reverseOrder={false} />
    </React.StrictMode>
  </Provider>
);

