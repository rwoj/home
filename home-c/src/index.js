import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Horizon from '@horizon/client'
import {odczytRejestru} from "./actions/rejestr"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const hz = Horizon({host: '127.0.0.1:8081'});
hz.connect();
hz('rejestr').order('id').watch().subscribe(
  (res)=>store.dispatch(odczytRejestru(res)),
  (err)=>console.error(err)
)

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
