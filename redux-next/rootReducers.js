import { combineReducers } from "redux";
import registerReducer from "./register/reducer";
import loginUserReducers from "./login/reducers";
import basicDataReducer from "./getUserBasic/reducer";
import basicDataUploadReducer from "./uploadDataBasic/reducer";
import profileListReducer from "./profileList/reducer";
const appReducer = combineReducers({
  registerReducer,
  loginUserReducers,
  basicDataReducer,
  basicDataUploadReducer,
  profileListReducer,
});

const rootReducer = (state, action) => {
  console.log("rootreducer");
  //   if (action.type === "LOGOUT") {
  //     return appReducer(undefined, action);
  //   }
  return appReducer(state, action);
};

export default rootReducer;
