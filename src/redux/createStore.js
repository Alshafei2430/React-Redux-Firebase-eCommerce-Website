import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddle from "redux-saga";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { persistStore } from "redux-persist";
const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const stores = { store, persistor };

export default stores;
