import {render} from "react-dom";
import React from "react";
import {Provider} from "react-redux";

import App from "./containers/App";
// import store from "./store";

import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { reducer as formReducer } from 'redux-form';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import {createStore, combineReducers, applyMiddleware} from "redux";
import math from "./reducers/mathReducer";
import user from "./reducers/userReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                 changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" />
    </DockMonitor>
);

const history = createHistory();
const middleware = routerMiddleware(history);

const store =  createStore(
    combineReducers({
        math,
        user,
        router: routerReducer,
        form: formReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // debug redux
    applyMiddleware(/* logger() log redux ,*/ thunk, promise(), middleware),
    DevTools.instrument()
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App />
                {/*<DevTools />*/}
            </div>
        </ConnectedRouter>
    </Provider>,
    window.document.getElementById('app')
);