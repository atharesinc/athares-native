import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import * as reducers from "./reducers";

export const store = createStore(
  combineReducers({ ...reducers }),
  composeEnhancers(applyMiddleware(thunk))
);
