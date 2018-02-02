import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import rootReducer from "./rootReducer";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Horizon from '@horizon/client'
import {odczytRejestru} from "./actions/rejestr"
import api from "./api";
import {pobraneUstawienia} from './actions/ustawienia'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const hz = Horizon({host: '127.0.0.1:8081'});
hz.connect();
hz('wyjscia').order('id').watch().subscribe(
  (res)=>store.dispatch(odczytRejestru({wyjscia: res})),
  (err)=>console.error(err)
)
hz('wy_satel').order('id').watch().subscribe(
  (res)=>store.dispatch(odczytRejestru({wySatel: res})),
  (err)=>console.error(err)
)
hz('wy_temp').order('id').watch().subscribe(
  (res)=>store.dispatch(odczytRejestru({wyTemp: res})),
  (err)=>console.error(err)
)
api.ustawienia.getUstawieniaLokale()
  .then(ustawienia => store.dispatch(pobraneUstawienia(ustawienia)))
api.ustawienia.getUstawieniaKonfiguracja()
  .then(konfiguracja => store.dispatch(pobraneUstawienia(konfiguracja)))
api.ustawienia.getUstawieniaRejestrOpis()
  .then(rejestrOpis => store.dispatch(pobraneUstawienia(rejestrOpis)))

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
