import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./reducers/reducer";

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {
  if (process.env.NODE_ENV === "development") {
    // Enable debugging
    return createStoreWithMiddleware(rootReducer,initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  } else {
    return createStoreWithMiddleware(rootReducer,initialState);
  }
}

