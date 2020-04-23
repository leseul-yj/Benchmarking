import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Memo from './memo';
import {EffectHook,ContextHook} from './lesson4'
import StateHook from './stateHook';
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Memo></Memo>
    <StateHook></StateHook>
    <EffectHook></EffectHook>
    <ContextHook></ContextHook>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
