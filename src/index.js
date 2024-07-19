import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";
import {Provider} from "react-redux";
import reducers from "./reducers";

const reduxStore = createStore(reducers, applyMiddleware(thunk))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={reduxStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>


);

