import { applyMiddleware, createStore, combineReducers } from "redux";

import ReduxThunk from "redux-thunk";
import ReduxLogger from "redux-logger";

import Reducer from "./reducers";

import { NetworkValidation } from "../middleware/networkValidator";
import { LocalConnectionState } from "../middleware/localConnectionState";

const middlewares = applyMiddleware(
  ReduxThunk,
  ReduxLogger,
  NetworkValidation,
  LocalConnectionState
);

const configureStore = () =>
  createStore(combineReducers({ ...Reducer }), {}, middlewares);

const store = configureStore();

export default store;
