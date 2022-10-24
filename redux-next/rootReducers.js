import { combineReducers } from "redux";
import registerReducer from "./register/reducer";

const appReducer = combineReducers({
  registerReducer,
});

const rootReducer = (state, action) => {
  //   if (action.type === "LOGOUT") {
  //     return appReducer(undefined, action);
  //   }
  return appReducer(state, action);
};

export default rootReducer;
