import { applyMiddleware, createStore } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { createWrapper } from "next-redux-wrapper";

// import rootReducer from "./rootReducers";
// import rootSaga from "./rootSaga";

// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== "production") {
//     const { composeWithDevTools } = require("@redux-devtools/extension");
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

// export const makeStore = (context) => {
//   const sagaMiddleware = createSagaMiddleware();
//   const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

//   store.sagaTask = sagaMiddleware.run(rootSaga);

//   return store;
// };

// export const wrapper = createWrapper(makeStore, { debug: false });
import createSagaMiddleware from "redux-saga";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducers";

const saga = createSagaMiddleware();

const initializeStore = (initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(saga));

  saga.run(rootSaga);

  return store;
};

export default initializeStore;
