import { combineReducers } from "redux";
import registerReducer from "./register/reducer";
import loginUserReducers from "./login/reducers";
import basicDataReducer from "./getUserBasic/reducer";

const appReducer = combineReducers({
  registerReducer,
  loginUserReducers,
  basicDataReducer,
});

const rootReducer = (state, action) => {
  //   if (action.type === "LOGOUT") {
  //     return appReducer(undefined, action);
  //   }
  return appReducer(state, action);
};

export default rootReducer;
