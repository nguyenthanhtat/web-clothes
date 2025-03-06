import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';
import { configureStore } from './redux/Store';
const store = configureStore();
const rootElement = document.getElementById('root');
console.log('Initial State:', store.getState());
if (rootElement.hasChildNodes()) {
    hydrate((
        <Provider store={store}>
            <App />
        </Provider>
    ), rootElement);
} else {
    render((
        <Provider store={store}>
            <App />
        </Provider>
    ), rootElement);
}
